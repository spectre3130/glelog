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
  tag: string;
  search: string;
  isLoaded: boolean;
  isLast: boolean;
  placeholderNum: number = 6;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.tag) this.tag = '#' + params.tag;
      if(params.search) this.search = params.search;
      this.posts = [];
      this.page = 1;
      this.isLoaded = true;
      this.isLast = false;
      this.placeholderNum = 6;
      this.getPosts();
    });
  }

  getPosts(): void {
    if(this.isLoaded && !this.isLast) {
      this.isLoaded = false;
      this.postsService.getPosts({
        page: this.page,
        tag: this.tag,
        search: this.search,
      })
      .subscribe(({ posts, last }) => { 
        this.isLoaded = true;
        this.isLast = last;
        this.posts = this.posts.concat(posts);
        if(this.page === 1) this.placeholderNum = 1;
        this.page++;
      });
    }
  }
}
