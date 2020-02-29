import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';

@Injectable()
export class SettingsResolverService implements Resolve<User> {

  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.userService.user;
  }
}
