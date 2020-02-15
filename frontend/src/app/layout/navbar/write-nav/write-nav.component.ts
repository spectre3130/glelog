import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { WriteService } from 'src/app/contents/write/write.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { EditorService } from 'src/app/contents/editor/editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { Post } from 'src/app/app.model';
import { Router } from '@angular/router';
import { PublishComponent } from 'src/app/contents/publish/publish.component';

@Component({
  selector: 'app-write-nav',
  templateUrl: './write-nav.component.html',
  styleUrls: ['./write-nav.component.css']
})
export class WriteNavComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faImage = faImage;
  faSave = faSave;

  constructor(
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private editorService: EditorService,
    private writeService: WriteService,
  ) { }

  ngOnInit() {
  }

  writeConfirm(): void {
    if(this.checkValidation()) {
      const post = this.editorService.getPost();
      if(post._id) {
        this.openPublishPage(post);
      } else {
        this.writeService.doTempSave(post)
        .subscribe(tempsave => {
          this.editorService.setPost(tempsave);
          this.openPublishPage(tempsave);
        });
      }
    }
  }

  checkValidation(): boolean {
    const post = this.editorService.getPost();
    if(!post.title) {
      this._snackBar.open('제목을 입력해주세요.', '닫기',{
        duration: 5000
      });
      return false;
    } else if(!post.tags || !post.tags.length) {
      this._snackBar.open('태그를 입력해주세요.', '닫기', {
        duration: 5000
      });
      return false;
    } else if(!post.body) {
      this._snackBar.open('본문을 입력해주세요.', '닫기', {
        duration: 5000
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
    const post = this.editorService.getPost();
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
      post => this.editorService.setPost(post),
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
      post => this.editorService.setPost(post),
      err => this._snackBar.open(err, '닫기', {
        duration: 5000,
      })
    );
  }

  openPublishPage(post: Post): void {
    const dialogRef = this.dialog.open(PublishComponent, {
      width: '250px',
      data: post
    });

    dialogRef.afterClosed().subscribe(publishPost => {
      if(publishPost) {
        this.writeService.publishPost(publishPost)
        .subscribe(post => {
          this.router.navigate(['post', post.seq]);
        });
      }
    });
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
