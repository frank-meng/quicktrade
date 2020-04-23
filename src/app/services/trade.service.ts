import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.token';

import { Order, Quote } from '../models';
import { Observable, of, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TradeService {
  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient) { }

  quote(symbol: string): Observable<any> {
    return this.http.get<Quote>(`${this.baseUrl}/api/stocks/${symbol}`)
      .pipe(catchError(err => {
        console.log( err);
        console.log(`symbol ${symbol} not found`);
        return empty()
        
      }));
    // const quote: Quote = new Quote("AAPL", 145.9);

    //return of (quote);
  }

  placeOrder(order: Order): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/api/orders`, order)
      .pipe(map(id => {
        console.log(`bid retured ${id}`);
       // this.currentUserSubject.next(user);
      return id;
    }));;
  }

  checkOrderStatus(orderId: number) {
    return this.http.get(`${this.baseUrl}/api/orders/${orderId}`);
  }
}
