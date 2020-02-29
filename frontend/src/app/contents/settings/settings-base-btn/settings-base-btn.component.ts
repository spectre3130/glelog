import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/app.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings-base-btn',
  templateUrl: './settings-base-btn.component.html',
  styleUrls: ['./settings-base-btn.component.scss']
})
export class SettingsBaseBtnComponent implements OnInit {

  @Input() inputRef: HTMLInputElement;
  @Input() prop: string;
  @Input() isValid: boolean = true;
  @Output() save: EventEmitter<User> = new EventEmitter<User>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  cache: string;
  editMode: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onEdit(): void {
    if(this.prop === 'username') this.isValid = false;
    this.inputRef.disabled = false;
    this.cache = this.inputRef.value;
    this.editMode = true;

    const defaultLen = this.cache.length;
    this.inputRef.selectionStart = defaultLen;
    this.inputRef.selectionEnd = defaultLen;
    this.inputRef.focus();
  }

  onSave(): void {
    const user: User = this.userService.user;
    user[this.prop] = this.inputRef.value;
    this.editMode = false;
    this.save.emit(user);
  }

  onCancel(): void {
    this.inputRef.disabled = true;
    this.inputRef.value = this.cache;
    this.editMode = false;
    this.cancel.emit();
  }

}
