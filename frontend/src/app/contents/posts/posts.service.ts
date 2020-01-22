import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from 'src/app/shared/app.model';

@Injectable()
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.resource}/api/post?page=1`);
  }
}
