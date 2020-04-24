import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'qt-postlogin',
  templateUrl: './postlogin.component.html',
  styleUrls: ['./postlogin.component.scss']
})
export class PostloginComponent implements OnInit {

  constructor(private _service: AppService,private router: Router) { }
  public isLoggedIn = false;

  ngOnInit() {
    console.log( "  PostloginComponent init");

    this.isLoggedIn = this._service.checkCredentials();    

    let i = window.location.href.indexOf('code');

    console.log( "  signin code = " + i);
    console.log( "  isLoggedIn = " + this.isLoggedIn);

    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5)) ;
     // this.router.navigate([ '' ]);   
    }else if (this.isLoggedIn){
      console.log( " go to home ");

      this.router.navigate([ '' ]);         
    }
  }
}
