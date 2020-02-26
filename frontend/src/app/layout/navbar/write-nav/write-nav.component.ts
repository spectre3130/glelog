import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { faArrowLeft, faImage, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { catchError, switchMap, tap, debounceTime, take } from 'rxjs/operators';
import { Post } from 'src/app/app.model';
import { PublishComponent } from 'src/app/contents/publish/publish.component';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Subscription } from 'rxjs';
import * as removeMd from 'remove-markdown';

@Component({
  selector: 'app-write-nav',
  templateUrl: './write-nav.component.html',
  styleUrls: ['./write-nav.component.scss']
})
export class WriteNavComponent implements OnInit, OnDestroy {

  faArrowLeft: IconDefinition = faArrowLeft;
  faImage: IconDefinition = faImage;
  faSave: IconDefinition = faSave;
  btnName: string = '작성하기';

  @ViewChild('postImage') postImage: ElementRef;
  post: Post;
  currentEditPost: Subscription;
  disabled: boolean = false;
  fetchingTimer: any;

  constructor(
    private router: Router,
    private postService: PostService,
    private location: Location,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    //처음 로딩을 위한...
    this.postService.currentPost.pipe(
      take(1),
    ).subscribe(post => this.post = post);

    //이후 내용 변경점은 다른 옵저버블에서...
    this.currentEditPost = this.postService.currentEditPost
      .pipe(
        tap(() => this.changeBtnWhenSaving(true)),
        debounceTime(1200),
        switchMap(post => {
          post.description = this.removeMarkdown(post.body);
          return post._id 
            ? this.postService.doAutoSave(post)
            : this.postService.doTempSave(post)
        })
      ).subscribe(post => {
        this.changeBtnWhenSaving(false);
        this.post = Object.assign(this.post, post);
        this.postService.changePost(this.post);
      });

  }

  ngOnDestroy(): void {
    this.currentEditPost.unsubscribe();
  }

  changeBtnWhenSaving(isStart): void {
    if(isStart) {
      clearTimeout(this.fetchingTimer);
      this.btnName = '저장중...';
      this.disabled = true;
    } else {
      this.fetchingTimer = setTimeout(() => {
        this.btnName = '작성하기';
        this.disabled = false;
      }, 500);
    }
  }

  removeMarkdown(body: string): string {
    return removeMd(body)
            .substr(0, 170)
            .replace(/\r?\n|\r/g, ' ')
            .replace(/<|>/g, '');
  }

  publish(): void {
    if(this.checkValidation()) {
      setTimeout(() => {
        this.openPublishDialog(this.post);
      }, 0);
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
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '800px',
      height: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(({ post, next }) => {
      if (next) {
        this.afterClosedAction(post);
      }
    });
  }

  afterClosedAction(post: Post): void {
    if(post.posted) {
      this.postService.updatePost(post)
        .subscribe(slug => this.router.navigate(['post', slug]));
    } else {
      this.postService.publishPost(post)
        .subscribe(slug => this.router.navigate(['post', slug]));
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
        return this.postService.doAutoSave(post)
      }),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => {
        this.postImage.nativeElement.value = null;
        this.post = Object.assign(this.post, post);
        this.postService.changePost(this.post)
      },
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }

  startTempSave(post:Post, formData: FormData): void {
    this.postService.doTempSave(post)
    .pipe(
      tap(tempsave => post = Object.assign(post, tempsave)),
      switchMap(tempsave => this.postService.savePostImage(tempsave._id, formData)),
      switchMap(markdownImage => {
        post.body += markdownImage;
        return this.postService.doAutoSave(post);
      }),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => {
        this.postImage.nativeElement.value = null;
        this.post = Object.assign(this.post, post);
        this.postService.changePost(this.post)
      },
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
