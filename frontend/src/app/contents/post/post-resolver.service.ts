import { Injectable } from '@angular/core';
import { Post } from 'src/app/app.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostResolverService implements Resolve<Post> {

  constructor(
    private postService: PostService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.postService.getPostByUsernameAndSlug(route.params.slug);
  }
}
