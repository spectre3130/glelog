import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, PopularPost } from 'src/app/app.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(page: number, tagName: string): Observable<Array<Post>> {
    page = 1;
    let tagQuery = ''
    if(tagName) tagQuery = `&tag=${encodeURIComponent(tagName)}`;
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts?page=${page}${tagQuery}`);
  }

  getViewsPosts(): Observable<Array<PopularPost>> {
    return this.http.get<Array<PopularPost>>(`${environment.resource}/api/posts/top/views`);
  }
}
