import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ph-popular',
  templateUrl: './placeholder-popular.component.html',
  styleUrls: ['./placeholder-popular.component.scss']
})
export class PlaceholderPopularComponent implements OnInit {

  repeat: Array<number>;

  constructor() {
    this.repeat = Array(5).fill(0).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
