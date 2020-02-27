import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGardService } from 'src/app/auth/auth-gard.service';
import { WriteComponent } from './write.component';
import { WriteResolverService } from './write-resolver.service';
import { CanDeactivateWriteService } from './can-deactivate-write.service';

const routes: Routes = [
  {
    path: '', 
    canActivate: [ AuthGardService ], 
    component: WriteComponent,
    canDeactivate: [ CanDeactivateWriteService ]
  },
  {
    path: ':id', 
    canActivate: [ AuthGardService ], 
    component: WriteComponent,
    resolve: { post: WriteResolverService },
    canDeactivate: [ CanDeactivateWriteService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteRoutingModule { }
