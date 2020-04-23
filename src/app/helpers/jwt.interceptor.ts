import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AppService } from '../services';
import { catchError, flatMap } from 'rxjs/operators';

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
                console.log("  401 error ");
                return this.appService.refreshAccessToken()
                    .pipe(flatMap( newToken=>{

                        console.log("  get new  TOKEN");
                        this.appService.saveToken(newToken);

                        const aToken = this.appService.getAccessToken();

                        request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${aToken}`
                            }
                        });
                        return next.handle(request);
                    }
                ));

            } else{
                console.log("  get other error");
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
        }))
        
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