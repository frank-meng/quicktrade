import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Account, Quote, Order } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { TradeService } from 'src/app/services';
import { Store, select } from '@ngrx/store';
import { QuoteState } from 'src/app/store/reducers/quote';
import { getQuoteData, getPlaceOrderData, PlaceOrderAction, getSelectedAccountData } from 'src/app/store';

@Component({
  selector: 'qt-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})


export class TradeComponent {
  readonly tradeForm: FormGroup;
  result$: Observable<string>;
  quote$: Observable<Quote>;
  selectedAccount$: Observable<Account>;
  
  private selectedAccountName: string;

  selectedSymbol: string;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<QuoteState>) {

    /*  
    route.paramMap.subscribe(
      params => this.accountName = params.get('accountName')
    );
    */

    this.tradeForm = fb.group({
      bidPrice: [, Validators.min(0)],
      nos: [, Validators.min(0)],
      isBuy: [, Validators.maxLength(2)]
    });
    this.quote$ = this.store.pipe(select(getQuoteData));

    this.result$ = this.store.pipe(select(getPlaceOrderData));

    this.selectedAccount$ = this.store.pipe(select(getSelectedAccountData));

    this.selectedAccount$.subscribe ( a=> this.selectedAccountName = a.name);
  }

  onOrder(): void {
    if (this.tradeForm.valid) {
      const bidPrice = this.tradeForm.controls['bidPrice'].value;
      const nos = this.tradeForm.controls['nos'].value;
      //const isBuy = this.tradeForm.controls['isBuy'].value;
      const isBuy = true;

      const order = new Order(this.selectedSymbol, nos, isBuy, bidPrice,this.selectedAccountName);
      this.store.dispatch(new PlaceOrderAction({order: order}));

    }
  }

}


