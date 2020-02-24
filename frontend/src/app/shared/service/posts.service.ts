import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PopularPost } from 'src/app/app.model';
import { ApiService } from './api.service';

@Injectable()
export class PostsService {

  constructor(
    private apiService: ApiService,
  ) { }

  getPosts(page: number, tag: string): Observable<Post[]> {
    let tagQuery = ''
    if(tag) tagQuery = `&tag=${encodeURIComponent('#' + tag)}`;
    return this.apiService.get<Post[]>(`posts?page=${page}${tagQuery}`);
  }

  getUserPosts(username: string, page: number, tag?: string): Observable<Post[]> {
    let tagQuery = ''; 
    if(tag) tagQuery = `&tag=${encodeURIComponent('#' + tag)}`;
    return this.apiService.get<Post[]>(`posts/${encodeURIComponent(username.replace('@', ''))}?page=${page}${tagQuery}`);
  }

  getViewsPosts(): Observable<PopularPost[]> {
    return this.apiService.get<PopularPost[]>('posts/top/views');
  }

  getWritingPosts(path:string, page:number): Observable<Post[]> {
    return this.apiService.get(`posts/writing/${path}?page=${page}`);
  }

}
