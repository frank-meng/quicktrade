import { Action, createAction, props, union } from '@ngrx/store';
import { Quote} from '../../models';



export enum QuoteActionTypes {
    Load = '[Quote] Load',
    Success = '[Quote] LoadSuccess',
    Failed = '[Quote] Failed to load'
  }

  
export class QuoteAction implements Action {
    readonly type = QuoteActionTypes.Load;
    constructor(public payload: {symbol: string }) {}
}


export class QuoteSuccessAction implements Action {
    readonly type = QuoteActionTypes.Success;
    constructor(public payload: { result: Quote }) {        
    }
  }
  export class QuoteFailureAction implements Action {
    readonly type = QuoteActionTypes.Failed;
    constructor(public payload: { err: string }) {        
    }
  }
  export type QuoteActions = QuoteAction | QuoteSuccessAction | QuoteFailureAction;
