import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowLeft, faImage, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Post } from 'src/app/app.model';
import { PublishComponent } from 'src/app/contents/publish/publish.component';
import * as removeMd from 'remove-markdown';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-nav',
  templateUrl: './write-nav.component.html',
  styleUrls: ['./write-nav.component.scss']
})
export class WriteNavComponent implements OnInit, OnDestroy {

  faArrowLeft: IconDefinition = faArrowLeft;
  faImage: IconDefinition = faImage;
  faSave: IconDefinition = faSave;
  post: Post;
  currentPost: Subscription;

  constructor(
    private router: Router,
    private postService: PostService,
    private location: Location,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentPost = this.postService.currentPost
      .subscribe(post => this.post = post);
  }

  ngOnDestroy(): void {
    this.currentPost.unsubscribe();
  }

  publish(): void {
    if(this.checkValidation()) {

      this.post.description = removeMd(this.post.body)
      .substr(0, 170)
      .replace(/\r?\n|\r/g, ' ')
      .replace(/<|>/g, '');

    if(this.post._id) {
      this.postService.updatePost(this.post)
      .subscribe(post => this.openPublishDialog(post));
      } else {
        this.postService.doTempSave(this.post)
        .subscribe(tempsave => this.openPublishDialog(tempsave));
      }
    }
  }

  checkValidation(): boolean {
    if(!this.post.title) {
      this._snackBar.open('제목을 입력해주세요.', '닫기',{
        duration: 5000,
        verticalPosition: 'top'
      });
      return false;
    } else if(!this.post.body) {
      this._snackBar.open('본문을 입력해주세요.', '닫기', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return false;
    } 
    return true;
  }

  openPublishDialog(post: Post): void {
    this.postService.changePost(post);
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '800px',
      height: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.post) this.postService.changePost(result.post);
      if(result.next) this.afterClosedAction(result.post);
    });
  }

  afterClosedAction(post: Post): void {
    if(post.posted) {
      this.postService.updatePost(post)
        .subscribe(post => this.router.navigate(['post', post.slug]));
    } else {
      this.postService.publishPost(post)
        .subscribe(post => this.router.navigate(['post', post.slug]));
    }
  }

  savePostImage(files: FileList):void {
    if(!files.length) {
      return;
    }
    const formData:FormData = new FormData();
    formData.append('postImage', files[0]);
    if(this.post._id) {
      this.startSavePostImage(this.post, formData);
    } else {
      this.startTempSave(this.post, formData);
    }
  }

  startSavePostImage(post:Post, formData: FormData): void {
    this.postService.savePostImage(post._id, formData)
    .pipe(
      switchMap(markdownImage => {
        post.body += markdownImage
        return this.postService.updatePost(post)
      }),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => this.postService.changePost(post),
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }

  startTempSave(post:Post, formData: FormData): void {
    this.postService.doTempSave(post)
    .pipe(
      tap(tempsave => {
        post._id = tempsave._id;
        post.title = tempsave.title;
        post.body = tempsave.body;
      }),
      switchMap(tempsave => this.postService.savePostImage(tempsave._id, formData)),
      switchMap(markdownImage => {
        post.body += markdownImage
        return this.postService.updatePost(post)
      }),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => this.postService.changePost(post),
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }
  
  cancelConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { name: '돌아가기', message: '작성을 중단하시겠습니까?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.location.back();
    });
  }
  

}
