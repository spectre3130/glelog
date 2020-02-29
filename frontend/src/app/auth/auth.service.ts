import { Injectable, EventEmitter, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private user: User;
  changedUserEvent: EventEmitter<User> = new EventEmitter<User>();
  loginEvent: EventEmitter<User> = new EventEmitter<User>();

  private authSubject = new ReplaySubject<boolean>(1);
  isAuthenticated = this.authSubject.asObservable();

  constructor(
    private router: Router,
    private http:HttpClient,
    private userService: UserService,
    private settingsService: SettingsService
  ) { 
    this.changeUser();
  }

  check(): void {
    this.http.get<User>(`${environment.resource}/auth/check`)
    .pipe(catchError((err) => { throw err }))
    .subscribe(
      (user) => {
        if(user) this.authenticate(user, true);
        else this.authenticate({} as User, false);
      },
      (err) => this.authenticate({} as User, false)
    )
  }

  
  login(token: string): void {
    this.http.post<any>(`${environment.resource}/auth/login`, { token })
    .pipe(catchError((err) => { throw err }))
    .subscribe(
      (user) => this.router.navigate(['/']),
      (err) => this.router.navigate(['/'])
    )
  }

  logout(): void {
    this.http.get<User>(`${environment.resource}/auth/logout`)
    .subscribe(() => {
      window.location.replace(environment.root);
    });
  }

  private authenticate(user: User, auth: boolean): void {
    this.userService.next(user);
    this.authSubject.next(auth);
  }


  private changeUser(): void {
    this.settingsService.changeUserEvent
    .subscribe((user: User) => this.changedUserEvent.emit(user));
  }

}
