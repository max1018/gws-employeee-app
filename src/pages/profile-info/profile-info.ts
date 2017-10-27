import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service';
import {ds} from '../../app/ds.service'

/**
 * Generated class for the ProfileInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-info',
  templateUrl: 'profile-info.html',
})
export class ProfileInfoPage {
 customer: any;
 profile: any = {};
 newProfBool = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
    this.customer = this._emp.getSelectedCustomer();
    if(this._emp.getSelectedProfile()){
      this.profile = this._emp.getSelectedProfile();
    }
    else{
          this.newProfBool = true;
    }
    console.log(this.profile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileInfoPage');
  }

  saveButton(){
   
    if(this.newProfBool){
    ds['Profile'].create({
      customerID: this.customer.customerID,
      customer: this.customer,
      homeORbusiness: this.profile.homeORbusiness,
      hardness: this.profile.hardness,
      iron: this.profile.iron,
      odor: this.profile.odor,
      equip_Installed: this.profile.equip_Installed,
      origin: this.profile.origin,
      numUsers: this.profile.numUsers,
      comment: this.profile.comment,
      drinkingWater: this.profile.drinkingWater,
      chlorine: this.profile.chlorine,
      tds: this.profile.tds,
      tannin: this.profile.tannin,
      nitrate: this.profile.nitrate,
      other: this.profile.other,
      city_well: this.profile.city_well,
      equipReplcd: this.profile.equipReplcd,
      currentSupplier: this.profile.currentSupplier,
      residential: this.profile.residential,
    }).save();
    }
    else{
      this.profile.save();
    }
    this.navCtrl.pop();
  }
}
