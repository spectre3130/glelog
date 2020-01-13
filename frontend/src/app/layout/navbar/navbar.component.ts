import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isWriteMode: boolean;

  constructor(
    private navbarService: NavbarService
  ) {  
    
  }

  ngOnInit() {
    this.navbarService.writeEvent
    .subscribe(val => this.isWriteMode = val);
  }

}
