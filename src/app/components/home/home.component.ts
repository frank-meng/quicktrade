import { Component, OnInit } from '@angular/core';
import { AppService, AuthenticationService, AccountService } from '../../services'
import { User, Account } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'trd-home',
  templateUrl: './home.component.html',
  providers: [AppService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser$: Observable<User>;
  accounts$: Observable<Account[]>;

  
  constructor(
    private appService: AppService,
    private accountService: AccountService
  ) {
    this.currentUser$ = this.appService.retrieveUser();
    
  }


  ngOnInit() {
    console.log("  init home");
  }


}
