import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';
import { TagsService } from 'src/app/shared/service/tags.service';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserHomeResolverService implements Resolve<any>{

  constructor(
    private userService: UserService,
    private tagsService: TagsService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    const username = route.params.username;
    if(username.indexOf('@') === -1) {
      return of(false);
    }
    return forkJoin(
      this.userService.getUserByUsername(username),
      this.tagsService.getUserTags(username)
    ).pipe(
      map(([user, tags]) => {
        return { user, tags };
      }),
      catchError((err) => of(false)) 
    )
  }
}
