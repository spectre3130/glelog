import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { UserHomeComponent } from './contents/user-home/user-home.component';
import { TagsComponent } from './contents/tags/tags.component';
import { SettingsComponent } from './contents/settings/settings.component';
import { WriteComponent } from './contents/write/write.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'write', component: WriteComponent },
  { path: 'me/settings', component: SettingsComponent },
  { path: ':username', component: UserHomeComponent },
  { path: 'post/:seq', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
