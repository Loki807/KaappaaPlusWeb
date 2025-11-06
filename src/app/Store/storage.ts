// src/app/Store/storage.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage { // Name kept as "Storage" to match your existing imports
  // We prefix keys so we don't clash with other apps that also use localStorage.
  private readonly prefix = 'kaappaan_';

  // When localStorage isn't available (SSR/private mode), we fallback to memory.
  private readonly memory = new Map<string, string>();

  // Small helper to access localStorage safely (avoids runtime errors).
  private get ls(): any {
    try {
      if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
    } catch { /* ignore */ }
    return null;
  }

  // ---------- Generic helpers ----------

  // Save a string value under a prefixed key: kaappaan_<key>
  set(key: string, value: string): void {
    const full = this.prefix + key;
    const ls = this.ls;
    if (ls) ls.setItem(full, value); else this.memory.set(full, value);
  }

  // Read a string value by key (or null if missing)
  get(key: string): string | null {
    const full = this.prefix + key;
    const ls = this.ls;
    return ls ? ls.getItem(full) : (this.memory.get(full) ?? null);
  }

  // Remove a key
  remove(key: string): void {
    const full = this.prefix + key;
    const ls = this.ls;
    if (ls) ls.removeItem(full); else this.memory.delete(full);
  }

  // Clear only our app’s keys (those that start with kaappaan_)
  clearAll(): void {
    const ls = this.ls;
    if (ls) {
      // Iterate a copy of keys because we'll remove while iterating
      const keys = Object.keys(ls);
      for (const k of keys) if (k.startsWith(this.prefix)) ls.removeItem(k);
    }
    this.memory.clear();
  }

  // ---------- Token helpers (JWT) ----------

  // We store the token at key: kaappaan_token (matches your interceptor)
  setToken(token: string): void { this.set('token', token); }
  getToken(): string | null { return this.get('token'); }
  hasToken(): boolean { return !!this.getToken(); }
  clearToken(): void { this.remove('token'); }

  // Decode JWT payload safely (returns null on any error)
  decodeJwt<T = any>(token?: string): T | null {
    const t = token ?? this.getToken();
    if (!t) return null;
    const parts = t.split('.');
    if (parts.length < 2) return null;
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    try {
      // Decode payload; try URI-safe first
      const json = atob(b64);
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  // Convenience getters from JWT claims (if your API includes them)
  getRole(): string | null {
    const p: any = this.decodeJwt();
    if (!p) return null;
    // Common claim names: "role", "roles"
    if (typeof p.role === 'string') return p.role;
    if (Array.isArray(p.roles) && p.roles.length) return p.roles[0];
    return null;
  }

  // Many APIs put tenant ID in "tenantId", "tid" or "tenant_id".
  // We also fallback to a stored value (kaappaan_tenantId) if you set it manually at login.
  getTenantId(): string | null {
    const p: any = this.decodeJwt();
    return p?.tenantId ?? p?.tid ?? p?.tenant_id ?? this.get('tenantId');
  }

  getName(): string | null {
    const p: any = this.decodeJwt();
    return p?.name ?? p?.unique_name ?? null;
  }

  getEmail(): string | null {
    const p: any = this.decodeJwt();
    return p?.email ?? p?.upn ?? null;
  }

  // One-call logout helper
  logout(): void {
    this.clearToken();
    this.remove('tenantId');
    // Add removes for any other keys you set (e.g., "role", "name") if you store them.
  }
}

