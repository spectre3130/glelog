import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { UserHomeComponent } from './contents/user-home/user-home.component';
import { TagsComponent } from './contents/tags/tags.component';
import { SettingComponent } from './contents/setting/setting.component';
import { WriteComponent } from './contents/write/write.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: '1', component: PostComponent },
  { path: 'username', component: UserHomeComponent},
  { path: 'tags', component: TagsComponent},
  { path: 'write', component: WriteComponent},
  { path: 'setting', component: SettingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
