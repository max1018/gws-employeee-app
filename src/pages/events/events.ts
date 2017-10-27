import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../app/employee.service";
import {ds} from '../../app/ds.service'

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
customerID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private emp: Employee) {
    this.customerID = this.emp.getSelectedCustomer().customerID;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  getMyEvents(){
    ds['CustomerEvents'].query({
      select: ['eventType', 'customer'],
      filter: 'customerID =:1',
      params: [this.customerID],
      orderBy: ['dateExpected']
    }).then( op =>
    {
      console.log(op)
    }
    )

    
  }
}
