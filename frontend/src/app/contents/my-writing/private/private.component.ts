import { Component, OnInit, Output } from '@angular/core';
import { MyWritingService } from '../my-writing.service';
import { Post } from 'src/app/app.model';
import { WriteStore } from '../../write/write.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private myWritingService: MyWritingService,
    private WriteStore: WriteStore,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.myWritingService.getPrivatePosts(this.page)
      .subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

  refresh($event): void {
    this.posts = [];
    this.isLoaded = true;
    this.page = 1;
    this.getPosts();
  }

}
