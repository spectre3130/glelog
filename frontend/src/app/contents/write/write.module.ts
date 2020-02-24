import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { WriteComponent } from './write.component';
import { WritePreviewComponent } from './write-preview/write-preview.component';
import { WriteRoutingModule } from './write-routing.module';
import { WriteEditorComponent } from './write-editor/write-editor.component';
import { WriteResolverService } from './write-resolver.service';


@NgModule({
  declarations: [
    WriteComponent,
    WriteEditorComponent,
    WritePreviewComponent,
  ],
  imports: [
    CommonModule,
    WriteRoutingModule,
    SharedModule
  ],
  providers: [
    WriteResolverService
  ]
})
export class WriteModule { }
