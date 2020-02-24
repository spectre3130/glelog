import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './user-home.component';
import { UserHomePostsComponent } from './user-home-posts/user-home-posts.component';
import { UserHomeResolverService } from './user-home-resolver.service';


const routes: Routes = [
  {
    path: '', component: UserHomeComponent,
    resolve: { data: UserHomeResolverService },
    children: [
      { path: '', component: UserHomePostsComponent },
      { path: 'tag/:tag', component: UserHomePostsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomeRoutingModule { }
