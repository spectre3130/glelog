import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/app.model';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-base-btn',
  templateUrl: './settings-base-btn.component.html',
  styleUrls: ['./settings-base-btn.component.css']
})
export class SettingsBaseBtnComponent implements OnInit, OnDestroy {

  @Input() inputRef: HTMLInputElement;
  @Input() prop: string;
  @Output() onSave: EventEmitter<User> = new EventEmitter<User>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  cache: string;
  editMode: boolean = false;
  @Input() isValid: boolean = true;
  afterChangeEvent: Subscription;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.afterChangeEvent) {
      this.afterChangeEvent.unsubscribe();
    }
  }

  edit(): void {
    this.inputRef.disabled = false;
    this.inputRef.focus();
    this.cache = this.inputRef.value;
    this.editMode = true;
  }

  save(): void {
    const user = this.authService.loadedUser();
    user[this.prop] = this.inputRef.value;
    this.onSave.emit(user);
    this.afterChangeEvent = this.settingsService.changeUserEvent.subscribe(() => this.editMode = false);
  }

  cancel(): void {
    this.inputRef.disabled = true;
    this.inputRef.value = this.cache;
    this.editMode = false;
    this.onCancel.emit();
  }

}
