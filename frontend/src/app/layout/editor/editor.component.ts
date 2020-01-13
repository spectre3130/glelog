import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  @Input() compiled: string;
  @Input() placeHolder: string;
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onValueChange(e) {
    const body = e.target.value;

    if (!body) {
      return this.valueChanged.emit(this.placeHolder);
    } else {
      this.valueChanged.emit(body);
    }
  }

}
