import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainNavComponent } from './layout/navbar/main-nav/main-nav.component';
import { UserNavComponent } from './layout/navbar/user-nav/user-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { LoginComponent } from './contents/login/login.component';
import { WriteComponent } from './contents/write/write.component';
import { EditorComponent } from './contents/write/editor/editor.component';
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
import { SettingsUsernameComponent } from './contents/settings/settings-username/settings-username.component';
import { PublishComponent } from './contents/publish/publish.component';
import { PlaceholderPostsComponent } from './layout/placeholder/placeholder-posts/placeholder-posts.component';
import { PlaceholderPopularComponent } from './layout/placeholder/placeholder-popular/placeholder-popular.component';
import { PlaceholderTagsComponent } from './layout/placeholder/placeholder-tags/placeholder-tags.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

import { CorsInterceptor } from './shared/interceptor/cors.interceptor'
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';

import { AuthService } from './auth/auth.service';
import { AuthGardService } from './auth/auth-gard.service';
import { WriteService } from './shared/service/write.service';
import { PostService } from './shared/service/post.service';
import { PostsService } from './contents/posts/posts.service';
import { UserHomeService } from './shared/service/user-home.service';
import { SettingsService } from './shared/service/settings.service';
import { TagsService } from './shared/service/tags.service';
import { LoaderService } from './shared/service/loader.service';

import { WriteStore } from './shared/service/write.store';

import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/custom-url-serializer';
import { SharedModule } from './shared/shared.module';

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
    PlaceholderPostsComponent,
    SettingsUsernameComponent,
    PublishComponent,
    PlaceholderPopularComponent,
    PlaceholderTagsComponent,
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
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGardService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (authService: AuthService) => () => authService.loadUser(), 
      deps: [AuthService], 
      multi: true 
    },
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
