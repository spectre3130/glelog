import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from 'src/app/shared/service/settings.service';
import { Subject, Subscription } from 'rxjs';
import { map, debounceTime, switchMap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings-username',
  templateUrl: './settings-username.component.html',
  styleUrls: ['./settings-username.component.scss']
})
export class SettingsUsernameComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() username: string;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
  searchTerms: Subject<string> = new Subject<string>();
  searchEvent: Subscription;
  isValid: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void { 
    this.searchEvent = this.searchTerms.pipe(
      debounceTime(300),
      switchMap(username => this.settingsService.checkUsername(username)),
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

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
    this._snackBar.dismiss();
  }

  save(user: User): void {
    this.settingsService.updateUser(user)
    .subscribe((user: User) => {
      this.username = user.username;
      this.inputRef.nativeElement.disabled = true;
      this._snackBar.dismiss();
    });
  }

  cancel(): void {
    this._snackBar.dismiss();
  }

  checkUsername(username: string): void {
    this.isValid = false;
    this.searchTerms.next(username);
  }


}
