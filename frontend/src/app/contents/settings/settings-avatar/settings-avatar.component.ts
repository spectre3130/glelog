import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/shared/service/user.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-settings-avatar',
  templateUrl: './settings-avatar.component.html',
  styleUrls: ['./settings-avatar.component.scss']
})
export class SettingsAvatarComponent implements OnInit {

  @Input() avatar: string;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onChangeAvatar(files: FileList): void {
    if (!files.length) {
      return;
    }
    
    const file = files[0];
    if(!(/image\/([a-zA-Z]*)/).test(file.type)) {
      this._snackBar.open('사진파일만 가능합니다.', '닫기', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    const formData:FormData = new FormData();
    formData.append('avatar', file);

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
