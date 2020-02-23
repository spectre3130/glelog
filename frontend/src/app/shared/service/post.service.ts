import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/app.model';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class PostService {

  private postSubject = new BehaviorSubject<Post>(this.initPost());
  currentPost = this.postSubject.asObservable();

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) { }
  
  initPost(): Post {
    return {
      title: '',
      body: '',
      tags: [],
      user: this.authService.loadedUser(),
    }
  }

  changePost(post: Post): void {
    this.postSubject.next(post);
  }

  getPost(_id: string): Observable<Post> {
    return this.apiService.get<Post>(`post?_id=${_id}`);
  }

  getPostBySeq(seq: number): Observable<Post> {
    return this.apiService.get<Post>(`post/${seq}`);
  }

  doTempSave(post: Post): Observable<Post> {
    return this.apiService.post<Post>('post/tempsave', post);
  }

  publishPost(post: Post): Observable<Post>  {
    return this.apiService.post<Post>('post', post);
  }

  updatePost(post): Observable<Post>  {
    return this.apiService.put<Post>('post', post);
  }

  deletePost(post: Post): Observable<any> {
    return this.apiService.delete<any>(`post?_id=${post._id}`);
  }

  savePostImage(_id: string, formData: FormData): Observable<string> {
    return this.saveImage(`postimage?_id=${_id}`, formData);
  }

  saveThumb(_id: string, formData: FormData): Observable<string> {
    return this.saveImage(`thumb?_id=${_id}`, formData);
  }

  private saveImage(path: string, formData:FormData) {
    return this.apiService.post<string, FormData>(`upload/${path}`, formData);
  }
}
