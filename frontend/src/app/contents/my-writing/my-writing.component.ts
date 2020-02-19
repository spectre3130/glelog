import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsRoute } from 'src/app/app.model';

@Component({
  selector: 'app-my-writing',
  templateUrl: './my-writing.component.html',
  styleUrls: ['./my-writing.component.css']
})
export class MyWritingComponent implements OnInit {

  tabsRoutes :Array<TabsRoute> = [
    { path: 'tempsave', label: '임시저장' },
    { path: 'public', label: '공개' },
    { path: 'private', label: '비공개' },
  ];
  activeLink: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  changeActiveLink(e): void {
    this.activeLink = this.route.snapshot.children[0].routeConfig.path;
  }

}
