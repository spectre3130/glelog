import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/app.model';
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
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { 
    this.path = route.routeConfig.path;
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ posts }) => this.nextPosts(posts));
  }

  getPosts(): void {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.postsService.getWritingPosts(this.path, this.page)
        .subscribe(posts => this.nextPosts(posts));
    }
  }

  nextPosts(posts: Post[]): void {
    this.isLoaded = true;
    this.posts = this.posts.concat(posts);
    this.page++;
  }

  onDelete(): void {
    this.posts = [];
    this.isLoaded = true;
    this.page = 1;
    this.getPosts();
  }

}
