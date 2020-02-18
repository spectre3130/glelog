import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-social-input',
  templateUrl: './settings-social-input.component.html',
  styleUrls: ['./settings-social-input.component.css']
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
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }

  save(user: User) {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.value = user[this.prop];
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
