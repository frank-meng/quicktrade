import {   UserActions, UserActionTypes } from '../actions';
import {User} from '../../models';


export interface UserState {
    result: User;
  }


  const initState: UserState = {
      result: null
  }

  export function userReducer( state = initState, action: UserActions): UserState {

    console.log(` loading user  ${action.type} -- ${JSON.stringify(state)}`);

    switch (action.type) {
        case UserActionTypes.Load: {
          return {
            ...state,
            result :null
          };
        }
        case UserActionTypes.Success: {
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
  export const getUser = (state: UserState) => state.result;
