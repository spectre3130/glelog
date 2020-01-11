import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faBookOpen = faBookOpen;
  faGithub = faGithub;

  constructor() { }

  ngOnInit() {
  }

}
