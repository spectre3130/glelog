import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/app.model';
import { environment }from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class UserHomeService {

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.resource}/api/user/${username.replace(/#/g, '%23')}`);
  }

}
