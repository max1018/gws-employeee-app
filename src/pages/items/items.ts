import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../app/employee.service";
import { ds } from "../../app/ds.service";

/**
 * Generated class for the ItemsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
itemArr:any;
equipmentArray:any;
customer:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private emp: Employee) {
    this.customer = this.emp.getSelectedCustomer();
    this.itemArr = this.emp.getCurrentCustomerItems;
    this.equipmentArray = this.emp.getCurrentCustomerEquipment;
  

    console.log(this.customer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }
  ionViewCanEnter(){
    ds['Product'].query({
      filter: 'subTitle ==:1',
      params: ['Service']
    }).then(
      op => {
        console.log(op['entities']);
      }
    )
  }
}
