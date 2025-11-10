// src/app/services/tenant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root',  // Make sure this service is available throughout the app
})
export class TenantService {
  // API base path is read from the environment file
  private apiUrl = `${environment.apiBase}/admin/tenant`;

  constructor(private http: HttpClient) {}

  // 🧾 POST → create a new tenant
  createTenant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  // 🔍 GET → retrieve all tenants
  getAllTenants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // 🔍 GET → retrieve tenant by ID
  getTenantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 📝 PUT → update tenant details
  updateTenant(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  // 🗑️ DELETE → delete a tenant by ID
  deleteTenant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
