import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { catchError, flatMap, switchMap, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/reducers/user';
import { JwtToken } from '../models';
import { getTokenData, AppState } from '../store';
import { AppService } from './app.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private access_token: string;
    private token$: Observable<JwtToken>;

    constructor(private appService: AppService,
        private store: Store<AppState>) {
        this.token$ = this.store.pipe(select(getTokenData));

        this.token$.pipe(filter( t=> t!=null)).subscribe(jwtToken => {
            this.access_token = jwtToken.access_token;
        })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(" JwtInterceptor ");
        // add authorization header with jwt token if available

        const { url, method, headers, body } = request;
       // if (url.startsWith('/api')) {
        if (/\/api/.test(url)){   
            if (this.access_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
            } else {
                console.log("  NO TOKEN");
            }
        }
        return next.handle(request).pipe(catchError(
            err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api

                    return this.handleRefreshToken(request, next);
                } else {
                    console.log("  get other error");
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                }
            }
        ))

    }
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
        console.log("  401 error ");

        if (this.isRefreshing) {
            // block calls until token is refreshed
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap((accessToken) => {
                    request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    return next.handle(request);
                })
            )

        } else {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.appService.refreshAccessToken()
                .pipe(flatMap(newToken => {

                    console.log("  get new  TOKEN");

                    this.appService.saveToken(newToken);
                    this.isRefreshing = false;

                    const accessToken = newToken.access_token;
                    this.refreshTokenSubject.next(accessToken);

                    request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    return next.handle(request);
                }
                ));
        }

    }
}