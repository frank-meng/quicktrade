import { User, JwtToken } from '../../models';
import { UserActions, UserActionTypes } from '../actions/user';
import {Account} from '../../models';


export interface UserState {
  token: JwtToken,
  user: User,
  accounts: Account[],
}


const initState: UserState = {
  token: null,
  user: null,
  accounts: [],
}

export function userReducer(state = initState, action: UserActions): UserState {

 // console.log(` loading user  ${action.type} -- ${JSON.stringify(state)}`);

  switch (action.type) {
    case UserActionTypes.Set_Token: {
      return {
        ...state,
        token: action.payload.token,
        user: null
      };
    }
    case UserActionTypes.Remove_Token: {
      return {
        ...state,
        token: null,
        user: null
      };
    }
    case UserActionTypes.Load_User: {
      return {
        ...state,
        user: null
      };
    }
    case UserActionTypes.Load_User_Success: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    case UserActionTypes.Load_Accounts: {
      return {
        ...state,
        accounts :[]
      };
    }
    case UserActionTypes.Load_Accounts_Success: {
        return {
          ...state,
          accounts :action.payload.accounts
        };
      }
    
    default: {
      return state;
    }
  }

}
export const getUser = (state: UserState) => state.user;
export const getJwtToken = (state: UserState) => { 
  console.log( "  get jwttoken " + state);
  return state?  state.token: null;
  //return state.token;
}
export const getAccounts = (state: UserState) => state.accounts;
