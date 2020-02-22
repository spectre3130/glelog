import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { UserHomeComponent } from './contents/user-home/user-home.component';
import { TagsComponent } from './contents/tags/tags.component';
import { SettingsComponent } from './contents/settings/settings.component';
import { WriteComponent } from './contents/write/write.component';
import { AuthGardService } from './auth/auth-gard.service';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'tag/:tag', component: PostsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'write', canActivate: [ AuthGardService ], component: WriteComponent },
  { path: 'me/settings', canActivate: [ AuthGardService ], component: SettingsComponent },
  { 
    path: 'me/writing', 
    loadChildren: () => import('./contents/my-writing/my-writing.module').then(m => m.MyWritingModule) 
  },
  { 
    path: ':username', component: UserHomeComponent,
    children: [
      { path: 'tag/:tag', component: UserHomeComponent}
    ]
  },
  { path: 'post/:seq', component: PostComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
