import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { AppService } from '../services';
import { catchError, flatMap, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(" JwtInterceptor ");
        // add authorization header with jwt token if available

        const { url, method, headers, body } = request;
        if (url.startsWith('/api')) {
         
            //const token = localStorage.getItem('token');
            const token = this.appService.getAccessToken();

            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }else{
                console.log("  NO TOKEN");
                
                
            }

        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
           
                return this.handleRefreshToken(request, next);
            } else{
                console.log("  get other error");
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
        }))

       
        
        
    }
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
    
    private  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler){
        console.log("  401 error ");

        if ( this.isRefreshing) {
            // block calls until token is refreshed
            return this.refreshTokenSubject.pipe(
                filter( token => token != null),
                take(1),
                switchMap( (accessToken)=>{
                    request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    return next.handle(request);
                })
            )

        }else{
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.appService.refreshAccessToken()
                .pipe(flatMap( newToken=>{

                console.log("  get new  TOKEN");
                this.appService.saveToken(newToken);
                this.isRefreshing = false;

                const accessToken = this.appService.getAccessToken();
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
    /*
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
            console.log(" JwtInterceptor ");
            // add authorization header with jwt token if available
            let currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
    
            return next.handle(request);
        }
        */
}