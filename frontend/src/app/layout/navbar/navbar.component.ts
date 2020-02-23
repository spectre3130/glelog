import { Component, OnInit} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isWrite: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof ActivationEnd),
        map((event:ActivationEnd) => event.snapshot.routeConfig.path)
    ).subscribe(path => {
      if(path === 'write') this.isWrite = true;
      else this.isWrite = false;
    });
  }

}
