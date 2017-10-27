import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import { ds } from "../../app/ds.service";


/**
 * Generated class for the MarketingInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-marketing-info',
  templateUrl: 'marketing-info.html',
})
export class MarketingInfoPage {
customer: any;
profile: any = {};
newProfBool = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
this.customer = this._emp.getSelectedCustomer();
//this.profile = this._emp.getSelectedProfile();

if(this._emp.getSelectedProfile()){
  this.profile = this._emp.getSelectedProfile();
}
else{
      this.newProfBool = true;
}
console.log(this.profile);
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketingInfoPage');
  }

  saveButton(){
    
     if(this.newProfBool){
     ds['Profile'].create({
       customerID: this.customer.customerID,
       customer: this.customer,
       employment: this.profile.employment,
       church: this.profile.church,
       platt: this.profile.platt,
       pad_BW: this.profile.pad_BW,
       pad_Mailer: this.profile.pad_Mailer,
       pad_Web: this.profile.web,
       pad_PhBk: this.profile.pad_PhBk,
       pad_Ref: this.profile.pad_Ref,
       pad_Walkin: this.profile.pad_Walkin,
       pad_PrevCust: this.profile.pad_PrevCust,
       pad_Radio: this.profile.pad_Radio,
       pad_NwsPpr: this.profile.pad_NwsPpr,
       doorKnock: this.profile.doorKnock,
     }).save();
     }
     else{
       this.profile.save();
     }
     this.navCtrl.pop();
   }

}
