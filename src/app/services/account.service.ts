import { Injectable, Inject } from '@angular/core';
import { API_BASE_URL } from '../app.token';
import { HttpClient } from '@angular/common/http';
import { User, Transaction, Account } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(@Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient) { }


  getAll(): Observable<Account[]> {
    console.log(` get all accounts `);
    //const accounts: Account[] = [new Account("RD57B","CASH", 897653,397745.9), 
    //                            new Account("BN6776d","RRSP", 3434343, 876333.86)];

    return this.http.get<Account[]>(`${this.baseUrl}/api/accounts`);
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }


  getAccountTransactions(accountName: string): Observable<Transaction[]> {
    console.log(` get  accound transactions =  ${accountName}`);
    //    return this.http.get<Product[]>('/api/products').pipe(map(products => <Product>products.find(p => p.id === productId)))
    return this.http.get<Transaction[]>(`${this.baseUrl}/api/accttransactions/${accountName}`);
  }

}
