import { Component, OnInit } from '@angular/core';
import { PopularPost } from 'src/app/app.model';
import { PostsService } from 'src/app/shared/service/posts.service';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.scss']
})
export class PopularPostsComponent implements OnInit {

  posts: PopularPost[];

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getViewsPosts()
    .subscribe(posts => {
      this.posts = posts
    });
  }

}
