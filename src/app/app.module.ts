import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AccountComponent, SigninComponent, PostloginComponent, HomeComponent, 
  AccountgridComponent, QuoteComponent, ProcessOrderComponent, OrderComponent } from './components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_BASE_URL, AUTH_URL, WEB_BASE_URL } from './apptokens';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { AppService } from './shared/app.service';
import { UserEffects } from './store/effects/user';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { OrdersEffects } from './store/effects';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AccountgridComponent,
    SigninComponent,
    PostloginComponent,
    QuoteComponent,
    ProcessOrderComponent,
    OrderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,

    ReactiveFormsModule,
    
    RouterModule.forRoot(routes),

    StoreModule.forRoot(reducers),

    //StoreModule.forRoot({ ...reducers, router: routerReducer }),
    //StoreRouterConnectingModule.forRoot({
    //  stateKey: 'router'
    //}),

    StoreDevtoolsModule.instrument({
      name: ' DevTools',
     // logOnly: environment.production
    }),

    EffectsModule.forRoot([UserEffects, OrdersEffects]),
  ],
  providers: [AppService,
    // {provide: APP_BASE_HREF, useValue: '/quicktrade'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: WEB_BASE_URL, useValue: environment.webBaseUrl },
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: AUTH_URL, useValue: environment.authUrl }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
