import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/shared/app.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() 
  post: any;

  constructor() { }

  ngOnInit() {
  
  }

}
