import { Action, createAction, props, union } from '@ngrx/store';
import { Order,Account, Quote} from '../../models';



export enum OrdersActionTypes {
    SelectAccount = '[Orders] Select Account',

    LoadQuote = '[Quote] Load',
    LoadQuoteSuccess = '[Quote] LoadSuccess',

    Place = '[Orders] Place',
    PlaceSuccess = '[Orders] PlaceSuccess',
    Failed = '[Orders] Failed to load'
  }
export class SelectAccountAction implements Action {
    readonly type = OrdersActionTypes.SelectAccount;
    constructor(public payload: { account: Account}) {}
}
  
export class QuoteAction implements Action {
  readonly type = OrdersActionTypes.LoadQuote;
  constructor(public payload: {symbol: string }) {}
}


export class QuoteSuccessAction implements Action {
  readonly type = OrdersActionTypes.LoadQuoteSuccess;
  constructor(public payload: { quote: Quote }) {        
  }
}

export class PlaceOrderAction implements Action {
    readonly type = OrdersActionTypes.Place;
    constructor(public payload: { order: Order}) {}
}


export class PlaceOrderSuccessAction implements Action {
    readonly type = OrdersActionTypes.PlaceSuccess;
    constructor(public payload: { confirmation: string }) {        
    }
  }
  export class OrdersFailureAction implements Action {
    readonly type = OrdersActionTypes.Failed;
    constructor(public payload: { err: string }) {        
    }
  }
  export type OrdersActions = SelectAccountAction | QuoteAction | QuoteSuccessAction | PlaceOrderAction | PlaceOrderSuccessAction | OrdersFailureAction;
