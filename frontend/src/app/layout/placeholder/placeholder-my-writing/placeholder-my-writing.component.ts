import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ph-my-writing',
  templateUrl: './placeholder-my-writing.component.html',
  styleUrls: ['./placeholder-my-writing.component.scss']
})
export class PlaceholderMyWritingComponent implements OnInit {

  repeat: number[];

  constructor() { 
    this.repeat = Array(1).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
