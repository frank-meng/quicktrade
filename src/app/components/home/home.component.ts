import { Component, OnInit } from '@angular/core';
import { AppService ,AuthenticationService, AccountService } from '../../services'
import { User, Account } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'trd-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*
  private baseAuthURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/auth';

  constructor(private _service: AppService) { }
  public isLoggedIn = false;
  ngOnInit() {
    this.isLoggedIn = this._service.checkCredentials();    
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
  }
  login() {

    window.location.href = 
      `${this.baseAuthURL}?response_type=code&scope=write%20read&client_id=${this._service.clientId}&redirect_uri=${this._service.redirectUri}`;
    }
  
  logout() {
    this._service.logout();
  }
  */

  currentUser: User;
  accounts$: Observable<Account[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }


  ngOnInit() {
    console.log("  init home");
    this.accounts$ = this.accountService.getAll(this.currentUser);
  }


}
