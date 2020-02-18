import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-input',
  templateUrl: './settings-input.component.html',
  styleUrls: ['./settings-input.component.css']
})
export class SettingsInputComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;
  @Input() prop: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }

  save(user: User): void {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.value = user[this.prop];
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
