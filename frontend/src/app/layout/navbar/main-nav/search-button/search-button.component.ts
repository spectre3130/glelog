import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent implements OnInit {

  @ViewChild('searchBox') searchBox: ElementRef;
  readonly searchBoxKeysCodes: number[] = [ ENTER ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openSearchBox($event) {
    this.searchBox.nativeElement.style.width = '200px';
  }

  doSearch(value) {
    this.router.navigate(['search', value]);
  }

  doBlur() {
    this.searchBox.nativeElement.style.width = '1px';
  }
}
