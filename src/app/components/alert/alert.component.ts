import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import {AlertService} from '../../services';

@Component({
  selector: 'trd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe( message =>{
      
      this.message = message;

    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
