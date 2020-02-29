import { Component, OnInit } from '@angular/core';
import { Post, Pageable } from 'src/app/app.model';
import { PostsService } from 'src/app/shared/service/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-writing-list',
  templateUrl: './my-writing-list.component.html',
  styleUrls: ['./my-writing-list.component.scss']
})
export class MyWritingListComponent implements OnInit {

  posts: Post[] = [];
  path: string;
  page: number = 1;
  isLoaded: boolean = true;
  isLast: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { 
    this.path = route.routeConfig.path;
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ pageable }) => this.nextPosts(pageable));
  }

  getPosts(): void {
    if(this.isLoaded && !this.isLast) {
      this.isLoaded = false;
      this.postsService.getWritingPosts(this.path, this.page)
        .subscribe(pageable => this.nextPosts(pageable));
    }
  }

  nextPosts(pageable: Pageable): void {
    this.isLoaded = true;
    this.isLast = pageable.last;
    this.posts = this.posts.concat(pageable.posts);
    this.page++;
  }

  onDelete(): void {
    this.posts = [];
    this.isLoaded = true;
    this.isLast = false;
    this.page = 1;
    this.getPosts();
  }

}
