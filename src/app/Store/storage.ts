import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {

  private TOKEN_KEY = 'kaappaan_token';
  private TENANT_NAME = 'tenantName';
  private TENANT_ID = 'tenantId';
  private USER_NAME = 'userName';
  private USER_ROLE = 'userRole';

  // =====================================================
  // ⭐ TOKEN
  // =====================================================
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // =====================================================
  // ⭐ GENERIC SET / GET
  // =====================================================
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // =====================================================
  // ⭐ TENANT NAME
  // =====================================================
  saveTenantName(name: string) {
    localStorage.setItem(this.TENANT_NAME, name);
  }

  getTenantName(): string | null {
    return localStorage.getItem(this.TENANT_NAME);
  }

  // =====================================================
  // ⭐ TENANT ID
  // =====================================================
  saveTenantId(id: string) {
    localStorage.setItem(this.TENANT_ID, id);
  }

  getTenantId(): string | null {
    return localStorage.getItem(this.TENANT_ID);
  }

  // =====================================================
  // ⭐ USER NAME (not tenant name)
  // =====================================================
  saveUserName(name: string) {
    localStorage.setItem(this.USER_NAME, name);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USER_NAME);
  }

  // =====================================================
  // ⭐ USER ROLE (TenantAdmin, SuperAdmin, Responder)
  // =====================================================
  saveUserRole(role: string) {
    localStorage.setItem(this.USER_ROLE, role);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE);
  }

  // =====================================================
  // ⭐ CLEAR ALL DATA
  // =====================================================
  clearAll() {
    localStorage.clear();
  }
}
