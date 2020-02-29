import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings-avatar',
  templateUrl: './settings-avatar.component.html',
  styleUrls: ['./settings-avatar.component.scss']
})
export class SettingsAvatarComponent implements OnInit {

  @Input() avatar: string;
  
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onChangeAvatar(files: FileList):void {
    if(!files.length) {
      return;
    }

    const formData:FormData = new FormData();
    formData.append('avatar', files[0]);

    this.userService.updateAvatar(formData).pipe(
      catchError((err) => { throw err })
    )
    .subscribe(
      (user) => this.userService.next(user), 
      (err) => {
        this._snackBar.open('업로드 실패! 잠시 후에 시도해주세요.', '닫기', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    );
  }
}
