import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from 'src/app/contents/login/login.component';
import { User, NavigationNode } from '../../../app.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit, OnDestroy {

  faUser: IconDefinition = faUser;
  faCaretDown: IconDefinition = faCaretDown;

  user: User;
  avatar: string;
  changedUserEvent: Subscription;
  changeAvatarEvent: Subscription;
  currentUser: Subscription;
  
  homeNodes: NavigationNode[] = [
    { name: '내 블로그', action: 'home', icon: 'home'},
  ];

  writeNodes: NavigationNode[] = [
    { name: '글쓰기', action: 'write', icon: 'post_add', link: ['/write'] },
    { name: '내 글 모음', action: 'my-writing', icon: 'list', link: ['/me/writing'] },
  ];

  userNodes: NavigationNode[] = [
    { name: '설정', action: 'settings', icon: 'settings', link: ['/me/settings'] },
    { name: '로그아웃', action: 'logout', icon: 'exit_to_app' },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser
    .subscribe( user => this.user = user)
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
  }

  navigate(action: string, link: string[]) {
    switch(action) {
      case 'home': this.router.navigate(['/', '@' + this.user.username]); break;
      case 'logout': this.logout(); break;
      default: this.router.navigate(link); break;
    }
  }

  logout(): void {
    this.authService.logout()
  }

  changedUser(): void {
    this.changedUserEvent = this.authService.changedUserEvent
    .subscribe((user:User) => {
      this.user = user;
      this.avatar = user.avatar;
    });
  }

  openLoginDialog(): void {
    const loginDialog = this.dialog.open(LoginComponent, {
      width: '400px',
      autoFocus: false,
    });
  } 
}
