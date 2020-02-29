import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, SecurityContext } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { PublishComponent } from './contents/publish/publish.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainNavComponent } from './layout/navbar/main-nav/main-nav.component';
import { UserNavComponent } from './layout/navbar/user-nav/user-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProgressBarComponent } from './layout/progress-bar/progress-bar.component';
import { LoginComponent } from './contents/login/login.component';
import { WriteNavComponent } from './layout/navbar/write-nav/write-nav.component';
import { ConfirmComponent } from './layout/confirm/confirm.component';
import { SearchButtonComponent } from './layout/navbar/main-nav/search-button/search-button.component';
import { AlarmButtonComponent } from './layout/navbar/main-nav/alarm-button/alarm-button.component';

import { TagsComponent } from './contents/tags/tags.component';

import { CorsInterceptor } from './shared/interceptor/cors.interceptor'
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';

import { AuthenticatedDirective } from './auth/authenticated.directive';

//ngx-markdown anchor issue #125
import { AnchorService } from './shared/service/anchor.service';
import { markedOptionsFactory } from './shared/factory/factory';
import { MainModule } from './contents/main/main.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
      ProgressBarComponent,
      MainNavComponent,
        SearchButtonComponent,
        AlarmButtonComponent,
      UserNavComponent,
      WriteNavComponent,
        PublishComponent,
    FooterComponent,
    ConfirmComponent,
    AuthenticatedDirective,
    LoginComponent,
    TagsComponent,
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
    MainModule,
    SharedModule,
    MarkdownModule.forRoot({
      sanitize : SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
