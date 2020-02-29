import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/app.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private DOMAIN = 'user';
  private userSubject = new BehaviorSubject<User>({} as User);
  currentUser = this.userSubject.asObservable()
                                .pipe(distinctUntilChanged());

  constructor(
    private apiService: ApiService
  ) { }

  next(user: User): void {
    this.userSubject.next(user);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.apiService.get<User>(`${this.DOMAIN}?username=${encodeURIComponent(username.replace('@', ''))}`);
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.put<User, User>('user', user);
  }

  updateAvatar(formData: FormData): Observable<User> {
    return this.apiService.post<User, FormData>('upload/avatar', formData);
  }

  get user(): User {
    return this.userSubject.value;
  }

}