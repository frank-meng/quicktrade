import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(" JwtInterceptor ");
        // add authorization header with jwt token if available

        const { url, method, headers, body } = request;
        if (url.startsWith('/api')) {
         
            const token = localStorage.getItem('token');
            if (this.appService.checkCredentials) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

        }


        return next.handle(request);
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