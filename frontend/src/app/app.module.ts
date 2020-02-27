import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainNavComponent } from './layout/navbar/main-nav/main-nav.component';
import { UserNavComponent } from './layout/navbar/user-nav/user-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { LoginComponent } from './contents/login/login.component';
import { WriteNavComponent } from './layout/navbar/write-nav/write-nav.component';
import { ConfirmComponent } from './layout/confirm/confirm.component';
import { SettingsComponent } from './contents/settings/settings.component';
import { TagsComponent } from './contents/tags/tags.component';
import { SettingsAvatarComponent } from './contents/settings/settings-avatar/settings-avatar.component';
import { SettingsBaseBtnComponent } from './contents/settings/settings-base-btn/settings-base-btn.component';
import { SettingsInputComponent } from './contents/settings/settings-input/settings-input.component';
import { SettingsSocialInputComponent } from './contents/settings/settings-social-input/settings-social-input.component';
import { PopularPostsComponent } from './contents/posts/popular-posts/popular-posts.component';
import { PopularPreviewComponent } from './contents/posts/popular-preview/popular-preview.component';
import { SettingsUsernameComponent } from './contents/settings/settings-username/settings-username.component';

import { CorsInterceptor } from './shared/interceptor/cors.interceptor'
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';

import { AuthService } from './auth/auth.service';
import { AuthGardService } from './auth/auth-gard.service';
import { PostService } from './shared/service/post.service';
import { PostsService } from './shared/service/posts.service';
import { SettingsService } from './shared/service/settings.service';
import { TagsService } from './shared/service/tags.service';
import { LoaderService } from './shared/service/loader.service';


import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/custom-url-serializer';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './shared/service/api.service';
import { PublishComponent } from './contents/publish/publish.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './shared/service/user.service';
import { PostResolverService } from './contents/post/post-resolver.service';
import { SearchButtonComponent } from './layout/navbar/main-nav/search-button/search-button.component';
import { AlarmButtonComponent } from './layout/navbar/main-nav/alarm-button/alarm-button.component';

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
    WriteNavComponent,
    ConfirmComponent,
    SettingsAvatarComponent,
    SettingsBaseBtnComponent,
    SettingsInputComponent,
    SettingsSocialInputComponent,
    PopularPostsComponent,
    PopularPreviewComponent,
    SettingsUsernameComponent,
    PublishComponent,
    SearchButtonComponent,
    AlarmButtonComponent,
  ],
  entryComponents: [
    LoginComponent,
    ConfirmComponent,
    PublishComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGardService,
    ApiService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (authService: AuthService) => () => authService.loadUser(), 
      deps: [AuthService], 
      multi: true 
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true, },
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    PostService,
    PostResolverService,
    PostsService,
    TagsService,
    UserService,
    SettingsService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
