import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Quote } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { getQuoteData, QuoteAction } from 'src/app/store';
import { OrdersState } from 'src/app/store/reducers/orders';

@Component({
  selector: 'qt-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {

  symbolInput = new FormControl('');
  quote$: Observable<Quote>;

  //@Output() lastQuote = new EventEmitter<Quote>();

  constructor(
    private store: Store<OrdersState>
  ) {
    this.quote$ = this.store.pipe(select(getQuoteData));

    this.symbolInput.valueChanges
      .pipe(debounceTime(800))
      .subscribe(symbol => {
        this.store.dispatch(new QuoteAction({ symbol: symbol }));
      }
      );
  }
}