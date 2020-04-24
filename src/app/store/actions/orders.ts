import { Action, createAction, props, union } from '@ngrx/store';
import { Order,Account} from '../../models';



export enum OrdersActionTypes {
    SelectAccount = '[Orders] Select Account',

    Place = '[Orders] Place',
    PlaceSuccess = '[Orders] PlaceSuccess',
    Failed = '[Orders] Failed to load'
  }
export class SelectAccountAction implements Action {
    readonly type = OrdersActionTypes.SelectAccount;
    constructor(public payload: { account: Account}) {}
}
  
export class PlaceOrderAction implements Action {
    readonly type = OrdersActionTypes.Place;
    constructor(public payload: { order: Order}) {}
}


export class PlaceOrderSuccessAction implements Action {
    readonly type = OrdersActionTypes.PlaceSuccess;
    constructor(public payload: { result: string }) {        
    }
  }
  export class OrdersFailureAction implements Action {
    readonly type = OrdersActionTypes.Failed;
    constructor(public payload: { err: string }) {        
    }
  }
  export type OrdersActions = SelectAccountAction | PlaceOrderAction | PlaceOrderSuccessAction | OrdersFailureAction;
