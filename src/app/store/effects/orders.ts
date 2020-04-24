import { Injectable } from '@angular/core'; import { Observable, of } from 'rxjs';
import { OrdersActionTypes, PlaceOrderSuccessAction, OrdersFailureAction, QuoteSuccessAction } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TradeService } from 'src/app/services';
import { Order, Quote } from '../../models';


@Injectable()
export class OrdersEffects {
    constructor(private readonly actions$: Actions,
        private tradeService: TradeService) { }

    @Effect()
    placeOrder$: Observable<Action> = this.actions$
        .pipe(
            ofType(OrdersActionTypes.Place),
            switchMap((payload: any) => {
                console.log(" ------" + JSON.stringify(payload));
                return this.tradeService.placeOrder(payload.payload.order);
            }),
            handlePlaceOrder()
        );

    @Effect()
    getQuote$: Observable<Action> = this.actions$
        .pipe(
            ofType(OrdersActionTypes.LoadQuote),
            switchMap((payload: any) => {
                console.log(" ------" + JSON.stringify(payload));
                return this.tradeService.quote(payload.payload.symbol);
            }),
            handleLoadedQuote()
        );

}
const handlePlaceOrder = () =>
    (source: Observable<string>) => source.pipe(
        map((confirmation: string) => new PlaceOrderSuccessAction({ confirmation: confirmation })),
        catchError(error => of(new OrdersFailureAction({ err: 'error' })))
    );
const handleLoadedQuote = () =>
    (source: Observable<Quote>) => source.pipe(
        map((quote: Quote) => new QuoteSuccessAction({ quote: quote })),
        catchError(error => of(new OrdersFailureAction({ err: 'error' })))
    );



