import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  markdown: string;

  constructor(private http:HttpClient) { 
  }

  ngOnInit() {
    this.http.get('assets/markdown2.text', {responseType: 'text' })
              .subscribe(content => {
                this.markdown = content;
                console.log(this.markdown);
              });
  }


}
