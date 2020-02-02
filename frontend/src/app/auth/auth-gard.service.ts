import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGardService {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.loadedUser();
    if(user) {
      return true;
    }
    window.location.replace(environment.root);
    return false;
  }
}
