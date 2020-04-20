import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, EMPTY} from 'rxjs';
import {catchError, debounceTime, switchMap} from "rxjs/operators";

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
} 

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public clientId = 'trader-app';
  public redirectUri = 'http://localhost:4200/';

  private baseTokenURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/token';

  constructor(private _http: HttpClient , private cookieService: CookieService) { }



  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = this.redirectUri;
  }

  getResource(resourceUrl) : Observable<any>{
    var headers = new HttpHeaders(
      {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
       'Authorization': 'Bearer '+this.cookieService.get('access_token')});
    return this._http.get(resourceUrl, { headers: headers }).pipe(
          catchError((error:any) => {
            //Observable.throw(error.json().error || 'Server error')
            console.log( error.json().error || 'Server error')
            return EMPTY;
          })
    );
  }

  checkCredentials(){
    return this.cookieService.check('access_token');
  } 

  logout() {
    this.cookieService.delete('access_token');
    window.location.reload();
  }

  retrieveToken(code){
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
  //  params.append('client_secret', 'newClientSecret');
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = new HttpHeaders({
             'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
              'Authorization': 'Basic '+btoa(this.clientId+":secret")});
     this._http.post(this.baseTokenURL, params.toString(), { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }



}
