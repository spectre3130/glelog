import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/app.model';
import { WriteStore } from 'src/app/shared/service/write.store';
import { MyWritingService } from 'src/app/shared/service/my-writing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

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
      this.myWritingService.getPublicPosts(this.page)
      .subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

  refresh($event): void {
  console.log("TCL: PublicComponent -> event", $event)
      this.posts = [];
      this.isLoaded = true;
      this.page = 1;
      this.getPosts();
    }
}
