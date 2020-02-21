import { Component, OnInit } from '@angular/core';
import { MyWritingService } from '../my-writing.service';
import { Post } from 'src/app/app.model';
import { WriteStore } from '../../write/write.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tempsave',
  templateUrl: './tempsave.component.html',
  styleUrls: ['./tempsave.component.css']
})
export class TempsaveComponent implements OnInit {

  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private myWritingService: MyWritingService,
    private WriteStore: WriteStore,
    private router: Router
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
