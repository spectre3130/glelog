import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../../shared/app.model';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  title: string;
  tags: Array<string> = [];
  body: string;
  placeHolder: string;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  
  constructor(private editorService: EditorService) { }

  ngOnInit() {
    this.placeHolder = this.getPlaceHolder();
    this.body = this.placeHolder;
  }

  onTitleChange(e): void {
    const title = e.target.value;
    if(title) {
      this.title = title;
      this.editorService.setTitle(title);
    }
  }

  onBodyChange(e): void {
    const body: string = e.target.value;
    if (body) {
      this.body = body;
      this.editorService.setBody(body);
    } 
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
    return (
      '# Title \n' +
      '## Title\n' +
      '### Title\n' +
      '#### Title\n\n' +

      '**bold**\n\n' +

      '*italic*\n\n' +

      'inline `code`\n\n' +

      '### code block\n' +
      '```javascript\n' +
      'const foo = () => {\n' +
      '    return 1\n' +
      '}\n' +
      '```\n\n' +

      '### unorderd list\n' +
      '- item 1\n' +
      '* item 2\n\n' +

      '### orderd list\n\n' +
      '1. item a\n' +
      '2. item b'
    );
  }

}
