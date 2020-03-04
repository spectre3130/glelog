import { NgModule } from '@angular/core';
import { PostDatePipe } from './pipe/write-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../material/material.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule  } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { PreviewComponent } from '../contents/shared/preview/preview.component';
import { PlaceholderPostsComponent } from '../layout/placeholder/placeholder-posts/placeholder-posts.component';
import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PlaceholderMyWritingComponent } from '../layout/placeholder/placeholder-my-writing/placeholder-my-writing.component';
import { PlaceholderTagsComponent } from '../layout/placeholder/placeholder-tags/placeholder-tags.component';
import { PlaceholderPopularComponent } from '../layout/placeholder/placeholder-popular/placeholder-popular.component';
import { AtPipe } from './pipe/at.pipe';
import { RemoveHashPipe } from './pipe/remove-hash.pipe';
import { ImageCompressorDirective } from './directive/image-compressor.directive';
import { ImageOptimizerPipe } from './pipe/image-optimizer.pipe';

const components = [
  PreviewComponent,
  PlaceholderPostsComponent,
  PlaceholderMyWritingComponent,
  PlaceholderTagsComponent,
  PlaceholderPopularComponent,
  PageNotFoundComponent
];

const directives = [
  ImageCompressorDirective,
];

const pipes = [
  PostDatePipe,
  AtPipe,
  RemoveHashPipe,
  ImageOptimizerPipe,
];

const modules = [
  RouterModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  FontAwesomeModule,
  InfiniteScrollModule,
  CodemirrorModule,
  MarkdownModule,
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
    ...directives,
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
    ...pipes,
    ...directives,
  ],
})
export class SharedModule { }
