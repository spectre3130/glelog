import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/app.model';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.apiService.get<User>(`user?username=${encodeURIComponent(username.replace('@', ''))}`);
  }
}