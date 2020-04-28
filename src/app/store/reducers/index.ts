

import * as fromUser from './user';
import * as fromOrders from './orders';

import { createFeatureSelector, createSelector, compose, combineReducers, ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: any;
  orders: any;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer,
  orders: fromOrders.ordersReducer
};


//export const selectHomePage = createFeatureSelector<AppState, FeatureState>('homePage');
export const getUserState = (state: AppState) => state.user;

//export const getUserState = createFeatureSelector<AppState, fromUser.UserState>('homePage');

export const getTokenData = createSelector(getUserState, fromUser.getJwtToken);
export const getUserData = createSelector(getUserState, fromUser.getUser);

export const getAccountsData = createSelector(getUserState, fromUser.getAccounts);


export const getOrdersState = (state: AppState) => state.orders;

export const getQuoteData = createSelector(getOrdersState, fromOrders.getQuote);
export const getSelectedAccountData = createSelector(getOrdersState, fromOrders.selectAccount);
export const getPlaceOrderData = createSelector(getOrdersState, fromOrders.placeOrder);


/*
export function createReducer(asyncReducers = {}): ActionReducer<any> {
  return combineReducers(Object.assign({
    auth: authReducer,
    user: userReducer,
    // any other reducers you always want to be available
  }, asyncReducers));
}

export const appReducer = createReducer();
*/