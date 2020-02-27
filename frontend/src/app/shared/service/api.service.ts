import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${environment.resource}/api/${path}`);
  }

  post<T, S = T>(path: string, payload: S): Observable<T> {
    return this.http.post<T>(`${environment.resource}/api/${path}`, payload);
  }

  put<T, S = T>(path: string, payload: S): Observable<T> {
    return this.http.put<T>(`${environment.resource}/api/${path}`, payload);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.resource}/api/${path}`);
  }

  generateQuery<T>(query: T): string {
    return '?' + Object.keys(query).map((key) => {
      return query[key] ? `${key}=${encodeURIComponent(query[key])}` : '';
    }).reduce((acc, cur) => {
      return acc + (cur ? '&' + cur : '');
    });
  }
}
