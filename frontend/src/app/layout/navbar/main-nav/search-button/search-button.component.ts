import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent implements OnInit, OnDestroy {

  @ViewChild('searchBox') searchBox: ElementRef;
  routerSubscription: Subscription;
  readonly searchBoxKeysCodes: number[] = [ ENTER ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(
      (event: NavigationEnd) => {
        if(event.url.split('/')[1] !== 'search') {
          this.searchBox.nativeElement.value = '';
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  openSearchBox($event): void  {
    this.searchBox.nativeElement.style.width = '200px';
  }

  doSearch(value): void {
    if(value) this.router.navigate(['search', value]);
    else this.router.navigate(['/']);
  }

  doBlur(): void {
    this.searchBox.nativeElement.style.width = '1px';
  }
}
