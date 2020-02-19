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
import { MyWritingComponent } from './contents/my-writing/my-writing.component';
import { TempsaveComponent } from './contents/my-writing/tempsave/tempsave.component';
import { PublicComponent } from './contents/my-writing/public/public.component';
import { PrivateComponent } from './contents/my-writing/private/private.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'tag/:tag', component: PostsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'write', canActivate: [ AuthGardService ], component: WriteComponent },
  { path: 'me/settings', canActivate: [ AuthGardService ], component: SettingsComponent },
  {
    path: 'me/writing', canActivate: [AuthGardService], component: MyWritingComponent,
    children: [
      { path: '', redirectTo: 'tempsave', pathMatch: 'full' },
      { path: 'tempsave', component: TempsaveComponent },
      { path: 'public', component: PublicComponent },
      { path: 'private', component: PrivateComponent },
    ]
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
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
