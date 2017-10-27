import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerPage} from '../customer/customer';
/**
 * Generated class for the NewContactBuildingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-contact-building',
  templateUrl: 'new-contact-building.html',
})
export class NewContactBuildingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactBuildingPage');
  }
  cancelButton(){
    this.navCtrl.setRoot(CustomerPage);
  }


}
