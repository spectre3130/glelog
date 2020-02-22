import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {  
    this.route.queryParams
    .subscribe(params => {
      if(params.token) {
        this.authService.login(params.token);
      } 
    });
  }
}
