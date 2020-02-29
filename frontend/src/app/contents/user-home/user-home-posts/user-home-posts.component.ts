import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Post, Tag } from 'src/app/app.model';
import { tap } from 'rxjs/operators';
import { PostsService } from 'src/app/shared/service/posts.service';
import { TagsService } from 'src/app/shared/service/tags.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-home-posts',
  templateUrl: './user-home-posts.component.html',
  styleUrls: ['./user-home-posts.component.scss']
})
export class UserHomePostsComponent implements OnInit {

  username: string;
  posts: Post[];
  tags: Tag[];
  page: number;
  tag: string;
  isLoaded: boolean;
  isLast: boolean;
  placeholderNum: number;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }
  
  ngOnInit(): void { 
    this.route.params.subscribe(({ username, tag }) => {
      this.username = username;
      if(tag) this.tag = '#' + tag;
      this.posts = [];
      this.page = 1;
      this.isLoaded = true;
      this.isLast = false;
      this.placeholderNum = 6;
      this.getUserPosts();
    });
  }

  getUserPosts(): void  {
    if(this.isLoaded && !this.isLast) {
      this.isLoaded = false;
      this.postsService.getUserPosts(this.username, {
        page: this.page,
        tag: this.tag
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
