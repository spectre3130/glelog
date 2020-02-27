import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/app.model';
import { faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() post: Post;
  faLock: IconDefinition = faLock;

  constructor() { }

  ngOnInit(): void {
  
  }

}
