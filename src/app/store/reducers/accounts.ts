import { AccountsActions, AccountsActionTypes } from '../actions';
import {Account} from '../../models';


export interface AccountsState {
    results: Account[];
  }


  const initState: AccountsState = {
      results :[]
  }

  export function acountsReducer( state = initState, action: AccountsActions): AccountsState {

    console.log(` loading accounts  ${action.type} -- ${JSON.stringify(state)}`);

    switch (action.type) {
        case AccountsActionTypes.Load: {
          return {
            ...state,
            results :[]
          };
        }
        case AccountsActionTypes.Success: {
            return {
              ...state,
              results :action.payload.results
            };
          }
        default: {
          return state;
        }
      }

  }
  export const getResults = (state: AccountsState) => state.results;
