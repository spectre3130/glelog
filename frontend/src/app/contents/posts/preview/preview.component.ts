import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() 
  post: Post;

  constructor() { }

  ngOnInit() {
  
  }

}
