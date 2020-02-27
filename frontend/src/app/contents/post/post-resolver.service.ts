import { Injectable } from '@angular/core';
import { Post } from 'src/app/app.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PostResolverService implements Resolve<Post> {

  constructor(
    private postService: PostService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    const { username, slug } = route.params;
    if(username.indexOf('@') === -1) {
      return of(false);
    }
    return this.postService.getPostByUsernameAndSlug(username, slug)
      .pipe(catchError(err => of(false)));
  }
}
