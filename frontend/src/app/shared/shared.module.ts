import { NgModule } from '@angular/core';
import { WriteDatePipe } from './pipe/write-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    WriteDatePipe,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    WriteDatePipe,
    MaterialModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    CodemirrorModule,
    MarkdownModule
  ],
})
export class SharedModule { }
