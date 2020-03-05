import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Post } from 'src/app/app.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {

  post: Post;
  isFound: boolean = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const { post } = this.route.snapshot.data;
    if(post) this.post = post;
    else this.isFound = false;
  }
}
