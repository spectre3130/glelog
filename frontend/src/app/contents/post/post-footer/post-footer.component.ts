import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-post-footer',
  template: `
  <div class="post-footer">
    <div class="user">
        <a [routerLink]="['', post.user.username | at]">
            <img class="avatar" src="{{ post.user.avatar }}">
        </a>
        <div class="info">
            <a class="username" [routerLink]="['', post.user.username | at]">{{ post.user.username }}</a>
            <p class="description">{{ post.user.description }}</p>
        </div>
    </div>
  </div>`,
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
