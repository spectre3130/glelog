import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/app.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyWritingService {

  constructor(
    private http: HttpClient
  ) { }

  getTempsavePosts(page): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts/writing/tempsave?page=${page}`);
  }

  getPublicPosts(page): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts/writing/public?page=${page}`);
  }

  getPrivatePosts(page): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.resource}/api/posts/writing/private?page=${page}`);
  }
}
