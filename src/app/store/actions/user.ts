import { Action, createAction, props, union } from '@ngrx/store';
import { User } from '../../models';



export enum UserActionTypes {
  Load = '[User] Load',
  Success = '[User] LoadSuccess',
  Failed = '[User] Failed to load'
}


export class UserAction implements Action {
  readonly type = UserActionTypes.Load;

  constructor() { }
}


export class UserSuccessAction implements Action {
  readonly type = UserActionTypes.Success;
  constructor(public payload: { result: User }) {
  }
}
export class UserFailureAction implements Action {
  readonly type = UserActionTypes.Failed;
  constructor(public payload: { err: string }) {
  }
}
export type UserActions = UserAction | UserSuccessAction | UserFailureAction;
