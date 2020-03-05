import { Component, OnInit} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isNotWrite: boolean = true;
  currentPath: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof ActivationEnd),
        map((event:ActivationEnd) => event.snapshot.routeConfig.path)
    ).subscribe(path => {
      this.currentPath = path;
      if(path === 'write') this.isNotWrite = false;
      else this.isNotWrite = true;
    });
  }

}
