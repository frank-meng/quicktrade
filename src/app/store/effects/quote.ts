import { Injectable } from '@angular/core'; import { Observable, of } from 'rxjs';
import { QuoteActionTypes, QuoteSuccessAction, QuoteFailureAction } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TradeService } from 'src/app/services';
import {Quote} from '../../models';


@Injectable()
export class QuoteEffects {
    constructor(private readonly actions$: Actions,
        private tradeService: TradeService) { }

    @Effect()
    retrieveAccounts$: Observable<Action> = this.actions$
        .pipe(
            ofType(QuoteActionTypes.Load),
            switchMap((payload:any) => {
                console.log(" ------"+ JSON.stringify( payload));
                return this.tradeService.quote(payload.payload.symbol);
            }),
            handleLoadedQuote()
        );
        
        }
    const handleLoadedQuote = () => 
        (source:  Observable<Quote>) => source.pipe(
            map( (quote: Quote) => new QuoteSuccessAction({ result: quote })),
            catchError(error => of(new QuoteFailureAction({ err: 'error' })))
        );

   

