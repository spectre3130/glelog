import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Post } from 'src/app/app.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit, OnDestroy {

  post: Post;
  currentPost: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ post }) => {
      if(post) {
        this.postService.changePost(post);
      } else {
        this.postService.changePost(this.postService.initPost());
      }
    });

    this.currentPost = this.postService.currentPost.subscribe(post => {
      this.post = post;
    });
  }

  ngOnDestroy(): void {
    this.currentPost.unsubscribe();
  }

  onChangeContent(post: Post): void {
    this.postService.changeEditPost(post);
  }
}
