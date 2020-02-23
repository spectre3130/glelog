import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Post, Tag } from 'src/app/app.model';
import { environment }from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class UserHomeService {

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.resource}/api/user?username=${encodeURIComponent(username)}`);
  }

  getUserPosts(username: string, page: number, tagName?: string): Observable<Array<Post>> {
    let tagQuery = ''; 
    if(tagName) tagQuery = `&tag=${encodeURIComponent(tagName)}`;
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts/${encodeURIComponent(username)}?page=${page}${tagQuery}`);
  }

  getUserTags(username: string):Observable<Tag[]> {
    return this.http.get<Array<Tag>>(`${environment.resource}/api/tag/${encodeURIComponent(username)}`);
  }
  
}
