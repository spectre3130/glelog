import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-preview',
  templateUrl: './popular-preview.component.html',
  styleUrls: ['./popular-preview.component.css']
})
export class PopularPreviewComponent implements OnInit {

  posts = [];
  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 5; i++) {
      this.posts.push(i);
    }
  }

}
