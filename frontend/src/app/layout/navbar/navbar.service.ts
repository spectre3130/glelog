import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavbarService {

  writeEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  changeWriteMode(isWriteMode: boolean) {
    this.writeEvent.emit(isWriteMode);
  }
}
