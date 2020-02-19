import { NgModule } from '@angular/core';
import { WriteDatePipe } from './write-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


@NgModule({
  declarations: [
    WriteDatePipe,
  ],
  exports: [
    WriteDatePipe,
    FontAwesomeModule,
    InfiniteScrollModule,
    MaterialModule,
    CodemirrorModule
  ]
})
export class SharedModule { }
