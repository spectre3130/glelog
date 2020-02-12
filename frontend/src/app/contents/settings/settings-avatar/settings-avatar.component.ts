import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { User } from 'src/app/app.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-settings-avatar',
  templateUrl: './settings-avatar.component.html',
  styleUrls: ['./settings-avatar.component.css']
})
export class SettingsAvatarComponent implements OnInit {

  @Input() avatar: string;
  
  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  onChangeAvatar(files: FileList):void {
    if(!files) {
      return;
    }
    const formData:FormData = new FormData();
    const user:User = this.authService.loadedUser();
    formData.append('avatar', files[0]);
    this.avatar = '';
    this.settingsService.updateAvatar(user.username, formData)
    .subscribe((user: User) => {
      this.avatar = user.avatar;
    });
  }
}
