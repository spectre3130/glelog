import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../contents/user/use.model';

@Injectable()
export class AuthService {

  loginState: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http:HttpClient) { }

  successLogin(user: User): void {
    this.loginState.emit(user);
  }

  check():void {

  }
  
  login(token: string): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/auth/login`, { token });
  }
}
