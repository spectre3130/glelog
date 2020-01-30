import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-description',
  templateUrl: './settings-description.component.html',
  styleUrls: ['./settings-description.component.css']
})
export class SettingsDescriptionComponent implements OnInit {

  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
