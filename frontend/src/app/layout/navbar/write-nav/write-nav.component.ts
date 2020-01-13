import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-write-nav',
  templateUrl: './write-nav.component.html',
  styleUrls: ['./write-nav.component.css']
})
export class WriteNavComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faImage = faImage;

  constructor() { }

  ngOnInit() {
  }

}
