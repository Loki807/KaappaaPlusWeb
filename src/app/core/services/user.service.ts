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

  private createUrl = `${environment.apiBase}/${environment.endpoints.admin.tenant.create}`;

  createUser(data: CreateUserRequest): Observable<UserDto> {
    // If your backend expects roles[] instead of role, adapt here:
    // const payload = { ...data, roles: [data.role] }; delete (payload as any).role;
    // return this.http.post<UserDto>(this.createUrl, payload);

    return this.http.post<UserDto>(this.createUrl, data);
  }
}
