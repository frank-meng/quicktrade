

import * as fromAccounts from './accounts';
import * as fromUser from './user';
import * as fromQuote from './quote';
import * as fromOrders from './orders';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    accounts: fromAccounts.AccountsState;
    user: fromUser.UserState;
    quote: fromQuote.QuoteState;
    orders: fromOrders.OrdersState;

  }
  
  export const reducers = {
    accounts: fromAccounts.acountsReducer,
    user: fromUser.userReducer,
    quote: fromQuote.quoteReducer,
    orders: fromOrders.ordersReducer

  };
  
  export const getAccountsState = createFeatureSelector<fromAccounts.AccountsState>('accounts');
  export const getAccountsData = createSelector(getAccountsState, fromAccounts.getResults);
  
  
  export const getUserState = createFeatureSelector<fromUser.UserState>('user');
  export const getUserData = createSelector(getUserState, fromUser.getUser);

  export const getQuoteState = createFeatureSelector<fromQuote.QuoteState>('quote');
  export const getQuoteData = createSelector(getQuoteState, fromQuote.getQuote);

  export const getSelectedAccountState = createFeatureSelector<fromOrders.OrdersState>('orders');
  export const getSelectedAccountData = createSelector(getSelectedAccountState, fromOrders.selectAccount);

  export const getOrdersState = createFeatureSelector<fromOrders.OrdersState>('orders');
  export const getPlaceOrderData = createSelector(getOrdersState, fromOrders.placeOrder);