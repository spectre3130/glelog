import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { WriteComponent } from './write.component';
import { WriteResolverService } from './write-resolver.service';
import { CanDeactivateWriteService } from './can-deactivate-write.service';

const routes: Routes = [
  {
    path: '', 
    canActivate: [ AuthGuardService ], 
    component: WriteComponent,
    canDeactivate: [ CanDeactivateWriteService ]
  },
  {
    path: ':id', 
    canActivate: [ AuthGuardService ], 
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
