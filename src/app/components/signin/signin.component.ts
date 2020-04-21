import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'qt-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  implements OnInit {
  private baseAuthURL = 'http://localhost:8080/auth/realms/frankrealm/protocol/openid-connect/auth';

  constructor(private _service: AppService,private router: Router) { }
  public isLoggedIn = false;

  ngOnInit() {
    console.log( "  signin init");

    this._service.logout();
/*
    this.isLoggedIn = this._service.checkCredentials();    

    console.log( "  signin logged in = " + this.isLoggedIn);

    let i = window.location.href.indexOf('code');

    console.log( "  signin code = " + i);

    if (this.isLoggedIn){
      this.router.navigate([ '' ]);          
      return;
    }

    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));

      //redirct to home
      if (this._service.checkCredentials){
        console.log( " go to home ");

        this.router.navigate([ '' ]);          
      }
    }
    */
  }
  login() {

    window.location.href = 
      `${this.baseAuthURL}?response_type=code&scope=write%20read&client_id=${this._service.clientId}&redirect_uri=${this._service.redirectUri}`;
    }
  
  logout() {
    this._service.logout();
  }
}