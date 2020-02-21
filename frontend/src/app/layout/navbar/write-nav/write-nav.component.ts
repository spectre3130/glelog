import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { WriteService } from 'src/app/contents/write/write.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Post } from 'src/app/app.model';
import { PublishComponent } from 'src/app/contents/publish/publish.component';
import { WriteStore } from 'src/app/contents/write/write.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-nav',
  templateUrl: './write-nav.component.html',
  styleUrls: ['./write-nav.component.css']
})
export class WriteNavComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faImage = faImage;
  faSave = faSave;
  disabled = false;

  constructor(
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private writeService: WriteService,
    private writeStore: WriteStore,
  ) { }

  ngOnInit() {
  }

  writeConfirm(): void {
    if(this.checkValidation()) {
      const post = this.writeStore.getPost();
      if(post._id) {
        this.writeService.updatePost(post)
        .subscribe(post => {
          this.openPublishPage(post);
        });
      } else {
        this.writeService.doTempSave(post)
        .subscribe(tempsave => {
          this.openPublishPage(tempsave);
        });
      }
    }
  }

  checkValidation(): boolean {
    const post = this.writeStore.getPost();
    if(!post.title) {
      this._snackBar.open('제목을 입력해주세요.', '닫기',{
        duration: 5000,
        verticalPosition: 'top'
      });
      return false;
    } else if(!post.body) {
      this._snackBar.open('본문을 입력해주세요.', '닫기', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return false;
    } 
    return true;
  }

  savePostImage(files: FileList):void {
    if(!files.length) {
      return;
    }
    const formData:FormData = new FormData();
    const post = this.writeStore.getPost();
    formData.append('postImage', files[0]);
    if(post._id) {
      this.startSavePostImage(post, formData);
    } else {
      this.startTempSave(post, formData);
    }
  }

  startSavePostImage(post:Post, formData: FormData): void {
    this.writeService.savePostImage(post._id, formData)
    .pipe(
      tap(markdownImage => post.body += markdownImage),
      switchMap(markdownImage => this.writeService.updatePost(post)),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => this.writeStore.setPost(post),
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }

  startTempSave(post:Post, formData: FormData): void {
    this.writeService.doTempSave(post)
    .pipe(
      tap(tempsave => {
        post._id = tempsave._id;
        post.title = tempsave.title;
        post.body = tempsave.body;
      }),
      switchMap(tempsave => this.writeService.savePostImage(tempsave._id, formData)),
      tap(markdownImage => post.body += markdownImage),
      switchMap(markdownImage => this.writeService.updatePost(post)),
      catchError(err => { throw '잠시 후에 시도해주세요.' })
    )
    .subscribe(
      post => this.writeStore.setPost(post),
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }

  openPublishPage(post: Post): void {

    this.disabled = true;
    this.writeStore.setPost(post);
    
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '800px',
      height: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.disabled = false;
      this.writeStore.setPost(result.post);
      if(result.next) {
        this.nextStep(post);
      }
    });
  }

  nextStep(post: Post): void {
    if(post.posted) {
      this.writeService.updatePost(post)
      .subscribe(post => {
        this.router.navigate(['post', post.seq]);
      });
    } else {
      this.writeService.publishPost(post)
      .subscribe(post => {
        this.router.navigate(['post', post.seq]);
      });
    }
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
