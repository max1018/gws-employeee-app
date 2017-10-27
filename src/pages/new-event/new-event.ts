import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import {NewGoalPage} from '../new-goal/new-goal';
import { ds } from "../../app/ds.service";
import { TabsPage } from "../tabs/tabs";


/**
 * Generated class for the NewEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  customer: any;
  customerGoals: any;
  selectedGoal: any;
  eventList: any = [];
  dept: String;
  div:any;
  selectedEvent: any;
  dateExpected = new Date()
  notes: any;
  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, private _emp: Employee, private _alert:AlertController) {
    this.customer = this._emp.getSelectedCustomer();
    this.customerGoals = this._emp.getCustomerGoals();
    console.log(this.customerGoals)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }

  newGoalButton(){
    this.navCtrl.push(NewGoalPage);
   // this.navCtrl.pop()
  }

  selectGoal(item){
    this.selectedGoal = item;
  }

  getEventTypes() {
    this.setDeptandDiv();
    ds.EventList.query({
        filter: 'division == :1 and dept == :2',
        params: [this.div, this.dept]
    }).then(res => {
        console.log(res);
        this.eventList = res.entities;
    });
}
setDeptandDiv(){
  console.log(this.dept)
  switch (this.dept) {
    case 'SSR':
        this.div = 'Equipment';
        this.dept = 'SSR';
        break;
    case 'CSR':
        this.div = 'Company';
        this.dept = 'CSR';
        break;
    case 'BWS':
        this.div = 'BottledWater';
        this.dept = 'Sales';
        break;
    case 'SS':
        this.div = 'Equipment';
        this.dept = 'Sales';
        break;
    case 'RSR':
        this.div = 'BottledWater';
        this.dept = 'RSR';
        break;
}
console.log(this.div)
}

selectEvent(item){
  this.selectedEvent = item;
console.log(item)
}

createEvent(){
  let alert =this._alert.create({
    title: 'Successful',
    subTitle: 'Your event has been created',
    buttons: ['Ok'],
    
  })
  let event = ds['CustomerEvents'].create({
    notes: this.notes,
    dateEntered: new Date(),
    dateExpected: new Date(),
    customerID: this.customer.customerID,
    eventGuide: this._emp.getEmployee()[2],
    eventType: this.selectedEvent,
    goal: this.selectedGoal,
    complete: false,
    customer: this.customer
  });

  console.log(event.save());
  this.app.getRootNav().setRoot(TabsPage)}

}

