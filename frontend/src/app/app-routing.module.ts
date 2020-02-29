import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { TagsComponent } from './contents/tags/tags.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PostResolverService } from './contents/post/post-resolver.service';
import { MainComponent } from './contents/main/main.component';
import { PostsComponent } from './contents/main/posts/posts.component';

const routes: Routes = [
  { 
    path: '', component: MainComponent,
    children: [
      { path: '', component: PostsComponent },
      { path: 'tag/:tag', component: PostsComponent },
      { path: 'search/:search', component: PostsComponent },
    ]
  },
  { 
    path: ':username/post/:slug',
    loadChildren: () => import('./contents/post/post.module').then(m => m.PostModule)
  },
  { path: 'tags', component: TagsComponent },
  { 
    path: 'me/settings',
    loadChildren: () => import('./contents/settings/settings.module').then(m => m.SettingsModule)
  },
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
      scrollOffset: [0, 64],
      relativeLinkResolution: 'corrected',
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
