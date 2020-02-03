import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Post, Tag } from 'src/app/app.model';
import { UserHomeService } from '../user-home.service';
import { tap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


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
  tagName: string = ''
  isLoaded: boolean = true;

  constructor(
    private route: ActivatedRoute,
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

  onScroll() {
    this.getUserPosts();
  }

  getUserPosts() {
    if(this.isLoaded) {
      this.isLoaded = false;
      this.userHomeService.getUserPosts(this.username, this.page, this.tagName)
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

  getUserPostsByTagName(tagName: string) {
    this.posts = [];
    this.page = 1;
    this.tagName = tagName;
    this.getUserPosts();
  }

}
