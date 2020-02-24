import { Injectable } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class TagsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTags(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>('tag');
  }
  
  getUserTags(username: string): Observable<Tag[]> {
    return this.apiService.get<Tag[]>(`tag/${encodeURIComponent(username.replace('@', ''))}`);
  }
  
}
