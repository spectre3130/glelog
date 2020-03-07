import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { faArrowLeft, faImage, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { catchError, switchMap, tap, debounceTime, take } from 'rxjs/operators';
import { Post } from 'src/app/app.model';
import { PublishComponent } from 'src/app/contents/publish/publish.component';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Subscription, Observable } from 'rxjs';
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
  currentPost: Subscription;
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

    this.currentPost = this.postService.currentPost.subscribe(
      post => this.post = post
    );

    this.currentEditPost = this.postService.currentEditPost
      .pipe(
        tap(() => this.changeBtnNameWhenSaving(true)),
        debounceTime(1500),
        switchMap(post => {
          post.description = this.removeMarkdown(post.body);
          return (post._id)
            ? this.postService.doAutoSave(post)
            : this.postService.doTempSave(post)
        })
      ).subscribe(post => {
        this.post._id = post._id;
        this.post.title = post.title;
        this.post.slug = post.slug;
        this.changeBtnNameWhenSaving(false);
      });

  }

  ngOnDestroy(): void {
    this.currentPost.unsubscribe();
    this.currentEditPost.unsubscribe();
  }

  changeBtnNameWhenSaving(isStart): void {
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
            .substr(0, 200)
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
      this.writeNavSnackBar('제목을 입력해주세요.');
      return false;
    } else if(!this.post.body) {
      this.writeNavSnackBar('본문을 입력해주세요.');
      return false;
    } 
    return true;
  }

  openPublishDialog(post: Post): void {
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '800px',
      height: '450px',
      autoFocus: false,
      data: post
    });
    dialogRef.afterClosed().subscribe(({ post, next }) => {
      if(!next) return;
      if (post.posted) {
        this.afterClosedAction(this.postService.updatePost(post));
      } else {
        this.afterClosedAction(this.postService.publishPost(post));
      }
    });
  }

  afterClosedAction(observable: Observable<Post>): void {
    observable.subscribe(post => {
      this.postService.changePost({} as Post);
      this.router.navigate(['@' + post.user.username, 'post', post.slug])
    });
  }

  savePostImage(files: FileList):void {
    if(!files.length) {
      return;
    }

    const file = files[0];
    if(!(/image\/([a-zA-Z]*)/).test(file.type)) {
      this._snackBar.open('사진파일만 가능합니다.', '닫기', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    const formData:FormData = new FormData();
    formData.append('postImage', file);
    if(this.post._id) {
      this.startSavePostImage(this.post, formData);
    } else {
      this.startTempSave(this.post, formData);
    }
  }

  startSavePostImage(post:Post, formData: FormData): void {
    const observable = this.postService.savePostImage(post._id, formData);
    this.composeBody(post, observable);
  }

  startTempSave(post:Post, formData: FormData): void {
    const observable = this.postService.doTempSave(post).pipe(
      tap(tempsave => post = Object.assign(post, tempsave)),
      switchMap(tempsave => this.postService.savePostImage(tempsave._id, formData)),
    );
    this.composeBody(post, observable);
  }

  composeBody(post: Post, observable: Observable<string>): void {
    observable.pipe(
      switchMap(markdownImage => {
        post.body += markdownImage;
        return this.postService.doAutoSave(post);
      }),
      catchError((err) => { throw err })
    )
    .subscribe(
      post => {
        this.postImage.nativeElement.value = null;
        this.postService.changePost(this.mergePost(post));
      },
      err => this.writeNavSnackBar('잠시 후에 시도해주세요.'),
    );
  }

  mergePost(post: Post): Post {
    post.tags = this.post.tags;
    post.open = this.post.open;
    return Object.assign(this.post, post);
  }
  
  writeNavSnackBar(message: string): void {
    this._snackBar.open(message, '닫기', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  cancelConfirm(): void {
    this.location.back();  
  }
}
