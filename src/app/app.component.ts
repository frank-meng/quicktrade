import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './shared/app.service';


@Component({
  selector: 'qt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quicktrade';
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
