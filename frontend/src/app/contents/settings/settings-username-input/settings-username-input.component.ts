import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { User } from 'src/app/app.model';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-settings-username-input',
  templateUrl: './settings-username-input.component.html',
  styleUrls: ['./settings-username-input.component.scss']
})
export class SettingsUsernameInputComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() value: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
  searchTerms = new Subject<string>();
  searchEvent: Subscription;
  isValid: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void { 
    this.searchEvent = this.searchTerms.pipe(
      debounceTime(700),
      switchMap(username => this.userService.checkUsername(username)),
    ).subscribe(
      res => {
        this.isValid = res.result;
        if(res.result || !res.message) this._snackBar.dismiss();
        if(res.message) this._snackBar.open(res.message, null, {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      err => this._snackBar.dismiss()
    );
  }
  
  checkUsername(username: string): void {
    this.isValid = false;
    this.searchTerms.next(username);
  }

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
    this._snackBar.dismiss();
  }

  onSave(user: User): void {
    this.userService.updateUser(user)
    .subscribe((user: User) => {
      this.userService.next(user);
      this.inputRef.nativeElement.disabled = true;
      this._snackBar.dismiss();
    });
  }

  onCancel(): void {
    this._snackBar.dismiss();
  }
}
