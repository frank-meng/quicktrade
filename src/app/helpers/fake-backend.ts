import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Account, Quote } from '../models';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log ("FakeBackendInterceptor");

        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api2/orders') && method === 'POST':
                    return bid();
                
                case url.endsWith('/api2/accounts') && method === 'GET':
                    return getAccounts();
                case url.startsWith ('/api2/quote') && method === 'GET':
                        return getQuote();    
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            let user = users.find(x => x.username === username && x.password === password);
            if (!user) {
                user = body;
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                user.firstName = "John";
                user.lastName = "Doe";

                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
            }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }
        function bid() {
            console.log ("Interceptor  -  bid");
            return ok({
                id: 12345
            })
        }

        function getAccounts() {
          //  if (!isLoggedIn()) return unauthorized();
          const accounts = [new Account("RD57B","CASH"), new Account("BN6776d","RRSP")];

          console.log ("Interceptor  -  getAccounts");

            return ok(accounts);
        }
        function getQuote() {  
            console.log ("Interceptor  -  getQuote");
            const quote = new Quote("AAPL",123.5);

            return ok(quote);
          }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}
