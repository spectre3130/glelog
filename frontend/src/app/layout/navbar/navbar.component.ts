import { Component, OnInit, Input } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/contents/user/use.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user: User;
  faBookOpen = faBookOpen;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.authService.loginState.subscribe(user => {
      this.user = user;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(data => {
     
    });
  }

}
