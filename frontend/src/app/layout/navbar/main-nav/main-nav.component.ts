import { Component, OnInit } from '@angular/core';
import { NavigationNode } from 'src/app/app.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  nodes: NavigationNode[] = [
    { name: '글목록', action: '/', class: 'link' },
    { name: '태그', action: '/tags', class: 'link' },
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
