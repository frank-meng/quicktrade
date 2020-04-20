import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent , LoginComponent, HomeComponent, TradeComponent } from './components';
import { AuthGuard } from './helpers';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account/:accountName', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'trade/:accountName', component: TradeComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
