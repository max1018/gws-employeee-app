import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkordertableService } from "../../app/workordertable.service";
import { Wakanda } from "../../app/wakanda.service";

/**
 * Generated class for the EmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage{



  driverName : any ;
  selectedCustomerInformation : any = new Object();
  selectedOrderNumber : any;
  workOrderInfoOfSelectedCustomer : any;

  constructor(public wakanda : Wakanda,public navCtrl: NavController, public navParams: NavParams,private workservice: WorkordertableService) {
  }

// to load the content of the users 
  ionViewDidLoad() {
    this.driverName = this.workservice.getDriverName();
    this.selectedCustomerInformation = this.workservice.getSelectedCustomerInformation();
    this.selectedOrderNumber = this.workservice.getSelectedOrderNumber();
    this.workOrderInfoOfSelectedCustomer = this.workservice.getworkOrderInfoOfSelectedCustomer();
  }

  sendEmail(val) {
    this.wakanda.catalog.then((ds:any)=>{
    ds['SvrMethods'].sendEmail(this.selectedCustomerInformation['email'], val.message, this.driverName, this.selectedOrderNumber,
          this.workOrderInfoOfSelectedCustomer['customerID']).then(op => {
         this.navCtrl.pop();   
      });
      });
  }

}
