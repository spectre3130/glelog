import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostBodyComponent } from './post-body/post-body.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostResolverService } from './post-resolver.service';


@NgModule({
  declarations: [
    PostComponent,
    PostHeaderComponent,
    PostBodyComponent,
    PostFooterComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
  ],
  providers: [
    PostResolverService
  ]
})
export class PostModule { }
