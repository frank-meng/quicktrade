import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({ providedIn: 'root' })
export class OAuthGuard implements CanActivate{
    
    constructor(
        private router: Router,
        private appService: AppService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean  {

        console.log( "  OAuthGuard ");

        if (this.appService.checkCredentials()){
            return true;
        }
        console.log( "  OAuthGuard -- false");

        this.router.navigate(['/signin'], {queryParams: {returnUrl: state.url}});
     //  this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});

        return false;

    }



}