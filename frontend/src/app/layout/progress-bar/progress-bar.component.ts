import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  currentPath: string;
  isFetching:boolean = false;
  fetchingTimer: any;
  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        clearTimeout(this.fetchingTimer);
        this.fetchingTimer = setTimeout(() => this.isFetching = true, 200);
      } else if(event instanceof NavigationEnd) {
        this.fetchingTimer = setTimeout(() => this.isFetching = false, 500);
      }
    });
  }

}
