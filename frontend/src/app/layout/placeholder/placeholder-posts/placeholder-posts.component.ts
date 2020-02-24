import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ph-posts',
  templateUrl: './placeholder-posts.component.html',
  styleUrls: ['./placeholder-posts.component.scss']
})
export class PlaceholderPostsComponent implements OnInit {

  @Input() number;
  repeat: number[];

  constructor() { 
  }

  ngOnInit(): void {
    this.repeat = Array(this.number).fill(0).map((x,i)=>i);
  }
}
