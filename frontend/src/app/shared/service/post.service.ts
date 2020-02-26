import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Post } from 'src/app/app.model';
import { ApiService } from './api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class PostService {

  private DOMAIN = 'post';
  private postSubject = new BehaviorSubject<Post>(this.initPost());
  private editPostSubject = new Subject<Post>();
  currentPost = this.postSubject.asObservable();
  currentEditPost = this.editPostSubject.asObservable();

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

  changeEditPost(post: Post): void {
    this.editPostSubject.next(post);
  }

  getPost(_id: string): Observable<Post> {
    return this.apiService.get<Post>(`${this.DOMAIN}?_id=${_id}`);
  }

  getPostBySlug(slug: string): Observable<Post> {
    const path = `${this.DOMAIN}/title/${encodeURIComponent(slug)}`;
    return this.apiService.get<Post>(path);
  }

  doTempSave(post: Post): Observable<Post> {
    return this.apiService.post<Post>(`${this.DOMAIN}/tempsave`, post);
  }

  doAutoSave(post: Post): Observable<Post> {
    return this.apiService.post<Post>(`${this.DOMAIN}/autosave`, post);
  }

  publishPost(post: Post): Observable<Post>  {
    return this.apiService.post<Post>(`${this.DOMAIN}`, post);
  }

  updatePost(post): Observable<Post>  {
    return this.apiService.put<Post>(`${this.DOMAIN}`, post);
  }

  deletePost(post: Post): Observable<any> {
    return this.apiService.delete<any>(`${this.DOMAIN}?_id=${post._id}`);
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
