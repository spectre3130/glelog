import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { PostResolverService } from './post-resolver.service';


const routes: Routes = [
  { 
    path: '', component: PostComponent,
    resolve: { post: PostResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
