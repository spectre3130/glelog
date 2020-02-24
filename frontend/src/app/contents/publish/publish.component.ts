import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Post } from 'src/app/app.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/shared/service/post.service';

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
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(!this.post.tags.length) {
      this._snackBar.open('태그를 입력해주세요.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.dialogRef.close({
      post: this.post,
      next: true,
    });
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
    const formData:FormData = new FormData();
    formData.append('thumb', files[0]);
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

  checkValidation(value: string): boolean {
    if(this.post.tags.length === 5) {
      this._snackBar.open('태그는 최대 5개 입니다.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return false
    }
    if(this.post.tags.indexOf('#' + value) !== -1) {
      this._snackBar.open('동일한 태그는 입력할 수 없습니다.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return false
    }
    if(!(value || '').trim()) {
      return false
    }
    return true;
  }
}
