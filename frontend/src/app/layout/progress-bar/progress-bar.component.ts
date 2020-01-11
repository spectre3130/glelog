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
        console.log("TCL: AppComponent -> ngOnInit -> event", event)
        clearTimeout(this.fetchingTimer);
        this.fetchingTimer = setTimeout(() => this.isFetching = true, 0);
      } else if(event instanceof NavigationEnd) {
        setTimeout(() => this.isFetching = false, 1000);
      }
    });
  }

}
