import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, PopularPost } from 'src/app/app.model';
import { ApiService } from './api.service';

@Injectable()
export class PostsService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  getPosts(page: number, tagName: string): Observable<Post[]> {
    let tagQuery = ''
    if(tagName) tagQuery = `&tag=${encodeURIComponent(tagName)}`;
    return this.http.get<Post[]>(`${environment.resource}/api/posts?page=${page}${tagQuery}`);
  }

  getViewsPosts(): Observable<Array<PopularPost>> {
    return this.http.get<Array<PopularPost>>(`${environment.resource}/api/posts/top/views`);
  }

  getWritingPosts(path:string, page:number): Observable<Post[]> {
    return this.apiService.get(`posts/writing/${path}?page=${page}`);
  }

}
