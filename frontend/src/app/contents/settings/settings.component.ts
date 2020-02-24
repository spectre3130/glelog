import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { User } from 'src/app/app.model';
import { AuthService } from 'src/app/auth/auth.service';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  user: User;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.loadedUser();
  }

}
