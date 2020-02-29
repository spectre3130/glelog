import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-write-preview',
  templateUrl: './write-preview.component.html',
  styleUrls: ['./write-preview.component.scss']
})
export class WritePreviewComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
