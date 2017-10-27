import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import {ProfileInfoPage} from '../profile-info/profile-info';
import {MarketingInfoPage} from '../marketing-info/marketing-info';
import {CustomerGoalsPage} from '../customer-goals/customer-goals';
import {NewGoalPage} from '../new-goal/new-goal';
import {NewEventPage} from  '../new-event/new-event';
import {CustomerEventsPage} from '../customer-events/customer-events'
import {ds} from '../../app/ds.service'


/**
 * Generated class for the CustomerInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-info',
  templateUrl: 'customer-info.html',
})
export class CustomerInfoPage {
 customer: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
  this.customer = this._emp.getSelectedCustomer();
  console.log(this.customer.customerID)
  this.getGoals();
  }

  ionViewWillEnter(){
    //this.ionViewDidLoad();
  }
  ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerInfoPage');
  }

  //This are just links to take you other pages with respect to the name of the functions
  profileButton(){
    this.navCtrl.push(ProfileInfoPage);
  }
  newGoalButton(){
    this.navCtrl.push(NewGoalPage);
  }
  newEventButton(){
    this.navCtrl.push(NewEventPage);
  }
  marketingInfoButton(){
    this.navCtrl.push(MarketingInfoPage);
  }
  listEventsButton(){
    this.navCtrl.push(CustomerEventsPage);
  }
  listGoalsButton(){
    this.navCtrl.push(CustomerGoalsPage)
  }

  //This function gets the goals for our selected customer and then sends that info to Employee Service so that we may use it elsewhere
  getGoals(){
    ds['CustomerGoals'].query({
      filter: 'customerID ==:1',
      params: [this.customer.customerID],
      orderBy: ['ID']
    }).then( op =>
    {
        console.log(op['entities'])
        this._emp.setCustomerGoals(op['entities']);

    })
  }

  
}
