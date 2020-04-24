import { UserActionTypes, UserSuccessAction, AccountsFailureAction } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AccountService } from 'src/app/services';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { User } from 'src/app/models';
import { Action } from '@ngrx/store';


@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions,
        private accountService: AccountService) { }

    @Effect()
    retrieveUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionTypes.Load),
        switchMap(() => this.accountService.retrieveUser()),
        handleLoadedUser()
    );

}
const handleLoadedUser = () => 
(source:  Observable<User>) => source.pipe(
    map( (user) => new UserSuccessAction({ result: user })),
    catchError(error => of(new AccountsFailureAction({ err: 'error' })))
);
