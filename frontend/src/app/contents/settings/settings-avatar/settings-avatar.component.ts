import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { User } from 'src/app/app.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-settings-avatar',
  templateUrl: './settings-avatar.component.html',
  styleUrls: ['./settings-avatar.component.css']
})
export class SettingsAvatarComponent implements OnInit {

  @Input() avatar: string;
  cache: string;
  
  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  onChangeAvatar(files: FileList):void {
    if(!files.length) {
      return;
    }
    const formData:FormData = new FormData();
    formData.append('avatar', files[0]);
    this.cache = this.avatar;
    this.avatar = '';
    this.settingsService.emitAvatarEvent(this.avatar);
    this.settingsService.updateAvatar(formData)
    .pipe(
      catchError(err => { throw '업로드 실패! 잠시 후에 시도해주세요.' })
    )
    .subscribe(
      (user: User) => this.avatar = user.avatar, 
      err => {
        this._snackBar.open(err, '닫기', {
          duration: 5000,
          verticalPosition: 'top'
        });
        this.avatar = this.cache;
        this.settingsService.emitAvatarEvent(this.avatar);
      });
  }
}
