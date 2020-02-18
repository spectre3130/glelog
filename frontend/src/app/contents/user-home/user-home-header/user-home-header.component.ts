import { Component, OnInit, Input } from '@angular/core';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { User } from 'src/app/app.model';

@Component({
  selector: 'app-user-home-header',
  templateUrl: './user-home-header.component.html',
  styleUrls: ['./user-home-header.component.css']
})
export class UserHomeHeaderComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  @Input() user: User;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
