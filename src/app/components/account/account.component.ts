import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services';
import { Transaction } from '../../models';

@Component({
  selector: 'qt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent {
  account$: Observable<Account>;
  transactions$: Observable<Transaction[]>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService) {
    console.log(" AccountComponent init");
    this.route.paramMap.subscribe(
      p => {
        const selectedId = parseInt(p.get('accountName') || '', 10);
        //account$ = ;
        this.transactions$ = accountService.getAccountTransactions("sss");

      });
  }

}
