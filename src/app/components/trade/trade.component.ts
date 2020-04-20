import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Account, Quote, Order } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { TradeService } from 'src/app/services';

@Component({
  selector: 'qt-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})


export class TradeComponent {
  readonly tradeForm: FormGroup;
  result$: Observable<string>;
  quote$: Observable<Quote>;
  account: Account;
  accountName: string;

  selectedSymbol: string;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private tradeService: TradeService) {

    route.paramMap.subscribe(
      params => this.accountName = params.get('accountName')
    );

    this.tradeForm = fb.group({
      bidPrice: [, Validators.min(0)],
      nos: [, Validators.min(0)],
      isBuy: [, Validators.maxLength(2)]
    });
  }

  quoteHandler(event: Quote) {
    console.log(" receive quote event " + event);
    this.quote$ = of(event);

    this.quote$.subscribe(s => this.selectedSymbol = s.symbol);
  }

  onOrder(): void {
    if (this.tradeForm.valid) {
      const bidPrice = this.tradeForm.controls['bidPrice'].value;
      const nos = this.tradeForm.controls['nos'].value;
      //const isBuy = this.tradeForm.controls['isBuy'].value;
      const isBuy = true;

      const order = new Order(this.selectedSymbol, nos, isBuy, bidPrice,this.accountName);
      this.result$ = this.tradeService.placeOrder(order);


    }
  }

}


