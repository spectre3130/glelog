import { Component, OnInit } from '@angular/core';
import { UserHomeService } from './user-home.service';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { User } from 'src/app/app.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  user: User;

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
      .subscribe((user: User) => this.user = user);
    });
  }
}
