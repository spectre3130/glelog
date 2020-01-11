import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';


const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: '1', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
