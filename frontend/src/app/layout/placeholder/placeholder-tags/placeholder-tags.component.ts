import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ph-tags',
  templateUrl: './placeholder-tags.component.html',
  styleUrls: ['./placeholder-tags.component.scss']
})
export class PlaceholderTagsComponent implements OnInit {

  repeat: Array<number>;
  
  constructor() { 
    this.repeat = Array(5).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
