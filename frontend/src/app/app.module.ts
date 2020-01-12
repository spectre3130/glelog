import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './contents/user/user.component';
import { SettingComponent } from './contents/setting/setting.component';
import { WritingComponent } from './contents/writing/writing.component';
import { TagsComponent } from './contents/tags/tags.component';
import { ContentsHeaderComponent } from './layout/contents-header/contents-header.component';

import { CorsInterceptor } from './shared/cors.interceptor'
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostComponent,
    PostsComponent,
    ProgressBarComponent,
    UserComponent,
    SettingComponent,
    WritingComponent,
    TagsComponent,
    LoginComponent,
    ContentsHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    MarkdownModule.forRoot()
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
