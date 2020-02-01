import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from 'src/app/contents/login/login.component';
import { User } from '../../../app.model';
import { AuthService } from 'src/app/shared/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {

  user: User;
  faUser = faUser;
  faCaretDown = faCaretDown;
  changedUserEvent: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.changedUser();
    this.user = this.authService.loadedUser();
    if(!this.user) {
      this.login();
    }
  }

  ngOnDestroy() {
    this.changedUserEvent.unsubscribe();
  }

  login(): void {
    this.authService.loginEvent
    .pipe(take(1))
    .subscribe((user:User) => this.afterAuthentication(user));
  }

  logout(): void {
    this.authService.logout()
    .subscribe((user:User) => this.afterAuthentication(user));
  }

  afterAuthentication(user: User) {
    this.user = user;
    this.router.navigate(['']);
  }

  changedUser(): void {
    this.changedUserEvent = this.authService.changedUserEvent
    .subscribe((user:User) => this.user = user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
  } 
}
