import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from '../settings.service';
import { fromEvent, of, Subject, Subscription } from 'rxjs';
import { map, debounceTime, switchMap, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.css']
})
export class SettingsUsernameComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() value: string;
  @Input() prop: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
  searchTerms: Subject<string> = new Subject<string>();
  searchEvent: Subscription;
  message: string = '';
  isValid: boolean;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() { 
    this.searchEvent = this.searchTerms.pipe(
      tap(username => {
        if(this.value === username) this.isValid = true
      }),
      filter(username => username.length > 2 && this.value !== username),
      map(username => username.replace(/^\s+|\s+$/gm,'')),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(username => this.settingsService.checkUsername(username)),
      tap(res => this.isValid = res.result),
    ).subscribe(res => {
      if(res.result) this.message = '';
      else this.message = res.message;
    });
  }

  ngOnDestroy() {
    this.searchEvent.unsubscribe();
  }

  save(user: User): void {
    if(this.checkValid()) {
      this.settingsService.updateUser(user)
      .subscribe((user: User) => {
        this.value = user[this.prop];
        this.inputRef.nativeElement.disabled = true;
      });
    }
  }

  cancel() {
    this.message = '';
  }

  checkUsername(username: string): void {
    this.searchTerms.next(username);
  }

  checkValid() {
    if(this.isValid) {
      return true;
    } else {
      return false;
    }
  }

}
