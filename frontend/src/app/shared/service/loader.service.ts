import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class LoaderService {

  fetchEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  requests: any = [];

  constructor() { }

  emit(event: HttpRequest<unknown> | HttpResponse<unknown> | boolean) {
    if(event instanceof HttpRequest) {
      this.requests.push(event);
      if(this.requests.length === 1) {
        this.fetchEvent.emit(true);
      }
    } else if(event instanceof HttpResponse || !event) {
      this.requests.pop();
      if(!this.requests.length || !event) {
        this.fetchEvent.emit(false);
      }
    }
  }
}
