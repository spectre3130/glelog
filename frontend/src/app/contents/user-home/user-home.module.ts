import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserHomeComponent } from './user-home.component';
import { UserHomeHeaderComponent } from './user-home-header/user-home-header.component';
import { UserHomeTagsComponent } from './user-home-tags/user-home-tags.component';
import { UserHomePostsComponent } from './user-home-posts/user-home-posts.component';
import { UserHomeResolverService } from './user-home-resolver.service';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserHomeHeaderComponent,
    UserHomeTagsComponent,
    UserHomePostsComponent,
  ],
  imports: [
    CommonModule,
    UserHomeRoutingModule,
    SharedModule
  ],
  providers: [
    UserHomeResolverService,
  ]
})
export class UserHomeModule { }
