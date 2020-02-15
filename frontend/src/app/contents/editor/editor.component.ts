import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EditorService } from './editor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  title: string = '';
  tags: Array<string> = [];
  body: string = '';
  placeHolder: string;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  changePostEvent: Subscription;
  
  constructor(
    private editorService: EditorService) { }

  ngOnInit() {
    this.placeHolder = this.getPlaceHolder();
    this.changePostEvent = this.editorService.chagePostEvent
    .subscribe(post => {
      this.title = post.title;
      this.body = post.body;
    })
  }

  ngOnDestroy() {
    this.changePostEvent.unsubscribe();
    this.editorService.clear();
  }

  onTitleChange(e): void {
    const title: string = e.target.value;
    this.title = title;
    this.editorService.setTitle(title);
  }

  onBodyChange(e): void {
    const body = e.target.value 
    if(body) this.body = body;
    else this.body = '';
    this.editorService.setBody(body);
  }

  add(e: MatChipInputEvent): void {
    const input: HTMLInputElement = e.input;
    const value: string = e.value;
    if ((value || '').trim()) {
      this.tags.push('#' + value.trim());
      this.editorService.setTags(this.tags);
    }
    if (input) {
      input.value = '';
    }
    this.changeTextAreaHeight();
  }


  remove(tag: string): void {
    const index: number = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.editorService.setTags(this.tags);
    }
    this.changeTextAreaHeight();
  }

  private changeTextAreaHeight() {
    const tagWrapper = document.querySelector<HTMLDivElement>('.mat-chip-list-wrapper');
    document.querySelector<HTMLDivElement>('.body-input').style.minHeight = (803 - tagWrapper.offsetHeight) + 'px'
  }

  
  private getPlaceHolder(): string {
    return '본문을 입력해주세요.';
  }
}
