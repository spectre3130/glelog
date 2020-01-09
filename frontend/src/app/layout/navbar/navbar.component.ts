import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'glelog-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  faBookOpen = faBookOpen;

  constructor() { }

  ngOnInit() {
  }

}
