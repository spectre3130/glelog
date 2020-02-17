import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Post } from 'src/app/app.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WriteService } from '../write/write.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  disabled: boolean = false;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  constructor(
    private writeService: WriteService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post,
  ) {}

  ngOnInit() {
  }

  onSubmit(): void {
    if(!this.post.tags.length) {
      this._snackBar.open('태그를 입력해주세요.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.post.posted = true;
    this.dialogRef.close(this.post);
  }

  onNoClick(): void {
    this.post.posted = false;
    this.dialogRef.close(this.post);
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
    this.writeService.saveThumb(this.post._id, formData)
    .subscribe(thumb => this.post.thumb = thumb);
  }

  add(e: MatChipInputEvent): void {
    const input: HTMLInputElement = e.input;
    if(this.post.tags.length === 5) {
      this._snackBar.open('태그는 최대 5개 입니다.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    const value: string = e.value;
    if(this.post.tags.indexOf('#' + value) !== -1) {
      this._snackBar.open('동일한 태그는 입력할 수 없습니다.', '닫기', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    if ((value || '').trim()) {
      this.post.tags.push('#' + value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index: number = this.post.tags.indexOf(tag);
    if (index !== -1) {
      this.post.tags.splice(index, 1);
    }
  }
}
