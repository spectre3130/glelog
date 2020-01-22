import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { PostService } from './post.service';
import { Post } from 'src/app/shared/app.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  post: Post;

  constructor(
    private postService: PostService
  ) { 
    
  }

  ngOnInit() {
    // this.http.get('assets/markdown2.text', {responseType: 'text' })
    // .subscribe(content => {
    //   this.markdown = content;
    // });
    this.postService.getPost(1)
    .pipe(take(1))
    .subscribe(post => {
    console.log("TCL: PostComponent -> ngOnInit -> post", post)
      this.post = post
    });
  
  }


}
