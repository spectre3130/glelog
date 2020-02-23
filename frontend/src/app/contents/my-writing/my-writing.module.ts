import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyWritingComponent } from './my-writing.component';
import { MyWritingPreviewComponent } from './my-writing-preview/my-writing-preview.component';
import { PlaceholderMyWritingComponent } from 'src/app/layout/placeholder/placeholder-my-writing/placeholder-my-writing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyWritingListComponent } from './my-writing-list/my-writing-list.component';
import { MyWritingRoutingModule } from './my-writing-routing.module';
import { MyWritingListResolverService } from './my-writing-list/my-writing-list-resolver.service';

@NgModule({
  declarations: [
    MyWritingComponent,
    MyWritingListComponent,
    MyWritingPreviewComponent,
    PlaceholderMyWritingComponent,
  ],
  imports: [
    CommonModule,
    MyWritingRoutingModule,
    SharedModule
  ],
  providers: [
    MyWritingListResolverService,
  ]
})
export class MyWritingModule { }
