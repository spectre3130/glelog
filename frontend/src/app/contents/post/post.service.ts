import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from 'src/app/shared/app.model';

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getPost(seq: number): Observable<Post> {
    return this.http.get<Post>(`${environment.resource}/api/post/${seq}`);
  }
}
