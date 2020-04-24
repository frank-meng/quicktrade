import { Action, createAction, props, union } from '@ngrx/store';
import {Account} from '../../models';



export enum AccountsActionTypes {
    Load = '[Accounts] Load',
    Success = '[Accounts] LoadSuccess',
    Failed = '[Accounts] Failed to load'
  }

  
export class AccountsAction implements Action {
    readonly type = AccountsActionTypes.Load;

    constructor() {}
}


export class AccountsSuccessAction implements Action {
    readonly type = AccountsActionTypes.Success;
    constructor(public payload: { results: Account[] }) {        
    }
  }
  export class AccountsFailureAction implements Action {
    readonly type = AccountsActionTypes.Failed;
    constructor(public payload: { err: string }) {        
    }
  }
  export type AccountsActions = AccountsAction | AccountsSuccessAction |AccountsFailureAction;
