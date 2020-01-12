import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { TagsComponent } from './contents/tags/tags.component';
import { UserComponent } from './contents/user/user.component';


const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: '1', component: PostComponent },
  { path: 'username', component: UserComponent},
  { path: 'tags', component: TagsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
