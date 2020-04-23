import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TradeService } from 'src/app/services';
import { pipe, Observable, EMPTY } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Quote } from 'src/app/models';

@Component({
  selector: 'qt-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent {

  symbolInput = new FormControl('');
  quote$: Observable<Quote>;

  @Output() lastQuote = new EventEmitter<Quote>();

  constructor(
    private tradeService: TradeService) {
    //option 1
    // this.symbolInput.valueChanges.                                  
    // pipe(debounceTime(800))                                     
    // .subscribe(stock => this.getQuote(stock));   

    //option 2
    
    this.quote$ = this.symbolInput.valueChanges
      .pipe(debounceTime(800))
      .pipe(switchMap(
        symbol=> this.tradeService.quote(symbol)
      ));

      this.quote$.subscribe(newQuote=>{
          console.log ("  --- "+newQuote);
          this.lastQuote.emit(newQuote);
        }, err => console.log(err)
      );
    
  }

  getQuote(symbol: string): void {
    
    this.quote$ = this.tradeService.quote(symbol);
    console.log(" checking quote " + symbol);

    this.quote$.subscribe(newQuote=>{
      console.log ("  --- "+newQuote);
      this.lastQuote.emit(newQuote)});

  }

}
