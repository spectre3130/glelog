import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.css']
})
export class SettingsNameComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
