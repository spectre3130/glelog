import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWritingComponent } from './my-writing.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGardService } from 'src/app/auth/auth-gard.service';
import { TempsaveComponent } from './tempsave/tempsave.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { MyWritingService } from 'src/app/shared/service/my-writing.service';
import { WritingPreviewComponent } from './writing-preview/writing-preview.component';
import { PlaceholderMyWritingComponent } from 'src/app/layout/placeholder/placeholder-my-writing/placeholder-my-writing.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
      path: '', canActivate: [ AuthGardService ], component: MyWritingComponent,
      children: [
          { path: '', redirectTo: 'tempsave', pathMatch: 'full' },
          { path: 'tempsave', component: TempsaveComponent },
          { path: 'public', component: PublicComponent },
          { path: 'private', component: PrivateComponent },
      ]
  },
];

@NgModule({
  declarations: [
    MyWritingComponent,
    TempsaveComponent,
    PublicComponent,
    PrivateComponent,
    WritingPreviewComponent,
    PlaceholderMyWritingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MyWritingService,
  ],
})
export class MyWritingModule { }
