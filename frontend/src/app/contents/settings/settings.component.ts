import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/app.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.getUser()
    .pipe(take(1))
    .subscribe((user: User) => this.user = user);
  }

}
