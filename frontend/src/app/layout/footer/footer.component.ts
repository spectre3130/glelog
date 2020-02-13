import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faBookOpen = faBookOpen;
  faGithub = faGithub;
  display: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(paramMap => console.log(paramMap))
    this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      map((event:ActivationEnd) => event.snapshot.routeConfig.path.split('/')[0])
    )
    .subscribe(path => {
      if(this.matchRouterPath(path)) this.display = false;
      else this.display = true;
    });
  }

  matchRouterPath(path: string): boolean {
    const displayOffPath = ['', 'write', ':username', 'tag'];
    return displayOffPath.find(el => path === el) || !path ? true : false;
  }

}
