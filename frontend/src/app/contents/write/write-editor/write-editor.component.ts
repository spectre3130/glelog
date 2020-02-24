import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-write-editor',
  templateUrl: './write-editor.component.html',
  styleUrls: ['./write-editor.component.scss']
})
export class WriteEditorComponent implements OnInit {

  @Input() post: Post;
  @Output() changePost = new EventEmitter<Post>();
  
  codeMirrorOptions = {
    theme: '3024-day',
    mode: 'markdown',
    lineWrapping: true,
    placeholder: '본문',
  };

  constructor() { }

  ngOnInit(): void {
  }

  onChangeTitle(title: string): void {
    this.post.title = title;
    this.changePost.emit(this.post);
  }

  onChangeBody(body: string) {
    this.post.body = body;
    this.changePost.emit(this.post);
  }

}
