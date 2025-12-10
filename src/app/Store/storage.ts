import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {

 private TOKEN_KEY = 'kaappaan_token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Decode JWT
  private decode(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // TenantId extract from JWT if not returned from backend
  getTenantId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const data = this.decode(token);
      return data.tenantId || null;
    } catch {
      return null;
    }
  }

  saveTenantName(name: string) {
    localStorage.setItem('tenantName', name);
  }

  getTenantName() {
    return localStorage.getItem('tenantName');
  }

  saveTenantId(id: string) {
    localStorage.setItem('tenantId', id);
  }

  clearAll() {
    localStorage.clear();
  }
}
