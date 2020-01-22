import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/app.model';
import { PostsService } from './posts.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Array<Post>

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsService.getPosts()
    .pipe(take(1))
    .subscribe(posts => { 
      this.posts = posts
    });
  }

}
