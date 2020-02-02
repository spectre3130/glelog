import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ScrollingModule, ScrollDispatchModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainNavComponent } from './layout/navbar/main-nav/main-nav.component';
import { UserNavComponent } from './layout/navbar/user-nav/user-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { LoginComponent } from './contents/login/login.component';
import { WriteComponent } from './contents/write/write.component';
import { EditorComponent } from './contents/editor/editor.component';
import { UserHomeComponent } from './contents/user-home/user-home.component';
import { WriteNavComponent } from './layout/navbar/write-nav/write-nav.component';
import { ConfirmComponent } from './layout/confirm/confirm.component';
import { PreviewComponent } from './contents/posts/preview/preview.component';
import { SettingsComponent } from './contents/settings/settings.component';
import { TagsComponent } from './contents/tags/tags.component';
import { UserHomeHeaderComponent } from './contents/user-home/user-home-header/user-home-header.component';
import { UserHomePostsComponent } from './contents/user-home/user-home-posts/user-home-posts.component';
import { UserHomeTagsComponent } from './contents/user-home/user-home-posts/user-home-tags/user-home-tags.component';
import { SettingsAvatarComponent } from './contents/settings/settings-avatar/settings-avatar.component';
import { SettingsBaseBtnComponent } from './contents/settings/settings-base-btn/settings-base-btn.component';
import { SettingsInputComponent } from './contents/settings/settings-input/settings-input.component';
import { SettingsSocialInputComponent } from './contents/settings/settings-social-input/settings-social-input.component';

import { CorsInterceptor } from './shared/cors.interceptor'

import { AuthService } from './auth/auth.service';
import { WriteService } from './contents/write/write.service';
import { EditorService } from './contents/editor/editor.service';
import { PostService } from './contents/post/post.service';
import { PostsService } from './contents/posts/posts.service';
import { UserHomeService } from './contents/user-home/user-home.service';
import { SettingsService } from './contents/settings/settings.service';

import { WriteDatePipe } from './shared/write-date.pipe';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/custom-url-serializer';
import { PopularPostsComponent } from './contents/posts/popular-posts/popular-posts.component';
import { AuthGardService } from './auth/auth-gard.service';

export function loadUser(authService: AuthService) {
  return () => authService.loadUser();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainNavComponent,
    UserNavComponent,
    FooterComponent,
    ProgressBarComponent,
    PostComponent,
    PostsComponent,
    SettingsComponent,
    TagsComponent,
    LoginComponent,
    WriteComponent,
    EditorComponent,
    UserHomeComponent,
    WriteNavComponent,
    PreviewComponent,
    WriteDatePipe,
    ConfirmComponent,
    UserHomeHeaderComponent,
    UserHomePostsComponent,
    UserHomeTagsComponent,
    SettingsAvatarComponent,
    SettingsBaseBtnComponent,
    SettingsInputComponent,
    SettingsSocialInputComponent,
    PopularPostsComponent,
  ],
  entryComponents: [
    LoginComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    TextareaAutosizeModule,
    ScrollingModule,
    ScrollDispatchModule,
    InfiniteScrollModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGardService,
    { provide: APP_INITIALIZER, useFactory: loadUser, deps: [AuthService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true, },
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    WriteService,
    EditorService,
    PostService,
    PostsService,
    UserHomeService,
    SettingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
