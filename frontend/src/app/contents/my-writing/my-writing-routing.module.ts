import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGardService } from 'src/app/auth/auth-gard.service';
import { MyWritingComponent } from './my-writing.component';
import { MyWritingListComponent } from './my-writing-list/my-writing-list.component';
import { MyWritingListResolverService } from './my-writing-list/my-writing-list-resolver.service';

const routes: Routes = [
  {
    path: '', 
    canActivate: [ AuthGardService ], 
    component: MyWritingComponent,
    children: [
        { path: '', redirectTo: 'tempsave', pathMatch: 'full' },
        { 
          path: 'tempsave', 
          component: MyWritingListComponent,
          resolve: { posts: MyWritingListResolverService },
        },
        { 
          path: 'public', 
          component: MyWritingListComponent,
          resolve: { posts: MyWritingListResolverService },
        },
        { 
          path: 'private', 
          component: MyWritingListComponent,
          resolve: { posts: MyWritingListResolverService },
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWritingRoutingModule { }
