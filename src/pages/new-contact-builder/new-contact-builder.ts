import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerPage} from '../customer/customer';
/**
 * Generated class for the NewContactBuilderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-contact-builder',
  templateUrl: 'new-contact-builder.html',
})
export class NewContactBuilderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactBuilderPage');
  }
  cancelButton(){
    this.navCtrl.setRoot(CustomerPage);
  }


}
