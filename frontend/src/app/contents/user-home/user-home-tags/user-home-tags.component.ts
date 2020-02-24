import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-tags',
  templateUrl: './user-home-tags.component.html',
  styleUrls: ['./user-home-tags.component.scss']
})
export class UserHomeTagsComponent implements OnInit, OnDestroy {

  @Input() tags: Tag[];
  @Output() selected = new EventEmitter<string>();
  @ViewChild('userTags') userTags: ElementRef;
  onScroll: Subscription;
  
  constructor() { }

  ngOnInit(): void {
    this.onScroll = fromEvent(document, 'scroll')
    .pipe(
      map((e) => {
        const doc: HTMLDocument = e.target as HTMLDocument;
        return doc.documentElement.scrollTop > 240 ? true : false
      }),
      distinctUntilChanged()
    )
    .subscribe((isUnder) => {
      if(isUnder) {
        this.userTags.nativeElement.style.position = 'fixed';
        this.userTags.nativeElement.style.top = '90px';
      } else {
        this.userTags.nativeElement.style.position = 'relative';
        this.userTags.nativeElement.style.top = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.onScroll.unsubscribe();
  }

  onSelected(event, tag): void {
    this.selected.emit(tag);
  }


}
