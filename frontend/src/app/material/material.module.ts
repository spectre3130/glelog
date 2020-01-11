import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
  