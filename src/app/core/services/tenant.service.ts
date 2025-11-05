import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
   private http = inject(HttpClient);
private apiUrl = `${environment.apiBase}/admin/tenant`;


// 🧾 POST → create tenant
createTenant(data: unknown): Observable<unknown> {
return this.http.post(`${this.apiUrl}/create`, data);
}


// 🔍 GET → get all tenants
getAllTenants(): Observable<unknown[]> {
return this.http.get<unknown[]>(`${this.apiUrl}/all`);
}
}
