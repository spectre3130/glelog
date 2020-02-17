import { Injectable, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';
import { AuthService } from 'src/app/auth/auth.service';
import * as removeMd from 'remove-markdown';

@Injectable()
export class WriteStore {

  _id: string;
  title: string;
  tags: Array<string> = [];
  body: string;
  thumb: string;
  open: boolean = true;

  chagePostEvent: EventEmitter<Post> = new EventEmitter<Post>();
  writeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  setThumb(thumb: string): void {
    this.thumb = thumb;
  }

  setOpen(open: boolean): void {
    this.open = open;
  }

  setPost(post: Post): void {
    this._id = post._id;
    this.title = post.title;
    this.tags = post.tags;
    this.body = post.body;
    this.thumb = post.thumb;
    this.open = post.open;
    this.chagePostEvent.emit(post);
  }

  getPost(): Post {
    return {
      _id: this._id,
      title: this.title,
      tags: this.tags,
      body: this.body,
      thumb: this.thumb,
      open: this.open,
      description: (this.body && this.body.length > 100) 
      ? (removeMd(this.body).substr(0, 96) + '...').replace(/\r?\n|\r/g, '')
      : removeMd(this.body).substr(0, 99).replace(/\r?\n|\r/g, ''),
      user: this.authService.loadedUser()
    }
  }

  clear(): void {
    this._id = undefined;
    this.title = undefined;
    this.tags = [];
    this.body = undefined;
    this.thumb = undefined;
    this.open = true;
  }

  changeWriteMode(isWriteMode: boolean) {
    this.writeEvent.emit(isWriteMode);
  }

}