import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/app.model';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-header',
  template: `
  <div class="post-header">
    <span *ngIf="!post.open" class="private">비공개</span>
    <h1 class="title">
        {{ post.title }}
    </h1>
    <div class="user">
        <a [routerLink]="['', post.user.username | at]">
            <img class="avatar" src="{{ post.user.avatar | imageOptimizer: 140 }}">
        </a>
        <div class="info">
            <a [routerLink]="['', post.user.username | at]" class="username">{{ post.user.username }}</a>
            <div class="created">{{ post.created_at | postDate }}</div>
        </div>
        <div class="spacer"></div>
        <div class="sns">
            <a *ngIf="post.user.instagram" href="https://www.instagram.com/{{ post.user.instagram }}">
                <fa-icon [icon]="faInstagram" size="lg"></fa-icon>
            </a>
            <a *ngIf="post.user.facebook" href="https://www.facebook.com/{{ post.user.facebook }}">
                <fa-icon [icon]="faFacebook" size="lg"></fa-icon>
            </a>
            <a *ngIf="post.user.github" href="https://www.github.com/{{ post.user.github }}">
                <fa-icon [icon]="faGithub" size="lg"></fa-icon>
            </a>
        </div>
    </div>
  </div>`,
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {

  faInstagram: IconDefinition = faInstagram;
  faFacebook: IconDefinition = faFacebook;
  faGithub: IconDefinition = faGithub;
  faLock: IconDefinition = faLock;

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
