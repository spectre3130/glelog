import { Injectable, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class EditorService {
  
  _id: string;
  title: string;
  tags: Array<string>;
  body: string;
  chagePostEvent: EventEmitter<Post> = new EventEmitter<Post>();

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

  setPost(post: Post): void {
    this._id = post._id;
    this.title = post.title;
    this.body = post.body;
    this.chagePostEvent.emit(post);
  }

  getPost(): Post {
    return {
      _id: this._id,
      title: this.title,
      body: this.body,
      thumb: '',
      tags: this.tags,
      user: this.authService.loadedUser()
    }
  }

  clear(): void {
    this._id = undefined;
    this.title = '';
    this.tags = [];
    this.body = '';
  }

}
