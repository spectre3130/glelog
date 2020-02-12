import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { fromEvent, EMPTY, of, Subscription } from 'rxjs';
import { map, single, scan, switchMap, pairwise, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-home-tags',
  templateUrl: './user-home-tags.component.html',
  styleUrls: ['./user-home-tags.component.css']
})
export class UserHomeTagsComponent implements OnInit, OnDestroy {

  @Input() username: string;
  @Input() tags: Array<Tag>;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('userTags') userTags: ElementRef;
  scrollEvent: Subscription;
  constructor(
  ) { }

  ngOnInit() {
    this.scrollEvent = fromEvent(document, 'scroll')
    .pipe(
      map(e => e.target),
      map((doc: HTMLDocument) => doc.documentElement.scrollTop > 240 ? true : false),
      distinctUntilChanged()
    )
    .subscribe((result) => {
      if(result) {
        this.userTags.nativeElement.style.position = 'fixed';
        this.userTags.nativeElement.style.top = '90px';
      } else {
        this.userTags.nativeElement.style.position = 'relative';
        this.userTags.nativeElement.style.top = 0;
      }
    });
  }

  ngOnDestroy() {
    if(this.scrollEvent) {
      this.scrollEvent.unsubscribe();
    }
  }

  onClickTag(event, name) {
    document.documentElement.scrollTop = 0;
    this.onSelected.emit(name);
  }


}
