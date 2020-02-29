import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings-social-input',
  templateUrl: './settings-social-input.component.html',
  styleUrls: ['./settings-social-input.component.scss']
})
export class SettingsSocialInputComponent implements OnInit {

  @Input() icon;
  @Input() background: string
  @Input() prepend: string;
  @Input() value: string;
  @Input() prop: string;
  @Input() color: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSave(user: User) {
    this.userService.updateUser(user)
    .subscribe((user: User) => {
      this.userService.next(user);
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
