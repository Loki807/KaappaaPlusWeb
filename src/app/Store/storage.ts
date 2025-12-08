import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {
 private TOKEN_KEY = 'kaappaan_token';
  private TENANT_NAME = 'tenantName';
  private TENANT_ID = 'tenantId';
  private USER_NAME = 'userName';
  private USER_ROLE = 'userRole';

  // ============================= TOKEN =============================
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ============================= GENERIC GET/SET =============================
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  // ============================= TENANT NAME =============================
  saveTenantName(name: string) {
    localStorage.setItem(this.TENANT_NAME, name);
  }

  getTenantName() {
    return localStorage.getItem(this.TENANT_NAME);
  }

  // ============================= TENANT ID =============================
  saveTenantId(id: string) {
    localStorage.setItem(this.TENANT_ID, id);
  }

  getTenantId() {
    return localStorage.getItem(this.TENANT_ID);
  }

  // ============================= CLEAR =============================
  clearAll() {
    localStorage.clear();
  }
}




