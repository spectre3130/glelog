import { Injectable } from '@angular/core';
import { Post } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class WriteService {

  constructor(
    private http: HttpClient
  ) { }

  doTempSave(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.resource}/api/post/tempsave`, post);
  }

  publishPost(post: Post): Observable<Post>  {
    return this.http.post<Post>(`${environment.resource}/api/post`, post)
  }

  updatePost(post): Observable<Post>  {
    return this.http.put<Post>(`${environment.resource}/api/post`, post);
  }

  savePostImage(_id: string, formData: FormData): Observable<string> {
    return this.http.post<string>(`${environment.resource}/api/upload/postimage?_id=${_id}`, formData);
  }

  saveThumb(_id: string, formData: FormData): Observable<string> {
    return this.http.post<string>(`${environment.resource}/api/upload/thumb?_id=${_id}`, formData);
  }

  
}
