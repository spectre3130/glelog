import { Injectable, EventEmitter } from '@angular/core';
import { Post, UploadImage } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EditorService } from '../editor/editor.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class WriteService {

  writeEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  changeWriteMode(isWriteMode: boolean) {
    this.writeEvent.emit(isWriteMode);
  }

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

  
}
