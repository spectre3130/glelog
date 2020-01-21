import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../../shared/app.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  title: string;
  tags: Array<Tag> = [];
  @Output() body: EventEmitter<string> = new EventEmitter<string>();
  @Input() compiled: string;
  @Input() placeHolder: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  
  constructor() { }

  ngOnInit() {
  }

  onTitleChange(e) {
    this.title = e.target.value;
  }

  onBodyChange(e) {
    const body = e.target.value;
    if (!body) {
      this.body.emit(this.placeHolder);
    } else {
      this.body.emit(body);
    }
  }

  add(e: MatChipInputEvent): void {
    const input = e.input;
    const value = e.value;
    if ((value || '').trim()) {
      this.tags.push({name: '#' + value.trim()});
    }
    if (input) {
      input.value = '';
    }
    this.changeTextAreaHeight();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.changeTextAreaHeight();
  }

  changeTextAreaHeight() {
    const tagWrapper = document.querySelector<HTMLDivElement>('.mat-chip-list-wrapper');
    document.querySelector<HTMLDivElement>('.body-input').style.minHeight = (803 - tagWrapper.offsetHeight) + 'px'
    // console.log("TCL: EditorComponent -> changeTextAreaHeight -> wrapper", tagWrapper.offsetHeight);
  }
}
