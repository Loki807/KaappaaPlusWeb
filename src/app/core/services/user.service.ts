import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateUserRequest, UserDto } from '../../Types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private createUrl = `${environment.apiBase}/${environment.endpoints.tenant.users.create}`;
  private allUrl    = `${environment.apiBase}/${environment.endpoints.tenant.users.all}`;
  private byIdUrl   = (id: string) => `${environment.apiBase}/${environment.endpoints.tenant.users.byId(id)}`;
  private updUrl    = (id: string) => `${environment.apiBase}/${environment.endpoints.tenant.users.update(id)}`;
  private delUrl    = (id: string) => `${environment.apiBase}/${environment.endpoints.tenant.users.delete(id)}`;

  createUser(data: CreateUserRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.createUrl, data);
  }
  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.allUrl);
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
