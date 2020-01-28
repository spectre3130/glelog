import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { User } from './shared/app.model';
import { AuthService } from './auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'glelog-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit() {  
    this.route.queryParams
    .subscribe(params => {
      if(params.token) {
        this.authService.login(params.token);
      } 
    });
  }
}
