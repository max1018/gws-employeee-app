import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerPage} from '../customer/customer';
import {NewContactBuildingPage} from '../new-contact-building/new-contact-building';
import {NewContactCustomerPage} from '../new-contact-customer/new-contact-customer'
import {NewContactBuilderPage} from '../new-contact-builder/new-contact-builder'

/**
 * Generated class for the NewContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactPage');
  }
  cancelButton(){
    this.navCtrl.setRoot(CustomerPage);
  }

  customerButton(){
    this.navCtrl.setRoot(NewContactCustomerPage)
  }
  builderButton(){
    this.navCtrl.setRoot(NewContactBuilderPage);
  }
  buildingButton(){
    this.navCtrl.setRoot(NewContactBuildingPage);
  }

}
