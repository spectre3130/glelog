import { Injectable } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private DOMAIN = 'tag';

  constructor(
    private apiService: ApiService
  ) { }

  getTags(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>(`${this.DOMAIN}`);
  }
  
  getUserTags(username: string): Observable<Tag[]> {
    return this.apiService.get<Tag[]>(`${this.DOMAIN}/${encodeURIComponent(username.replace('@', ''))}`);
  }
  
}
