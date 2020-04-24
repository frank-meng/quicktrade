import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';

@Component({
  selector: 'qt-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  implements OnInit {

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
    this._service.login();
  }
  
  logout() {
    this._service.logout();
  }
}