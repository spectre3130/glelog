import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-posts',
  templateUrl: './loading-posts.component.html',
  styleUrls: ['./loading-posts.component.css']
})
export class LoadingPostsComponent implements OnInit {

  repeat: Array<number>;

  constructor() { 
    this.repeat = Array(1).fill(0).map((x,i)=>i);
  }

  ngOnInit() {
  }

}
