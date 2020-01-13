import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainNavComponent } from './layout/navbar/main-nav/main-nav.component';
import { UserNavComponent } from './layout/navbar/user-nav/user-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PostComponent } from './contents/post/post.component';
import { PostsComponent } from './contents/posts/posts.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { WriteComponent } from './contents/write/write.component';
import { EditorComponent } from './layout/editor/editor.component';
import { UserHomeComponent } from './contents/user-home/user-home.component';

import { SettingComponent } from './contents/setting/setting.component';
import { TagsComponent } from './contents/tags/tags.component';
import { ContentsHeaderComponent } from './layout/contents-header/contents-header.component';

import { CorsInterceptor } from './shared/cors.interceptor'

import { AuthService } from './auth/auth.service';
import { WriteNavComponent } from './layout/navbar/write-nav/write-nav.component';
import { NavbarService } from './layout/navbar/navbar.service';


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
    SettingComponent,
    TagsComponent,
    LoginComponent,
    ContentsHeaderComponent,
    WriteComponent,
    EditorComponent,
    UserHomeComponent,
    WriteNavComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: APP_INITIALIZER, useFactory: loadUser, deps: [AuthService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true, },
    NavbarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
