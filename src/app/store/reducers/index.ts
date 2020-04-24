

import * as fromAccounts from './accounts';
import * as fromUser from './user';
import * as fromOrders from './orders';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    accounts: fromAccounts.AccountsState;
    user: fromUser.UserState;
    orders: fromOrders.OrdersState;

  }
  
  export const reducers = {
    accounts: fromAccounts.acountsReducer,
    user: fromUser.userReducer,
    orders: fromOrders.ordersReducer

  };
  
  export const getAccountsState = createFeatureSelector<fromAccounts.AccountsState>('accounts');
  export const getAccountsData = createSelector(getAccountsState, fromAccounts.getResults);
  
  
  export const getUserState = createFeatureSelector<fromUser.UserState>('user');
  export const getTokenData = createSelector(getUserState, fromUser.getJwtToken);
  export const getUserData = createSelector(getUserState, fromUser.getUser);


  export const getQuoteState = createFeatureSelector<fromOrders.OrdersState>('orders');
  export const getQuoteData = createSelector(getQuoteState, fromOrders.getQuote);

  export const getSelectedAccountState = createFeatureSelector<fromOrders.OrdersState>('orders');
  export const getSelectedAccountData = createSelector(getSelectedAccountState, fromOrders.selectAccount);

  export const getOrdersState = createFeatureSelector<fromOrders.OrdersState>('orders');
  export const getPlaceOrderData = createSelector(getOrdersState, fromOrders.placeOrder);