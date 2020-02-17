import { Component, OnInit } from '@angular/core';
import { PopularPost } from 'src/app/app.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css']
})
export class PopularPostsComponent implements OnInit {

  posts: Array<PopularPost>;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsService.getViewsPosts()
    .subscribe(posts => {
      this.posts = posts
    });
  }

}
