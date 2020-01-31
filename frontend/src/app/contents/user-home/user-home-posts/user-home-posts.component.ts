import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Post, User } from 'src/app/shared/app.model';
import { UserHomeService } from '../user-home.service';

@Component({
  selector: 'app-user-home-posts',
  templateUrl: './user-home-posts.component.html',
  styleUrls: ['./user-home-posts.component.css']
})
export class UserHomePostsComponent implements OnInit, OnChanges {

  @Input() username: string;
  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private userHomeService: UserHomeService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log("TCL: UserHomePostsComponent -> ngOnChanges -> changes", changes);
    this.getUserPosts();
  }

  getUserPosts() {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.userHomeService.getUserPosts(this.username, this.page)
      .subscribe(posts => { 
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

}
