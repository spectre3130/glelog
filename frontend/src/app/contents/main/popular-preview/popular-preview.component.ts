import { Component, OnInit, Input } from '@angular/core';
import { PopularPost } from 'src/app/app.model';

@Component({
  selector: 'app-popular-preview',
  templateUrl: './popular-preview.component.html',
  styleUrls: ['./popular-preview.component.scss']
})
export class PopularPreviewComponent implements OnInit {

  @Input() post: PopularPost;
  @Input() rank: number;
   
  constructor() { }

  ngOnInit(): void {
  }

}
