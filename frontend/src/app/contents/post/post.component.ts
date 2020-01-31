import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { PostService } from './post.service';
import { Post } from 'src/app/shared/app.model';
import { ActivatedRoute } from '@angular/router';

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
    private postService: PostService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.getPost(params.seq)
      .subscribe(post => {
        this.post = post
      });
    });
  }


}
