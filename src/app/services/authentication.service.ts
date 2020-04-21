import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { API_BASE_URL } from '../app.token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient) {

    const u = JSON.parse(localStorage.getItem('currentUser'));
    console.log(' loclstorage: ' + u);

    this.currentUserSubject = new BehaviorSubject<User>(u);
    this.currentUser = this.currentUserSubject.asObservable();

    console.log(' currentUser: ' + this.currentUserValue);

  }



  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${this.baseUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
