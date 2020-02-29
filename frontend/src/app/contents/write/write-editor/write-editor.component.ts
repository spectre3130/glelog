import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-write-editor',
  templateUrl: './write-editor.component.html',
  styleUrls: ['./write-editor.component.scss']
})
export class WriteEditorComponent implements OnInit {

  @Input() post: Post;
  @Output() changeContent = new EventEmitter<Post>();
  
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
    this.changeContent.emit(this.post);
  }

  onChangeBody(body: string) {
    // console.log("TCL: WriteEditorComponent -> onChangeBody -> body", body)
    this.post.body = body;
    this.changeContent.emit(this.post);
  }

  onFocus(event): void {
  console.log("TCL: WriteEditorComponent -> constructor -> event", event)
  console.log("TCL: WriteEditorComponent -> constructor -> event", event.getSelection())
    // const test: HTMLTextAreaElement = event.toTextArea();
  // console.log("TCL: WriteEditorComponent -> constructor -> event", event)
    // console.log(test);
    
  }

}
