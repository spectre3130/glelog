import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { SettingsResolverService } from './settings-resolver.service';


const routes: Routes = [
  { 
    path: '', 
    canActivate: [ AuthGuardService ], 
    component: SettingsComponent,
    // resolve: { user: SettingsResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
