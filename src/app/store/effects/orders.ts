import { Injectable } from '@angular/core'; import { Observable, of } from 'rxjs';
import { OrdersActionTypes, PlaceOrderSuccessAction, OrdersFailureAction } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TradeService } from 'src/app/services';
import { Order } from '../../models';


@Injectable()
export class OrdersEffects {
    constructor(private readonly actions$: Actions,
        private tradeService: TradeService) { }

    @Effect()
    retrieveAccounts$: Observable<Action> = this.actions$
        .pipe(
            ofType(OrdersActionTypes.Place),
            switchMap((payload: any) => {
                console.log(" ------" + JSON.stringify(payload));
                return this.tradeService.placeOrder(payload.payload.order);
            }),
            handlePlaceOrder()
        );

}
const handlePlaceOrder = () =>
    (source: Observable<string>) => source.pipe(
        map((confirmation: string) => new PlaceOrderSuccessAction({ result: confirmation })),
        catchError(error => of(new OrdersFailureAction({ err: 'error' })))
    );



