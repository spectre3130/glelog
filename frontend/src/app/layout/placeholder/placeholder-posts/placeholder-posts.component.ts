import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ph-posts',
  templateUrl: './placeholder-posts.component.html',
  styleUrls: ['./placeholder-posts.component.scss']
})
export class PlaceholderPostsComponent implements OnInit {

  repeat: Array<number>;

  constructor() { 
    this.repeat = Array(6).fill(0).map((x,i)=>i);
  }

  ngOnInit() {
  }

}
