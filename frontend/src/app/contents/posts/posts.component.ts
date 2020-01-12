import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  items = [];

  constructor() { 
    for(let i = 0; i < 10; i++) {
      this.items.push(i);
    }
  }

  ngOnInit() {

  }

}
