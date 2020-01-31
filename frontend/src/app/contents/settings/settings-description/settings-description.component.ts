import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/app.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-description',
  templateUrl: './settings-description.component.html',
  styleUrls: ['./settings-description.component.css']
})
export class SettingsDescriptionComponent implements OnInit {

  @Input() description: string;
  @ViewChild('inputRef', { static: false }) inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  save(user: User) {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.description = user.description;
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
