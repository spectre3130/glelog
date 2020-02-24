import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from 'src/app/app.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  post: Post;
  isNotFound: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ post }) => this.post = post,
      err => this.isNotFound = true
    )
  }


}
