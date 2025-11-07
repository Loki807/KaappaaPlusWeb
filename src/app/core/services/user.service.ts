import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateUserRequest, UserDto } from '../../Types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private createUrl = `${environment.apiBase}/${environment.endpoints.admin.users.create}`;

  createUser(data: CreateUserRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.createUrl, data);
  }
}
