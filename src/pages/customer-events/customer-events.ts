import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import {ds} from '../../app/ds.service'

/**
 * Generated class for the CustomerEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-events',
  templateUrl: 'customer-events.html',
})
export class CustomerEventsPage {
customer: any;
events: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
    this.customer = this._emp.getSelectedCustomer(); //Employee Service is used to get that selected customer 
    this.getMyEvents();
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerEventsPage');
  }

  //This function just does a query on the customer and returns any events that customer has
  getMyEvents(){
    ds['CustomerEvents'].query({
      select: ['eventType', 'customer'],
      filter: 'customerID =:1',
      params: [this.customer.customerID],
      orderBy: ['dateExpected']
    }).then( op =>
    {
      console.log(op['entities'])
      this.events = op['entities']
    }
    )

    
  }
}
