import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/app.model';
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/layout/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-my-writing-preview',
  templateUrl: './my-writing-preview.component.html',
  styleUrls: ['./my-writing-preview.component.scss']
})
export class MyWritingPreviewComponent implements OnInit {

  faCaretDown: IconDefinition = faCaretDown;
  @Input() post: Post;
  @Output() delete = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onEdit(post: Post): void {
    this.router.navigate(['write', post._id]);
  }

  onDelete(post: Post): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { name: '삭제', message: '해당글을 삭제하시겠습니까?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.postService.deletePost(post)
          .subscribe(() => this.delete.emit());
      }
    });
  }

}
