import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService, AccountService } from 'src/app/services';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { User } from 'src/app/models';
import { Action } from '@ngrx/store';
import { UserActionTypes, UserSuccessAction, UserAccountsSuccessAction, UserFailureAction } from '../actions/user';
import {Account} from '../../models';


@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions,
        private accountService: AccountService,
        private userService: UserService) { }

    @Effect()
    retrieveUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.Load_User),
        switchMap(() => this.userService.retrieveUser()),
        handleLoadedUser()
    );


    @Effect()
    retrieveAccounts$: Observable<Action> = this.actions$
        .pipe(
            ofType(UserActionTypes.Load_Accounts),
            switchMap(() => this.accountService.getAll()),
            handleLoadedAccounts()
        );

}

const handleLoadedAccounts = () =>
    (source: Observable<Account[]>) => source.pipe(
        map((accts: Account[]) => new UserAccountsSuccessAction({ accounts: accts })),
        catchError(error => of(new UserFailureAction({ err: 'error' })))
    );



const handleLoadedUser = () =>
    (source: Observable<User>) => source.pipe(
        map((user) => new UserSuccessAction({ user: user })),
        catchError(error => of(new UserFailureAction({ err: 'error' })))
    );
