import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGardService } from 'src/app/auth/auth-gard.service';
import { MyWritingComponent } from './my-writing.component';
import { WritingListComponent } from './wrting-list/writing-list.component';
import { WritingListResolverService } from './wrting-list/writing-list-resolver.service';

const routes: Routes = [
  {
    path: '', 
    canActivate: [ AuthGardService ], 
    component: MyWritingComponent,
    children: [
        { path: '', redirectTo: 'tempsave', pathMatch: 'full' },
        { 
          path: 'tempsave', 
          component: WritingListComponent,
          resolve: { posts: WritingListResolverService },
        },
        { 
          path: 'public', 
          component: WritingListComponent,
          resolve: { posts: WritingListResolverService },
        },
        { 
          path: 'private', 
          component: WritingListComponent,
          resolve: { posts: WritingListResolverService },
        },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyWritingRoutingModule { }
