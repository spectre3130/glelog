import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-write-editor',
  templateUrl: './write-editor.component.html',
  styleUrls: ['./write-editor.component.scss'],
})
export class WriteEditorComponent implements OnInit {

  @Input() post: Post;
  @Output() changeContent = new EventEmitter<Post>();
  prevTitle: string;
  prevBody: string;
  
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
    if(this.prevTitle !== title) {
      this.post.title = title;
      this.prevTitle = title;
      this.changeContent.emit(this.post);
    }
  }

  onChangeBody(body: string) {
    if(this.prevBody !== body) {
      this.post.body = body;
      this.prevBody = body;
      this.changeContent.emit(this.post);
    }
  }

  cursorActivity(event): void {
    // const test: HTMLTextAreaElement = event.toTextArea();
  // console.log("TCL: WriteEditorComponent -> constructor -> event", event)
    // console.log(test);    
  }

}
