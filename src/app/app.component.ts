import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models';
import {AuthenticationService} from './services';

@Component({
  selector: 'qt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quicktrade';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {

      console.log(' x: ' + JSON.stringify(x));

      this.currentUser = x;
    
    }  );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
