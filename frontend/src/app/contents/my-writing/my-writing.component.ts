import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { TabsRoute } from 'src/app/app.model';
import { filter, map } from 'rxjs/operators';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeLink = this.route.snapshot.children[0].routeConfig.path;
  }

}
