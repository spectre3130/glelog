import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.split('/')[2] === 'glelog.s3.ap-northeast-2.amazonaws.com') {
      //리팩토링 끝나면 수정할것 cors 설정은 apiService에서...
      return next.handle(request);
    }
    return next.handle(
      request.clone({
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin': environment.root 
        }),
        withCredentials: true,
      })
    );
  }
}
