import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  markdown: string;

  constructor(private http:HttpClient) { 
    
  }

  ngOnInit() {
    this.http.get('assets/markdown.text', {responseType: 'text' })
              .subscribe(content => {
                this.markdown = content;
                console.log(this.markdown);
              });
  }


}
