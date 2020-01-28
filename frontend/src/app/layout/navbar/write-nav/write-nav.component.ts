import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { WriteService } from 'src/app/contents/write/write.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { EditorService } from 'src/app/contents/editor/editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

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
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '250px',
        data: { name: '작성하기', message: '포스트를 작성하시겠습니까?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.writeService.createPost();
      });
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
