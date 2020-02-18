import { Component, OnInit, Input } from '@angular/core';
import { PopularPost } from 'src/app/app.model';

@Component({
  selector: 'app-popular-preview',
  templateUrl: './popular-preview.component.html',
  styleUrls: ['./popular-preview.component.css']
})
export class PopularPreviewComponent implements OnInit {

  @Input() posts: Array<PopularPost>;

  constructor() { }

  ngOnInit(): void {
  }

}
