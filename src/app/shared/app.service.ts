import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/reducers/user';
import { RemoveTokenAction, getTokenData, SetTokenAction } from '../store';
import { Observable } from 'rxjs';
import { JwtToken } from '../models';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public currentToken$: Observable<JwtToken>;

  private currentTokenValue: JwtToken;

  constructor(private router: Router,
    private store: Store<UserState>,
    private userService: UserService) {
    this.currentToken$ = this.store.pipe(select(getTokenData));

    this.currentToken$.subscribe(token => {
      this.currentTokenValue = token;

    });


  }

  saveToken(token) {
    const accessTokenExpireDate = new Date().getTime() + (1000 * token.expires_in);

    const refreshToeknExpireDate = new Date().getTime() + (1000 * token.refresh_expires_in);

    console.log("TOKEN=" + JSON.stringify(token));

    const jwtToken = new JwtToken(token.access_token, new Date(accessTokenExpireDate),
      token.refresh_token, new Date(refreshToeknExpireDate), token.scope);

    this.store.dispatch(new SetTokenAction({ token: jwtToken }));

    //window.location.href = 'http://localhost:4200/quicktrade/';
  }

  retrieveToken(code) {
    this.userService.retrieveToken(code).subscribe(
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

    if (!this.checkCredentials()) {
      console.log(" no token");

      this.router.navigate(['signin']);
      return;
    }
    const refToken = this.currentTokenValue.refresh_token;

    if (!refToken) {
      console.log(" no refresh token");
      this.router.navigate(['signin']);
      return;
    }

    return this.userService.refreshAccessToken(refToken);

  }

  checkCredentials() {
    if (this.currentTokenValue) {
      if (this.currentTokenValue.refresh_token_expiry_date > new Date())
        return true;
    }

    return false;
  }

  login() {
    this.userService.login();
  }
  logout() {
    console.log(" log out");
    this.store.dispatch(new RemoveTokenAction());
  }

}
