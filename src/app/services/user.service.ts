import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject, empty } from 'rxjs';
import { catchError, debounceTime, switchMap, map, defaultIfEmpty, flatMap } from "rxjs/operators";
import { User, JwtToken } from '../models';
import { API_BASE_URL } from '../app.token';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/reducers/user';
//import { RemoveTokenAction, SetTokenAction, getTokenData } from '../store';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public clientId = 'trader-app';
  public redirectUri = 'http://localhost:4200/quicktrade/postsignin/';

  private baseTokenURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/token';

  private baseAuthURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/auth';

  constructor(@Inject(API_BASE_URL) private baseUrl: string
    , private _http: HttpClient
  ) { }

  login() {

    window.location.href =
      `${this.baseAuthURL}?response_type=code&scope=write%20read&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
  }

  retrieveToken(code) {
    console.log(" retrieve ing Token " + code);

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    //  params.append('client_secret', 'newClientSecret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.clientId + ":secret")
    });

    return this._http.post(this.baseTokenURL, params.toString(), { headers: headers });

  }

  refreshAccessToken(refToken: string): Observable<any> {
    console.log(" freshing Token ");


    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', this.clientId);
    //  params.append('client_secret', 'newClientSecret');
    params.append('refresh_token', refToken);

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });
    console.log(" sending Token  request");

    return this._http.post(this.baseTokenURL, params.toString(), { headers: headers });

  }

  retrieveUser(): Observable<User> {
    console.log(" retrieveUser ");
    return this._http.get<User>(`${this.baseUrl}/api/user/info`);
  }

}
