import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/app.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.user = this.authService.loadedUser();
  }

}
