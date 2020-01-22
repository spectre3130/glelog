import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/app.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class EditorService {
  
  title: string;
  tags: Array<string>;
  body: string;

  constructor(
    private authService: AuthService
  ) { }

  setTitle(title: string): void {
    this.title = title;
  }

  setTags(tags: Array<string>): void {
    this.tags = tags;
  }

  setBody(body: string): void {
    this.body = body;
  }

  getPost(): Post {
    return {
      title: this.title,
      body: this.body,
      thumbnail: '',
      tags: this.tags,
      user: this.authService.loadedUser()
    }
  }

}
