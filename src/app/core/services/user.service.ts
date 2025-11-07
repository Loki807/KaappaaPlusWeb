import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserRequest, UserDto } from '../../Types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
private http = inject(HttpClient);

  private createUrl = `${environment.apiBase}/${environment.endpoints.admin.tenantUser.create}`;
  private allUrl    = (tenantId: string) =>
    `${environment.apiBase}/${environment.endpoints.admin.tenantUser.allByTenant(tenantId)}`;
  private byIdUrl   = (id: string) =>
    `${environment.apiBase}/${environment.endpoints.admin.tenantUser.byId(id)}`;
  private updUrl    = (id: string) =>
    `${environment.apiBase}/${environment.endpoints.admin.tenantUser.update(id)}`;
  private delUrl    = (id: string) =>
    `${environment.apiBase}/${environment.endpoints.admin.tenantUser.delete(id)}`;

  createUser(data: CreateUserRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.createUrl, data);
  }
  getAllUsers(tenantId: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.allUrl(tenantId));
  }
  getUser(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(this.byIdUrl(id));
  }
  updateUser(id: string, data: Partial<CreateUserRequest>): Observable<UserDto> {
    return this.http.put<UserDto>(this.updUrl(id), data);
  }
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.delUrl(id));
  }
}
