import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { User } from 'src/app/app.model';
import { UserHomeService } from 'src/app/shared/service/user-home.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  user: User;
  isNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userHomeService: UserHomeService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1)
    )
    .subscribe(params => {
      this.userHomeService.getUserByUsername(params.username)
      .subscribe(
        (user: User) => this.user = user,
        (err) => this.isNotFound = true
      );
    });
  }
}
