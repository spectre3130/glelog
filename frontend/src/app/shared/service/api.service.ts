import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private option = {
    responseType: "blob", reportProgress: true, observe: "events", headers: new HttpHeaders(
      { 'Content-Type': 'application/json' },
    )
  }

  constructor(
    private http: HttpClient
  ) { }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${environment.api}/api/${path}`);
  }

  post<T, S = T>(path: string, payload: S): Observable<T> {
    return this.http.post<T>(`${environment.api}/api/${path}`, payload);
  }

  put<T, S = T>(path: string, payload: S): Observable<T> {
    return this.http.put<T>(`${environment.api}/api/${path}`, payload);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.api}/api/${path}`);
  }

  generateQuery<T>(query: T): string {
    return '?' + Object.keys(query).map((key) => {
      return query[key] ? `${key}=${encodeURIComponent(query[key])}` : '';
    }).reduce((acc, cur) => {
      return acc + (cur ? '&' + cur : '');
    });
  }
}
