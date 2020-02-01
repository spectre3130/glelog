import { Injectable, EventEmitter, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.model';
import { Observable } from 'rxjs';
import { take, timeout, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SettingsService } from '../contents/settings/settings.service';

@Injectable()
export class AuthService {

  user: User;
  changedUserEvent: EventEmitter<User> = new EventEmitter<User>();
  loginEvent: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private http:HttpClient,
    private settingsService: SettingsService
  ) { 
    this.changeUser();
  }
  
  login(token: string): void {
    this.http.post<any>(`${environment.resource}/auth/login`, { token })
    .pipe(tap((user:User) => this.user = user))
    .subscribe((user:User) => this.loginEvent.emit(user));
  }

  logout(): Observable<User> {
    return this.http.get<User>(`${environment.resource}/auth/logout`)
            .pipe(tap((user:User) => this.user = user))
  }

  loadUser() {
    return new Promise((resovle) => {
      this.http.get<User>(`${environment.resource}/auth/check`)
      .subscribe(
        (user:User) => { this.user = user;  resovle() },
        err => resovle(),
      );
    });
  }
  
  loadedUser(): User {
    return this.user;
  }

  private changeUser(): void {
    this.settingsService.changeUserEvent
    .subscribe((user: User) => this.changedUserEvent.emit(user));
  }

}
