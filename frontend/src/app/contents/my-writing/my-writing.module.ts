import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyWritingComponent } from './my-writing.component';
import { WritingPreviewComponent } from './writing-preview/writing-preview.component';
import { PlaceholderMyWritingComponent } from 'src/app/layout/placeholder/placeholder-my-writing/placeholder-my-writing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WritingListComponent } from './wrting-list/writing-list.component';
import { MyWritingRoutingModule } from './my-writing-routing.module';
import { WritingListResolverService } from './wrting-list/writing-list-resolver.service';

@NgModule({
  declarations: [
    MyWritingComponent,
    WritingListComponent,
    WritingPreviewComponent,
    PlaceholderMyWritingComponent,
  ],
  imports: [
    CommonModule,
    MyWritingRoutingModule,
    SharedModule
  ],
  providers: [
    WritingListResolverService,
  ]
})
export class MyWritingModule { }
