import { UserActions, UserActionTypes } from '../actions';
import { User, JwtToken } from '../../models';


export interface UserState {
  token: JwtToken,
  user: User;
}


const initState: UserState = {
  token: null,
  user: null
}

export function userReducer(state = initState, action: UserActions): UserState {

  console.log(` loading user  ${action.type} -- ${JSON.stringify(state)}`);

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
    default: {
      return state;
    }
  }

}
export const getUser = (state: UserState) => state.user;
export const getJwtToken = (state: UserState) => state.token;

