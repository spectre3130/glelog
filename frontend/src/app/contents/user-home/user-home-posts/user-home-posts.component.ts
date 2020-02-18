import { Component, OnInit, Input, AfterViewInit, OnChanges, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Post, Tag } from 'src/app/app.model';
import { UserHomeService } from '../user-home.service';
import { tap, take, map, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';


@Component({
  selector: 'app-user-home-posts',
  templateUrl: './user-home-posts.component.html',
  styleUrls: ['./user-home-posts.component.css']
})
export class UserHomePostsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() username: string;
  @ViewChild('userTags') userTags: ElementRef;
  posts: Array<Post> = [];
  tags: Array<Tag>;
  page: number = 1;
  tagName: string = ''
  isLoaded: boolean = true;
  scrollEvent: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userHomeService: UserHomeService
  ) { }

  ngOnInit():void  {
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

  ngOnChanges(changes):void  {
    if(changes.username) {
      this.getUserPosts();
      this.getUserTags();
    }
  }

  ngOnDestroy(): void {
    if(this.scrollEvent) {
      this.scrollEvent.unsubscribe();
    }
  }

  onScroll():void  {
    this.getUserPosts();
  }

  getUserPosts(): void  {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.userHomeService.getUserPosts(this.username, this.page, this.tagName)
      .subscribe(posts => { 
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

  getUserTags(): void  {
    this.userHomeService.getUserTags(this.username)
    .pipe(
      tap((tags: Array<Tag>) => {
        tags.unshift({ name: '전체보기', value: '' })
      })
    )
    .subscribe((tags: Array<Tag>) => this.tags = tags);
  }

  getUserPostsByTagName(tagName: string): void  {
    this.posts = [];
    this.page = 1;
    this.tagName = tagName;
    this.getUserPosts();
  }

}
