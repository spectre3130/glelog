import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService)
  { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.emit(request);
    return next.handle(request).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          this.loaderService.emit(event);
        }
      }),
      catchError(err => {
        this.loaderService.emit(false);
        throw err;
      })
    )
  }
}
