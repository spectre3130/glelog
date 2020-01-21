import { Component, OnInit} from '@angular/core';
import { WriteService } from '../../contents/write/write.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isWriteMode: boolean;

  constructor(
    private writeService: WriteService
  ) {  
    
  }

  ngOnInit() {
    this.writeService.writeEvent
    .subscribe(val => this.isWriteMode = val);
  }

}
