import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Post, Tag } from 'src/app/app.model';
import { UserHomeService } from '../user-home.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-home-posts',
  templateUrl: './user-home-posts.component.html',
  styleUrls: ['./user-home-posts.component.css']
})
export class UserHomePostsComponent implements OnInit, OnChanges {

  @Input() username: string;
  posts: Array<Post> = [];
  tags: Array<Tag> = [];
  page: number = 1;
  isLoaded: boolean = true;

  constructor(
    private userHomeService: UserHomeService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if(changes.username) {
      this.getUserPosts();
      this.getUserTags();
    }
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

  getUserTags() {
    this.userHomeService.getUserTags(this.username)
    .pipe(tap((tags: Array<Tag>) => tags.unshift({ name: '전체보기', value: '' })))
    .subscribe((tags: Array<Tag>) => this.tags = tags);
  }

}
