import { Component, OnInit } from '@angular/core';
import { AppService, AuthenticationService, AccountService } from '../../services'
import { User } from '../../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'trd-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser$: Observable<User>;
   //currentUser$: BehaviorSubject<User>;

  
  constructor(
    private appService: AppService,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.currentUser$ =  this.appService.retrieveUser();
  }


}
