import { Action } from '@ngrx/store';
import { User, JwtToken } from '../../models';


export enum UserActionTypes {

  Set_Token = '[User] Set token',
  Remove_Token = '[User] Remove Token',

  Load_User = '[User] Load',
  Load_User_Success = '[User] LoadSuccess',
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
export class UserFailureAction implements Action {
  readonly type = UserActionTypes.Failed;
  constructor(public payload: { err: string }) {
  }
}
export type UserActions = SetTokenAction | RemoveTokenAction | UserAction | UserSuccessAction | UserFailureAction;
