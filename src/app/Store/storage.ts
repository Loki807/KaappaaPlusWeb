import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {
  private TOKEN_KEY = 'kaappaan_token';

  set(key: string, value: string) { localStorage.setItem(key, value); }
  get(key: string) { return localStorage.getItem(key); }

  setToken(tok: string) { localStorage.setItem(this.TOKEN_KEY, tok); }
  getToken() { return localStorage.getItem(this.TOKEN_KEY); }

  private b64urlDecode(s: string) {
    s = s.replace(/-/g, '+').replace(/_/g, '/'); const pad = s.length % 4;
    if (pad) s += '='.repeat(4 - pad); return atob(s);
  }
  getTenantId(): string | null {
    const t = this.getToken(); if (!t) return null;
    const p = t.split('.'); if (p.length !== 3) return null;
    try { const payload = JSON.parse(this.b64urlDecode(p[1]));
      return payload['tenantId'] || payload['tid'] || payload['tenant_id'] || null;
    } catch { return null; }
  }
}

