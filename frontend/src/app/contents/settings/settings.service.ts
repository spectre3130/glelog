import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/app.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class SettingsService {

  changeUserEvent: EventEmitter<User> = new EventEmitter<User>();

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
}
