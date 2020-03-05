import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Tag } from 'src/app/app.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  user: User;
  tags: Tag[];
  isFound: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const { data } = this.route.snapshot.data;
    if(data) {
      this.user = data.user;
      this.tags = data.tags;
    } else {
      this.isFound = false;
    }
  }

  onSelected(tag: string): void {
    if(tag) this.router.navigate(['@' + this.user.username, 'tag', tag.replace('#', '')]);
    else this.router.navigate(['@' + this.user.username]);
  }
}
