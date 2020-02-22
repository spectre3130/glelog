import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { WriteStore } from 'src/app/shared/service/write.store';
import { WriteService } from 'src/app/shared/service/write.service';
import { ConfirmComponent } from 'src/app/layout/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-writing-preview',
  templateUrl: './writing-preview.component.html',
  styleUrls: ['./writing-preview.component.scss']
})
export class WritingPreviewComponent implements OnInit {

  faCaretDown = faCaretDown;
  @Input() post: Post;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private writeService: WriteService,
    private writeStore: WriteStore,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  edit(post: Post): void {
    this.writeStore.setPost(post);
    this.router.navigate(['write']);
  }

  delete(post: Post): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { name: '삭제', message: '해당글을 삭제하시겠습니까?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.writeService.deletePost(post)
        .subscribe(() => {
          this.onDelete.emit(post._id);
        });
      }
    });
  }

}
