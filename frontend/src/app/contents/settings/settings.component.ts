import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/app.model';
import { faInstagram, faFacebook, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  faInstagram: IconDefinition = faInstagram;
  faFacebook: IconDefinition = faFacebook;
  faGithub: IconDefinition = faGithub;

  user: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

}
