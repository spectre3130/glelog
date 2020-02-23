import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from 'src/app/app.model';
import { ApiService } from './api.service';

@Injectable()
export class PostService {

  private _post: Post;
  changePost = new EventEmitter<Post>();

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  get post(): Post {
    return this._post;
  }

  set post(post: Post) {
    this._post = post;
    this.changePost.emit(post);
  }

  getPost(seq: number): Observable<Post> {
    return this.http.get<Post>(`${environment.resource}/api/post/${seq}`);
  }


}
