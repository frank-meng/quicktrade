import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject, empty } from 'rxjs';
import { catchError, debounceTime, switchMap, map, defaultIfEmpty, flatMap } from "rxjs/operators";
import { User } from '../models';
import { API_BASE_URL } from '../app.token';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public currentUser$: Observable<User>;


  public clientId = 'trader-app';
  public redirectUri = 'http://localhost:4200/quicktrade/postsignin/';

  private baseTokenURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/token';

  constructor(@Inject(API_BASE_URL) private baseUrl: string
    , private _http: HttpClient
    , private router: Router,
    private cookieService: CookieService
  ) { }

  saveToken(token) {
    const accessTokenExpireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("AXT", token.access_token, new Date(accessTokenExpireDate));

    const refreshToeknExpireDate = new Date().getTime() + (1000 * token.refresh_expires_in);
    this.cookieService.set("refresh_token", token.refresh_token, new Date(refreshToeknExpireDate));

    console.log("TOKEN=" + JSON.stringify(token));
    //window.location.href = 'http://localhost:4200/quicktrade/';
  }

  getRefreshToken() {
    return this.cookieService.get('refresh_token');
  }

  getAccessToken() {
    return this.cookieService.get('AXT');
  }

  checkCredentials() {
    if (this.getRefreshToken()) {
      return true;
    }
    return false;
  }

  logout() {
    console.log(" log out");
    this.cookieService.delete('AXT');
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

    this._http.post(this.baseTokenURL, params.toString(), { headers: headers })
      .subscribe(
        data => {
          console.log(" get token " + data);
          this.saveToken(data);
          //this.retrieveUser();
          this.router.navigate(['/']);
        },
        err => {
          console.log(" Invalid Credentials");
          this.router.navigate(['signin']);
          // alert('Invalid Credentials')
        }
      );
  }

  refreshAccessToken(): Observable<any> {
    console.log(" freshing Token ");
    const refToken = this.getRefreshToken();

    if (!refToken) {
      console.log(" freshing Token expired ");

      this.router.navigate(['signin']);
      return;
    }

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


}
