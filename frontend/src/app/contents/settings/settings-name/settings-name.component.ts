import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/app.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.css']
})
export class SettingsNameComponent implements OnInit {

  @Input() name: string;
  @ViewChild('inputRef', { static: false }) inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  save(user: User) {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.name = user.name;
      this.inputRef.nativeElement.disabled = true;
    });
  }
}
