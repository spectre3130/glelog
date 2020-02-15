import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  disabled: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post
  ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
