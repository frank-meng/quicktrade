import { OrdersActionTypes, OrdersActions } from '../actions';
import { Order, Account, Quote } from '../../models';


export interface OrdersState {
  selectedAccount: Account,

  //for quote
  symbol: string,
  quote: Quote,

  //for order
  order: Order,
  confirmation: string
}


const initState: OrdersState = {
  selectedAccount: null,
  symbol: null,
  quote: null,

  order: null,
  confirmation: null
}

export function ordersReducer(state = initState, action: OrdersActions): OrdersState {

  console.log(` loading order  ${action.type} -- ${JSON.stringify(state)}`);

  switch (action.type) {
    case OrdersActionTypes.SelectAccount: {
      // reset everything if account changes
      return {
        ...state,
        selectedAccount: action.payload.account,
        symbol: null,
        quote: null,
        order: null,
        confirmation: null
      };
    }
    case OrdersActionTypes.LoadQuote: {
      return {
        ...state,
        symbol: action.payload.symbol,
        quote: null,
        order: null,
        confirmation :null
      };
    }
    case OrdersActionTypes.LoadQuoteSuccess: {
        return {
          ...state,
          quote :action.payload.quote,
          order: null,
          confirmation :null
        };
      }
    case OrdersActionTypes.Place: {
      return {
        ...state,
        order: action.payload.order,
        confirmation: null
      };
    }
    case OrdersActionTypes.PlaceSuccess: {
      return {
        ...state,
        confirmation: action.payload.confirmation
      };
    }
    default: {
      return state;
    }
  }

}
export const placeOrder = (state: OrdersState) => state.confirmation;
export const selectAccount = (state: OrdersState) => state.selectedAccount;
export const getQuote = (state: OrdersState) => state.quote;
