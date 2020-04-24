import {  OrdersActionTypes, OrdersActions } from '../actions';
import {  Order,Account } from '../../models';


export interface OrdersState {
    selectedAccount: Account,
    order: Order,
    result: string
  }


  const initState: OrdersState = {
    selectedAccount: null,
    order: null,
    result :''
  }

  export function ordersReducer( state = initState, action: OrdersActions): OrdersState {

    console.log(` loading order  ${action.type} -- ${JSON.stringify(state)}`);

    switch (action.type) {
      case OrdersActionTypes.SelectAccount: {
        return {
          ...state,
          selectedAccount: action.payload.account,
          order: null,
          result :null
        };
      }
        case OrdersActionTypes.Place: {
          return {
            ...state,
            order: action.payload.order,
            result :null
          };
        }
        case OrdersActionTypes.PlaceSuccess: {
            return {
              ...state,
              result :action.payload.result
            };
          }
        default: {
          return state;
        }
      }

  }
  export const placeOrder = (state: OrdersState) => state.result;
  export const selectAccount = (state: OrdersState) => state.selectedAccount;
