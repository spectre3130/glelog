import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from 'src/app/contents/login/login.component';
import { User } from '../../../app.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/contents/settings/settings.service';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {

  user: User;
  avatar: string;
  faUser = faUser;
  faCaretDown = faCaretDown;
  changedUserEvent: Subscription;
  changeAvatarEvent: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.changedUser();
    this.user = this.authService.loadedUser();
    this.avatar = this.user.avatar;
    if(!this.user) {
      this.login();
    }
    this.changeAvatarEvent = this.settingsService.changeAvatarEvent
    .subscribe(() => this.avatar = '');
  }

  ngOnDestroy() {
    this.changedUserEvent.unsubscribe();
    this.changeAvatarEvent.unsubscribe();
  }

  login(): void {
    this.authService.loginEvent
    .pipe(take(1))
    .subscribe((user:User) => {
      this.user = user;
      this.router.navigate(['']);
    });
  }

  logout(): void {
    this.authService.logout()
    .subscribe((user:User) => {
      this.user = user; 
      window.location.replace(environment.root);
    });
  }

  changedUser(): void {
    this.changedUserEvent = this.authService.changedUserEvent
    .subscribe((user:User) => {
      this.user = user
      // this.avatar = '';
      this.avatar = user.avatar;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
  } 
}
