import { Component, OnInit} from '@angular/core';
import { WriteStore } from 'src/app/shared/service/write.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isWriteMode: boolean;

  constructor(
    private writeStore: WriteStore
  ) {  
    
  }

  ngOnInit(): void {
    this.writeStore.writeEvent
     .subscribe(isWriteMode => this.isWriteMode = isWriteMode);
  }

}
