import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../app/employee.service";

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
driverArray:any;
  constructor(private emp: Employee, public navCtrl: NavController, public navParams: NavParams) {
  this.driverArray = this.emp.getDriverRouteArray();
  console.log(this.driverArray)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  backButton(){
    this.navCtrl.pop();
  }
}
