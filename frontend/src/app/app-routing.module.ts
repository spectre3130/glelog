import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { TagsComponent } from './contents/tags/tags.component';
import { SettingsComponent } from './contents/settings/settings.component';
import { AuthGardService } from './auth/auth-gard.service';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PostResolverService } from './contents/post/post-resolver.service';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { 
    path: ':username/post/:slug', component: PostComponent,
    resolve: { post: PostResolverService }
  },
  { path: 'tag/:tag', component: PostsComponent },
  { path: 'search/:search', component: PostsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'me/settings', canActivate: [ AuthGardService ], component: SettingsComponent },
  { 
    path: 'write', 
    loadChildren: () => import('./contents/write/write.module').then(m => m.WriteModule)
  },
  { 
    path: 'me/writing', 
    loadChildren: () => import('./contents/my-writing/my-writing.module').then(m => m.MyWritingModule) 
  },
  { 
    path: ':username',
    loadChildren: () => import('./contents/user-home/user-home.module').then(m => m.UserHomeModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
