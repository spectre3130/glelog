import { Component, OnInit, OnChanges } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd, ActivationStart, NavigationStart } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faBookOpen = faBookOpen;
  faGithub = faGithub;
  display: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events
    .pipe(
      tap(event => {
        if(event instanceof NavigationStart) this.display = false
      }),
      filter(event => event instanceof ActivationEnd),
      map((event:ActivationEnd) => {
        const path = event.snapshot.routeConfig.path.split('/');
        return path[0] !== 'me' ? path[0] : path[1];
      })
    )
    .subscribe(path => {
      if(this.matchRouterPath(path)) this.display = false;
      else this.display = true;
    });
  }
  

  matchRouterPath(path: string): boolean {
    const displayOffPath = ['', 'write', ':username', 'tag', 'writing'];
    return displayOffPath.find(el => path === el) || !path ? true : false;
  }

}
