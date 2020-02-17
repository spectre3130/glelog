import { Component, OnInit, OnDestroy } from '@angular/core';
import { WriteStore } from './write.store';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, OnDestroy{

  constructor(
    private writeStore: WriteStore
  ) {
  }

  ngOnInit() {
    this.writeStore.changeWriteMode(true);
  }

  ngOnDestroy() {
    this.writeStore.changeWriteMode(false);
  }
}
