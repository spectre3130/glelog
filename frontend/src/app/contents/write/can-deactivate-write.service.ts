import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { WriteComponent } from './write.component';
import { Observable } from 'rxjs';

@Injectable()
export class CanDeactivateWriteService implements CanDeactivate<WriteComponent> {

  canDeactivate(
    component: WriteComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      // return true;
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}