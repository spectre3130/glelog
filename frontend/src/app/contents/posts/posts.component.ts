import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/app.model';
import { PostsService } from './posts.service';
import { take, filter, tap } from 'rxjs/operators';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.postsService.getPosts(this.page)
      .pipe(take(1))
      .subscribe(posts => { 
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

}
