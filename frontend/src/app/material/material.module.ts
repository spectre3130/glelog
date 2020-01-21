import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class MaterialModule { }
  