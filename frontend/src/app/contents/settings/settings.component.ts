import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from 'src/app/app.model';
import { AuthService } from 'src/app/shared/auth.service';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faGithub = faGithub;
  user: User;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.user = this.authService.loadedUser();
  }

}
