import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Post } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/service/post.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class WriteResolverService implements Resolve<Post> {

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.postService.getPost(route.params.id)
      .pipe(
        catchError((err) => this.router.navigate(['write']))
      )
  }
}
