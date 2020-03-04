import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-post-body',
  template: `
  <div class="post-body">
    <markdown ngPreserveWhitespaces [data]="post.body | imageOptimizer: 768 : true"></markdown>
  </div>
  <div class="post-tags">
      <mat-chip-list>
          <a mat-chip *ngFor="let tag of post.tags" [routerLink]="['/tag', tag | removeHash]">
              <span class="tag-name">{{ tag }}</span>
          </a>
      </mat-chip-list>
    </div>`,
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
