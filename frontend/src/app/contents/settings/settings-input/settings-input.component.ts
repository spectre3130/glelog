import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/app.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings-input',
  templateUrl: './settings-input.component.html',
  styleUrls: ['./settings-input.component.scss']
})
export class SettingsInputComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;
  @Input() prop: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSave(user: User): void {
    this.userService.updateUser(user).subscribe((user: User) => {
      this.userService.next(user);
      this.inputRef.nativeElement.disabled = true;
    });
  }

}
