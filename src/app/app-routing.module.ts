import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent , HomeComponent, TradeComponent,SigninComponent, PostloginComponent } from './components';
import { OAuthGuard } from './shared/oauth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [OAuthGuard] },
  { path: 'account/:accountName', component: AccountComponent, canActivate: [OAuthGuard] },
  { path: 'trade', component: TradeComponent, canActivate: [OAuthGuard] },

  { path: 'signin', component: SigninComponent },
  { path: 'postsignin', component: PostloginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
