import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tag } from 'src/app/app.model';
import { Observable } from 'rxjs';

@Injectable()
export class TagsService {

  constructor(
    private http: HttpClient
  ) { }

  getTags(): Observable<Array<Tag>> {
    return this.http.get<Array<Tag>>(`${environment.resource}/api/tag`);
  }
}
