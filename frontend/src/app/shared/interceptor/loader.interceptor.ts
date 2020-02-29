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
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private queue: HttpRequest<any>[] = [];
  private currentUrl: string;

  constructor(
    private router: Router,
    private loaderService: LoaderService)
  { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.currentUrl !== this.router.url) {
      this.currentUrl = this.router.url;
      this.clearQueue();
    }

    this.queue.push(req);
    this.loaderService.emit(true);

    return next.handle(req).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          this.removeQueue(req);
        }
      }),
      catchError((err) => {
        this.clearQueue();
        this.loaderService.emit(false);
        throw err;
      })
    )
  }
  private removeQueue(req: HttpRequest<any>): void {
    const index = this.queue.indexOf(req);
    if (index >= 0) {
      this.queue.splice(index, 1);
      if(!this.queue.length) {
        this.loaderService.emit(false);
      }
    }
  }

  private clearQueue(): void {
    this.queue = [];
  }
}

