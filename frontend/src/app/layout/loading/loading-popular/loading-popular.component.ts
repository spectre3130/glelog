import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-popular',
  templateUrl: './loading-popular.component.html',
  styleUrls: ['./loading-popular.component.css']
})
export class LoadingPopularComponent implements OnInit {

  repeat: Array<number>;

  constructor() {
    this.repeat = Array(5).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
