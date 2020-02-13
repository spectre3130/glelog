import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as axios from 'axios';

@Injectable()
export class SettingsService {

  changeUserEvent: EventEmitter<User> = new EventEmitter<User>();
  changeAvatarEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.resource}/api/user`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.resource}/api/user`, user)
    .pipe(
      tap((user: User) => this.changeUserEvent.emit(user))
    )
  }

  emitAvatarEvent(avatar: string) {
    this.changeAvatarEvent.emit(avatar);
  }

  updateAvatar(formData: FormData) {
    return this.http.post<User>(`${environment.resource}/api/upload/avatar`, formData)
    .pipe(
      tap((user: User) => {
          axios.default.get(user.avatar);
          this.changeUserEvent.emit(user)
        }
      ),
    )
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${environment.resource}/api/user/${username}/check`);
  }


}
