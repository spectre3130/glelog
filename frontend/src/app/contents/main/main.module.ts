import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './posts/posts.component';
import { PopularPreviewComponent } from './popular-preview/popular-preview.component';
import { PopularPostsComponent } from './popular-posts/popular-posts.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent,
    PostsComponent,
    PopularPostsComponent,
    PopularPreviewComponent,
  ],
  imports: [
    CommonModule,
    // MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
