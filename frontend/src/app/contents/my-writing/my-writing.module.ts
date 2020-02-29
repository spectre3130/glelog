import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyWritingComponent } from './my-writing.component';
import { MyWritingPreviewComponent } from './my-writing-preview/my-writing-preview.component';
import { MyWritingListComponent } from './my-writing-list/my-writing-list.component';
import { MyWritingListResolverService } from './my-writing-list/my-writing-list-resolver.service';
import { MyWritingRoutingModule } from './my-writing-routing.module';

@NgModule({
  declarations: [
    MyWritingComponent,
    MyWritingListComponent,
    MyWritingPreviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyWritingRoutingModule,
  ],
  providers: [
    MyWritingListResolverService,
  ]
})
export class MyWritingModule { }
