import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/app.model';
import { PostsService } from 'src/app/shared/service/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  posts: Post[];
  page: number;
  tagName: string;
  isLoaded: boolean;
  placeholderNum: number = 6;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.tag) this.tagName = params.tag;
      this.posts = [];
      this.page = 1;
      this.isLoaded = true;
      this.placeholderNum = 6;
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
        if(this.page === 1) this.placeholderNum = 1;
        this.page++;
      });
    }
  }
}
