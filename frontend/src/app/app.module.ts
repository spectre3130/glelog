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
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MyWritingModule } from './contents/my-writing/my-writing.module';

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
import { PopularPostsComponent } from './contents/posts/popular-posts/popular-posts.component';
import { PopularPreviewComponent } from './contents/posts/popular-preview/popular-preview.component';
import { LoadingPostsComponent } from './layout/loading/loading-posts/loading-posts.component';
import { SettingsUsernameComponent } from './contents/settings/settings-username/settings-username.component';
import { PublishComponent } from './contents/publish/publish.component';
import { LoadingPopularComponent } from './layout/loading/loading-popular/loading-popular.component';
import { LoadingTagsComponent } from './layout/loading/loading-tags/loading-tags.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

import { CorsInterceptor } from './shared/cors.interceptor'
import { LoaderInterceptor } from './shared/loader.interceptor';

import { AuthService } from './auth/auth.service';
import { AuthGardService } from './auth/auth-gard.service';
import { WriteService } from './contents/write/write.service';
import { PostService } from './contents/post/post.service';
import { PostsService } from './contents/posts/posts.service';
import { UserHomeService } from './contents/user-home/user-home.service';
import { SettingsService } from './contents/settings/settings.service';
import { TagsService } from './contents/tags/tags.service';
import { LoaderService } from './shared/loader.service';

import { WriteStore } from './contents/write/write.store';

import { WriteDatePipe } from './shared/write-date.pipe';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/custom-url-serializer';
import { SharedModule } from './shared/shared.module';


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
    ConfirmComponent,
    UserHomeHeaderComponent,
    UserHomePostsComponent,
    UserHomeTagsComponent,
    SettingsAvatarComponent,
    SettingsBaseBtnComponent,
    SettingsInputComponent,
    SettingsSocialInputComponent,
    PopularPostsComponent,
    PopularPreviewComponent,
    LoadingPostsComponent,
    SettingsUsernameComponent,
    PublishComponent,
    LoadingPopularComponent,
    LoadingTagsComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [
    LoginComponent,
    ConfirmComponent,
    PublishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TextareaAutosizeModule,
    ScrollingModule,
    ScrollDispatchModule,
    LazyLoadImageModule,
    MyWritingModule,
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  exports: [
    WriteDatePipe,
  ],
  providers: [
    AuthService,
    AuthGardService,
    { provide: APP_INITIALIZER, useFactory: loadUser, deps: [AuthService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true, },
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    WriteStore,
    WriteService,
    PostService,
    PostsService,
    TagsService,
    UserHomeService,
    SettingsService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
