import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/app.model';
import { WriteStore } from 'src/app/shared/service/write.store';
import { MyWritingService } from 'src/app/shared/service/my-writing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tempsave',
  templateUrl: './tempsave.component.html',
  styleUrls: ['./tempsave.component.scss']
})
export class TempsaveComponent implements OnInit {

  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private myWritingService: MyWritingService,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.myWritingService.getTempsavePosts(this.page)
      .subscribe(posts => {
        this.isLoaded = true;
        this.posts = this.posts.concat(posts);
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
