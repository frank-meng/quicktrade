import { Injectable } from '@angular/core'; import { Observable, of } from 'rxjs';
import { AccountsAction, AccountsActionTypes, AccountsSuccessAction, AccountsFailureAction } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AccountService } from 'src/app/services';
import {Account} from '../../models';


@Injectable()
export class AccountsEffects {
    constructor(private readonly actions$: Actions,
        private accountService: AccountService) { }

    @Effect()
    retrieveAccounts$: Observable<Action> = this.actions$
        .pipe(
            ofType(AccountsActionTypes.Load),
            switchMap(() => this.accountService.getAll()),
            handleLoadedAccounts()
        );
        
        }
    const handleLoadedAccounts = () => 
        (source:  Observable<Account[]>) => source.pipe(
            map( (accts: Account[]) => new AccountsSuccessAction({ results: accts })),
            catchError(error => of(new AccountsFailureAction({ err: 'error' })))
        );

   

