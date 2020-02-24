import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post } from 'src/app/app.model';
import { PostsService } from 'src/app/shared/service/posts.service';
import { Observable } from 'rxjs';

@Injectable()
export class MyWritingListResolverService implements Resolve<Post[]> {

  constructor(
    private postsService: PostsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.postsService.getWritingPosts(route.routeConfig.path, 1);
  }
}
