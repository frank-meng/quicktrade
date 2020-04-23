import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models';
import { AppService } from './services';
import { Observable } from 'rxjs';

@Component({
  selector: 'qt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quicktrade';
  //currentUser: Observable<User>;

  constructor(
    private router: Router,
    private appService: AppService
  ) {
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['/signin']);
  }

}
