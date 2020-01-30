import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Post, User } from 'src/app/shared/app.model';
import { take } from 'rxjs/operators';
import { UserHomeService } from '../user-home.service';

@Component({
  selector: 'app-user-home-posts',
  templateUrl: './user-home-posts.component.html',
  styleUrls: ['./user-home-posts.component.css']
})
export class UserHomePostsComponent implements OnInit, OnChanges {

  @Input() user: User;
  posts: Array<Post> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private userHomeService: UserHomeService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log("TCL: UserHomePostsComponent -> ngOnChanges -> changes", changes)
    if(changes.user.currentValue && !changes.user.firstChange) {
      this.getUserPosts();
    }
  }

  getUserPosts() {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.userHomeService.getUserPosts(this.user.username, this.page)
      .pipe(take(1))
      .subscribe(posts => { 
        this.posts = this.posts.concat(posts);
        this.isLoaded = true;
        this.page++;
      });
    }
  }

}
