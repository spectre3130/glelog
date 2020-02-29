import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularPost, PostQuery, Pageable } from 'src/app/app.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private DOMAIN = 'posts';

  constructor(
    private apiService: ApiService,
  ) { }

  getPosts(query: PostQuery): Observable<Pageable> {
    const queryString = this.apiService.generateQuery<PostQuery>(query);
    return this.apiService.get<Pageable>(this.DOMAIN + queryString);
  }

  getUserPosts(username: string, query: PostQuery): Observable<Pageable> {
    const queryString = this.apiService.generateQuery<PostQuery>(query);
    return this.apiService.get<Pageable>(`${this.DOMAIN}/${encodeURIComponent(username.replace('@', '')) + queryString}`);
  }

  getViewsPosts(): Observable<PopularPost[]> {
    return this.apiService.get<PopularPost[]>(`${this.DOMAIN}/top/views`);
  }

  getWritingPosts(path:string, page:number): Observable<Pageable> {
    return this.apiService.get(`${this.DOMAIN}/writing/${path}?page=${page}`);
  }


}
