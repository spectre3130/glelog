import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/shared/app.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.css']
})
export class SettingsUsernameComponent implements OnInit {

  @Input() username: string;
  @ViewChild('inputRef', { static: true }) inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private settingsService: SettingsService
  ) { 
  }

  ngOnInit() {
  }

  save(user: User) {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.username = user.username;
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
