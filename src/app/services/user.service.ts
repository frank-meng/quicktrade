import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { API_BASE_URL, AUTH_URL } from '../app.token';
//import { RemoveTokenAction, SetTokenAction, getTokenData } from '../store';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public clientId = 'trader-app';
  //public redirectUri = 'http://localhost:4200/quicktrade/postsignin/';
  //private baseTokenURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/token';
  //private baseAuthURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/auth';

  public redirectUri = `${this.baseUrl}/postsignin/`;
  private baseTokenURL = `${this.authUrl}/protocol/openid-connect/token`;
  private baseAuthURL = `${this.authUrl}/protocol/openid-connect/auth`;

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    @Inject(AUTH_URL) private authUrl: string,
    private _http: HttpClient
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
