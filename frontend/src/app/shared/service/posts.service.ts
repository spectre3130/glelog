import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PopularPost, PostQuery } from 'src/app/app.model';
import { ApiService } from './api.service';

@Injectable()
export class PostsService {

  constructor(
    private apiService: ApiService,
  ) { }

  getPosts(query: PostQuery): Observable<Post[]> {
    const queryString = this.apiService.generateQuery<PostQuery>(query);
    return this.apiService.get<Post[]>(`posts${queryString}`);
  }

  getUserPosts(username: string, query: PostQuery): Observable<Post[]> {
    const queryString = this.apiService.generateQuery<PostQuery>(query);
    return this.apiService.get<Post[]>(`posts/${encodeURIComponent(username.replace('@', '')) + queryString}`);
  }

  getViewsPosts(): Observable<PopularPost[]> {
    return this.apiService.get<PopularPost[]>('posts/top/views');
  }

  getWritingPosts(path:string, page:number): Observable<Post[]> {
    return this.apiService.get(`posts/writing/${path}?page=${page}`);
  }


}
