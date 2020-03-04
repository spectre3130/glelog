import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Post } from 'src/app/app.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/shared/service/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  disabled: boolean = false;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  readonly separatorKeysCodes: number[] = [ ENTER ];

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post
  ) { 
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if(this.checkTags()) {
      this.dialogRef.close({
        post: this.post,
        next: true,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({
      post: this.post,
      next: false
    });
  }

  onRadioChange(event): void {
    this.post.open = event.value;
  }

  saveThumb(files: FileList): void {
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
    formData.append('thumb', file);
    this.postService.saveThumb(this.post._id, formData)
      .subscribe(thumb => this.post.thumb = thumb);
  }

  add(event: MatChipInputEvent): void {
    const input: HTMLInputElement = event.input;
    const value: string = event.value;
    if(this.checkValidation(value)) {
      this.post.tags.push('#' + value.trim());
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index: number = this.post.tags.indexOf(tag);
    if (index !== -1) {
      this.post.tags.splice(index, 1);
    }
  }

  checkTags() {
    if(!this.post.tags.length) {
      this.publicshSnackBar('태그를 입력해주세요.');
      return false
    }
    return true;
  }

  checkValidation(value: string): boolean {
    if(this.post.tags.length === 5) {
      this.publicshSnackBar('태그는 최대 5개 입니다.');
      return false
    }
    if(this.post.tags.indexOf('#' + value) !== -1) {
      this.publicshSnackBar('동일한 태그는 입력할 수 없습니다.');
      return false
    }
    if(!(value || '').trim()) {
      return false
    }
    return true;
  }

  publicshSnackBar(message: string): void {
    this._snackBar.open(message, '닫기', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
