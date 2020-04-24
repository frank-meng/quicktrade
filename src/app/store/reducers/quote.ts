import { QuoteActions, QuoteActionTypes } from '../actions';
import { Quote} from '../../models';


export interface QuoteState {
    symbol: string,
    result: Quote
  }


  const initState: QuoteState = {
    symbol: '',
    result :null
  }

  export function quoteReducer( state = initState, action: QuoteActions): QuoteState {

    console.log(` loading quote  ${action.type} -- ${JSON.stringify(state)}`);

    switch (action.type) {
        case QuoteActionTypes.Load: {
          return {
            ...state,
            symbol: action.payload.symbol,
            result :null
          };
        }
        case QuoteActionTypes.Success: {
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
  export const getQuote = (state: QuoteState) => state.result;
