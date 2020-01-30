import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { User } from '../../../shared/app.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  user: User;
  faUser = faUser;
  faCaretDown = faCaretDown;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.loadedUser();
    this.afterAuth(this.authService.loginEvent);
  }

  logout(): void {
    this.afterAuth(this.authService.logout());
  }

  afterAuth(authEvent: Observable<User>) {
    authEvent.pipe(take(1))
    .subscribe(user => {
      this.user = user;
      this.router.navigate(['']);
    });
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
  } 
}
