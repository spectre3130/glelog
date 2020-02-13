import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { User } from 'src/app/app.model';
import { SettingsService } from '../settings.service';
import { Subject, Subscription } from 'rxjs';
import { map, debounceTime, switchMap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isValid: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }

  ngOnInit() { 
    this.searchEvent = this.searchTerms.pipe(
      debounceTime(300),
      switchMap(username => this.settingsService.checkUsername(username)),
      filter(res => this.value !== res.username)
    ).subscribe(
      res => {
        this.isValid = res.result;
        if(!res.result) this._snackBar.open(res.message, null);
      },
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this.searchEvent.unsubscribe();
  }

  save(user: User): void {
    if(this.isValid) {
      this.settingsService.updateUser(user)
      .subscribe((user: User) => {
        this.value = user[this.prop];
        this.inputRef.nativeElement.disabled = true;
      });
    }
  }

  checkUsername(username: string): void {
    this.isValid = false;
    if(username.match(/[ \{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi)) {
      this._snackBar.open('공백, 특수문자는 불가능합니다.', null);
    } else if(username.length < 2){
      this._snackBar.open('두글자 이상 입력하십시오.', null);
    } else {
      this._snackBar.dismiss();
      this.searchTerms.next(username);
    }
  }


}
