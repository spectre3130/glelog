import { NgModule } from '@angular/core';
import { WriteDatePipe } from './write-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    WriteDatePipe,
  ],
  exports: [
    WriteDatePipe,
    FontAwesomeModule,
    InfiniteScrollModule,
    MaterialModule,
  ]
})
export class SharedModule { }
