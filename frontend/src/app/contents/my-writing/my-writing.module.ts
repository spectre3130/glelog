import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWritingComponent } from './my-writing.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthGardService } from 'src/app/auth/auth-gard.service';
import { TempsaveComponent } from './tempsave/tempsave.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { MyWritingService } from './my-writing.service';
import { WritingComponent } from './writing/writing.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingMyWritingComponent } from 'src/app/layout/loading/loading-my-writing/loading-my-writing.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'me/writing', canActivate: [AuthGardService], component: MyWritingComponent,
    children: [
      { path: '', redirectTo: 'tempsave', pathMatch: 'full' },
      { path: 'tempsave', component: TempsaveComponent },
      { path: 'public', component: PublicComponent },
      { path: 'private', component: PrivateComponent },
    ]
  }
];
@NgModule({
  declarations: [
    MyWritingComponent,
    TempsaveComponent,
    PublicComponent,
    PrivateComponent,
    WritingComponent,
    LoadingMyWritingComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InfiniteScrollModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [
    MyWritingService,
  ],
})
export class MyWritingModule { }
