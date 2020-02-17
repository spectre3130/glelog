import { Component, OnInit} from '@angular/core';
import { WriteStore } from 'src/app/contents/write/write.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isWriteMode: boolean;

  constructor(
    private writeStore: WriteStore
  ) {  
    
  }

  ngOnInit() {
    this.writeStore.writeEvent
    .subscribe(val => this.isWriteMode = val);
  }

}
