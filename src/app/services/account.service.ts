import { Injectable, Inject } from '@angular/core';
import { API_BASE_URL } from '../app.token';
import { HttpClient } from '@angular/common/http';
import { Transaction, Account } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private _http: HttpClient) { }


  getAll(): Observable<Account[]> {
    return this._http.get<Account[]>(`${this.baseUrl}/api/accounts`);
  }


  getAccountTransactions(accountName: string): Observable<Transaction[]> {
    return this._http.get<Transaction[]>(`${this.baseUrl}/api/accttransactions/${accountName}`);
  }


}
