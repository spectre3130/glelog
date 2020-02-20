import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/app.model';
import { PostsService } from './posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  posts: Array<Post> = [];
  page: number = 1;
  tagName: string;
  isLoaded: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.tag) this.tagName = '#' + params.tag;
      this.getPosts();
    });
  }

  getPosts(): void {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.postsService.getPosts(this.page, this.tagName)
      .subscribe(posts => { 
        this.isLoaded = true;
        this.posts = this.posts.concat(posts);
        this.page++;
      });
    }
  }
}
