import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  changeUserEvent: EventEmitter<User> = new EventEmitter<User>();
  changeAvatarEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.api}/api/user`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.api}/api/user`, user)
    .pipe(
      tap((user: User) => this.changeUserEvent.emit(user))
    )
  }

  emitAvatarEvent(avatar: string): void {
    this.changeAvatarEvent.emit(avatar);
  }


  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${environment.api}/api/user/check?username=${encodeURIComponent(username)}`);
  }


}
