import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-avatar',
  templateUrl: './settings-avatar.component.html',
  styleUrls: ['./settings-avatar.component.css']
})
export class SettingsAvatarComponent implements OnInit {

  @Input() avatar: string;
  
  constructor() { }

  ngOnInit() {
  }

}
