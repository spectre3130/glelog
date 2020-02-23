import { NgModule } from '@angular/core';
import { WriteDatePipe } from './pipe/write-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WriteDatePipe,
  ],
  exports: [
    WriteDatePipe,
    MaterialModule,
    FormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    CodemirrorModule,
  ]
})
export class SharedModule { }
