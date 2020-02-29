import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private fetchSubject = new BehaviorSubject(false);
  isFetching = this.fetchSubject.asObservable();

  constructor() { }

  emit(emit: boolean) {
    this.fetchSubject.next(emit);
  }

  get fetch(): boolean {
    return this.fetchSubject.value;
  }
}
