import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  isFetching:boolean = false;
  fetchingTimer: any;
  constructor(
    private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.isFetching.subscribe(isFetching => {
      if(isFetching) {
        clearTimeout(this.fetchingTimer);
        this.fetchingTimer = setTimeout(() => this.isFetching = true, 200);
      } else {
        clearTimeout(this.fetchingTimer);
        this.fetchingTimer = setTimeout(() => this.isFetching = false, 300);
      }
    });
  }

}
