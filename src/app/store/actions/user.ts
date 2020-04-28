import { Action } from '@ngrx/store';
import { User, JwtToken } from '../../models';
import {Account} from '../../models';


export enum UserActionTypes {

  Set_Token = '[User] Set token',
  Remove_Token = '[User] Remove Token',

  Load_User = '[User] Load',
  Load_User_Success = '[User] LoadSuccess',

  Load_Accounts = '[User] Load_accounts',
  Load_Accounts_Success = '[User] Load_accounts Success',


  Failed = '[User] Failed to load'
}
// token actions
export class SetTokenAction implements Action {
  readonly type = UserActionTypes.Set_Token;
  constructor(public payload: { token: JwtToken}) {}
}

export class RemoveTokenAction implements Action {
  readonly type = UserActionTypes.Remove_Token;
  constructor() {}
}

export class UserAction implements Action {
  readonly type = UserActionTypes.Load_User;
  constructor() { }
}
export class UserSuccessAction implements Action {
  readonly type = UserActionTypes.Load_User_Success;
  constructor(public payload: { user: User }) {
  }
}


export class UserAccountsAction implements Action {
  readonly type = UserActionTypes.Load_Accounts;

  constructor() {}
}


export class UserAccountsSuccessAction implements Action {
  readonly type = UserActionTypes.Load_Accounts_Success;
  constructor(public payload: { accounts: Account[] }) {        
  }
}



export class UserFailureAction implements Action {
  readonly type = UserActionTypes.Failed;
  constructor(public payload: { err: string }) {
  }
}
export type UserActions = SetTokenAction | RemoveTokenAction | UserAction | UserSuccessAction | UserAccountsAction | UserAccountsSuccessAction | UserFailureAction;
