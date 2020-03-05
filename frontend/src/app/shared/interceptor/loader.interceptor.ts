import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];
  private currentUrl: string;

  constructor(
    private router: Router,
    private loaderService: LoaderService)
  { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.initProgress(req);
    
    return next.handle(req).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          this.removeRequest(req);
        }
      }),
      finalize(() => {
        this.removeRequest(req);
      })
    )
  }

  private initProgress(req: HttpRequest<unknown>): void {
    if(this.currentUrl !== this.router.url) {
      this.currentUrl = this.router.url;
      this.requests = [];
    }
    this.requests.push(req);
    this.loaderService.emit(true);
  }
  
  private removeRequest(req: HttpRequest<unknown>): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    if(!this.requests.length) {
      this.loaderService.emit(false);
    }
  }
}

