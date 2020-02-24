import { Component, OnInit, Input } from '@angular/core';
import { faInstagram, faFacebook, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { User } from 'src/app/app.model';

@Component({
  selector: 'app-user-home-header',
  templateUrl: './user-home-header.component.html',
  styleUrls: ['./user-home-header.component.scss']
})
export class UserHomeHeaderComponent implements OnInit {

  faInstagram: IconDefinition = faInstagram;
  faFacebook: IconDefinition = faFacebook;
  faGithub: IconDefinition = faGithub;
  @Input() user: User;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
