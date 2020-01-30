import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.css']
})
export class SettingsUsernameComponent implements OnInit {

  @Input() username: string;

  constructor() { }

  ngOnInit() {
  }

}
