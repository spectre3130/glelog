import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-my-writing',
  templateUrl: './loading-my-writing.component.html',
  styleUrls: ['./loading-my-writing.component.css']
})
export class LoadingMyWritingComponent implements OnInit {

  repeat: Array<number>;
  constructor() { 
    this.repeat = Array(6).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
