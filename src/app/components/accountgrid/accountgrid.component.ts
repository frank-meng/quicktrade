import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services';
import { Account } from '../../models';
import { Store, State, select } from '@ngrx/store';
import { AccountsState } from 'src/app/store/reducers/accounts';
import { AccountsAction, getAccountsData, SelectAccountAction } from 'src/app/store';

@Component({
  selector: 'qt-accountgrid',
  templateUrl: './accountgrid.component.html',
  styleUrls: ['./accountgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountgridComponent {

  accounts$: Observable<Account[]>;
  
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);

  constructor(private media: MediaObserver,
    private router: Router,
    private store: Store<AccountsState>) {
      
    // If the initial screen size is xs ObservableMedia doesn't emit an event
    // and grid-list rendering fails. Once the following issue is closed, this
    // comment can be removed: https://github.com/angular/flex-layout/issues/388
    this.columns$ = this.media.asObservable()
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc[0].mqAlias)),
        startWith(3)
      );
      this.accounts$ = this.store.pipe(select(getAccountsData));
      
      this.store.dispatch(new AccountsAction());

  }

  trade(account:Account){
    console.log (" trading "+ Account.name);

    this.store.dispatch(new SelectAccountAction({account: account}));

    this.router.navigate([ '/trade' ]);          
    
  }
}
