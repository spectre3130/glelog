import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-tags',
  templateUrl: './loading-tags.component.html',
  styleUrls: ['./loading-tags.component.css']
})
export class LoadingTagsComponent implements OnInit {

  repeat: Array<number>;
  
  constructor() { 
    this.repeat = Array(5).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
