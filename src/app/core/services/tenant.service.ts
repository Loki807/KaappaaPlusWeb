import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
    private apiUrl = 'https://localhost:7055/api/admin/tenant';

  constructor(private http: HttpClient) {}

  // 🧾 POST → create tenant
  createTenant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  // 🔍 GET → get all tenants
  getAllTenants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}
