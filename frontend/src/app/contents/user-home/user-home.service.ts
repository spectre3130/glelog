import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Post } from 'src/app/shared/app.model';
import { environment }from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class UserHomeService {

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.resource}/api/user/${encodeURIComponent(username)}`);
  }

  getUserPosts(username: string, page: number): Observable<Array<Post>> {
    page = 1;
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts/${encodeURIComponent(username)}?page=${page}`);
  }
  
}
