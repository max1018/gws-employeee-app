import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';

/**
 * Generated class for the CustomerGoalsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-goals',
  templateUrl: 'customer-goals.html',
})
export class CustomerGoalsPage {
customer: any;
goals:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
    this.customer = this._emp.getSelectedCustomer();  //Employee Service is used to get the selected customer 

    this.goals = this._emp.getCustomerGoals();        //The query for the goal has already been done before we get to this page
                                                      //and now we just use Employee Service to get them
    console.log(this.goals)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerGoalsPage');
  }

}
