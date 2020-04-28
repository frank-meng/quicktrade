import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserState } from 'src/app/store/reducers/user';
import { getUserData, AppState } from 'src/app/store';
import { UserAction } from 'src/app/store/actions/user';

@Component({
  selector: 'trd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  currentUser$: Observable<User>;
  
  constructor(
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.pipe(select(getUserData));
      
    this.store.dispatch(new UserAction());
  }

}
