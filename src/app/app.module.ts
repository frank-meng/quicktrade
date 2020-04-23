import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule } from '@angular/material/select';
import {CookieService} from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent,SigninComponent, LoginComponent, PostloginComponent, AlertComponent,HomeComponent,AccountgridComponent, QuoteComponent, TradeComponent} from './components';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_BASE_URL, AUTH_URL } from './app.token';

import { JwtInterceptor,FakeBackendInterceptor } from './helpers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    AlertComponent,
    AccountgridComponent,
    TradeComponent,
    QuoteComponent,
    SigninComponent,
    PostloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [CookieService,
    {provide: APP_BASE_HREF, useValue: '/quicktrade'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },

    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: AUTH_URL, useValue: environment.authUrl}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
