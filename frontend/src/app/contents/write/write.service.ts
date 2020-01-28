import { Injectable, EventEmitter } from '@angular/core';
import { Post } from 'src/app/shared/app.model';
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
    private router: Router,
    private editorService: EditorService,
  ) { }

  changeWriteMode(isWriteMode: boolean) {
    this.writeEvent.emit(isWriteMode);
  }

  createPost(): void  {
    const post:Post = this.editorService.getPost();
    this.http.post<Post>(`${environment.resource}/api/post`, post)
    .pipe(take(1))
    .subscribe(post => {
      this.router.navigate(['post', post.seq]);
    });
  }
}
