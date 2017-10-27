import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import { ds } from "../../app/ds.service";
import {NewEventPage} from '../new-event/new-event';
import {CustomerInfoPage} from '../customer-info/customer-info'



/**
 * Generated class for the NewGoalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-goal',
  templateUrl: 'new-goal.html',
  //providers: [CustomerInfoPage]
})
export class NewGoalPage {
employee: any;
customer: any;
customerGoals: any;
selectedGoalType: any;
newGoalType: any;
newGTName: any = '';
newGTDesc: any;
newGTDep: any;
newGoalBool = false;
goalTypes: any;
dept: any;
constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
  this.employee = this._emp.getEmployee();
  this.customer = this._emp.getSelectedCustomer();
  this.customerGoals = this._emp.getCustomerGoals();
  this.queryGoalTypes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGoalPage');
  }

  selectGoalType(item){
    this.selectedGoalType = item;
    //console.log(item.goalName)
    this.newGTName = item.typeName;
  }
  
  goalName(){
    let goalTypeEl = document.getElementById('GT');
    let gtdisabled;
    if(this.newGTName !== '' ){
      console.log(goalTypeEl.attributes);
    }
  }

  confirmButton(){
    //console.log(this.employee)
    if(this.newGoalBool){
      this.newGoalType.typeName = this.selectedGoalType; 
      this.newGoalType.save();   
      let goal = ds.CustomerGoals.create({
        goalName: this.newGTName,
        goalDescription: this.newGTDep,
        goalGuide: this._emp.getEmployee()[2],
        active: true,
        customerID: this.customer.customerID,
        customer: this.customer,
        goalType: this.selectedGoalType
      })
      goal.save();  
    }
    else{
      let goal = ds.CustomerGoals.create({
        goalName: this.newGTName,
        goalDescription: this.newGTDep,
        goalGuide: this._emp.getEmployee()[2],
        active: true,
        customerID: this.customer.customerID,
        customer: this.customer,
        goalType: this.selectedGoalType
      })
      goal.save();
    }
     this.navCtrl.setRoot(CustomerInfoPage);
    // this.room2.navCtrl.push(NewEventPage)
    
  }
  newGoalButton(){
    this.newGoalBool = true;
    this.newGoalType = ds.GoalType.create();
  }
  queryGoalTypes(){
    ds['GoalType'].query({
        filter: 'ID > :1',
        params: [0]
    }).then( op =>{
        console.log('Printing goal types from query');
        console.log(op['entities']);
        this.goalTypes = op['entities'];
    }
    
    )
}



  

}
