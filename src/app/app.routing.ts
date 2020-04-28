import { Routes } from '@angular/router';
import { AccountComponent , HomeComponent,SigninComponent, PostloginComponent } from './components';
import { OAuthGuard } from './shared/oauth.guard';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [OAuthGuard] },
  { path: 'account/:accountName', component: AccountComponent, canActivate: [OAuthGuard] },
  { path: 'order', component:OrderComponent , canActivate: [OAuthGuard]},

  { path: 'signin', component: SigninComponent },
  { path: 'postsignin', component: PostloginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
