import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Post } from 'src/app/app.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/layout/confirm/confirm.component';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit, OnDestroy {

  post: Post;
  currentPost: Subscription;
  
  constructor(
    private dialog: MatDialog,
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

  canDeactivate(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { name: '확인', message: '작성을 중단하시겠습니까?' }
    });
    return dialogRef.afterClosed();
  }
  

  ngOnDestroy(): void {
    this.currentPost.unsubscribe();
  }

  onChangeContent(post: Post): void {
    this.postService.changeEditPost(post);
  }
}
