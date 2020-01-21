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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push({name: '#' + value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
