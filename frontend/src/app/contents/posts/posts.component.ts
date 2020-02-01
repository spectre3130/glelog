import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/app.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, AfterViewInit {

  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPosts();
  }

  getPosts() {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.postsService.getPosts(this.page)
      .subscribe(posts => { 
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }
}
