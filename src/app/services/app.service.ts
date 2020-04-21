import { Injectable, Inject } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, BehaviorSubject, empty } from 'rxjs';
import { catchError, debounceTime, switchMap, map, defaultIfEmpty } from "rxjs/operators";
import { User } from '../models';
import { API_BASE_URL } from '../app.token';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;


  public clientId = 'trader-app';
  public redirectUri = 'http://localhost:4200/quicktrade/postsignin/';

  private baseTokenURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/token';

  constructor(@Inject(API_BASE_URL) private baseUrl: string
    , private _http: HttpClient
  ) { }



  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    //this.cookieService.set("AXT", token.access_token, expireDate);
    console.log("TOKEN=" + JSON.stringify(token));

    const axt = { "token": token.access_token, "exp": expireDate };
    localStorage.setItem('token', token.access_token);

    console.log('Obtained Access token');
     window.location.href = 'http://localhost:4200/quicktrade/';
  }

  getResource(resourceUrl): Observable<any> {
    var headers = new HttpHeaders(
      {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });


    return this._http.get(resourceUrl, { headers: headers }).pipe(
      catchError((error: any) => {
        //Observable.throw(error.json().error || 'Server error')
        console.log(error.json().error || 'Server error')
        return EMPTY;
      })
    );
  }

  checkCredentials() {
    // console.log(" checkCredentials 1 --"  +this.cookieService.get('access_token'));

    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    console.log(" log out");
    //this.cookieService.delete('AXT');
    localStorage.removeItem('token');

    //window.location.reload();

    console.log(" logout 1 --");
  }

  retrieveToken(code) {
    console.log(" retrieve ing Token " + code);
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    //  params.append('client_secret', 'newClientSecret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);


    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.clientId + ":secret")
    });
    this._http.post(this.baseTokenURL, params.toString(), { headers: headers })
      .subscribe(
        data => {
          console.log(" get token " + data);
          this.saveToken(data);
          //this.retrieveUser();
        },
        err => {
          console.log(" Invalid Credentials");

          // alert('Invalid Credentials')
        }
      );

  }

  retrieveUser1() {
    console.log(" retrieveUser ");
    this.currentUser$ = this.getResource(`${this.baseUrl}/api/user/info`).pipe(map(user => {
      console.log(`server retured ${user}`);
      return user;
    })).pipe(catchError(err => {
      console.log(` ${err} `);
      return empty()
    }
    ));
  }

  retrieveUser(){
    console.log(" retrieveUser ");

    return this.getResource(`${this.baseUrl}/api/user/info`).pipe(user => {
      console.log(`server retured ${user}`);
      return user;
    }).pipe(catchError(err => {
      console.log( JSON.stringify(err));
      return empty()
    }
    ));
  }

}
