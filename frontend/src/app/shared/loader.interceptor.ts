import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService)
  {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.emit(request);
    return next.handle(request).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          this.loaderService.emit(event);
        } else if(event.type === 0) {
          this.loaderService.emit(false);
        }
      })
    );
  }
}
