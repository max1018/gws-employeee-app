import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import {CustomerPage} from '../customer/customer';
import { ds } from "../../app/ds.service";
import { Employee } from "../../app/employee.service";
import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";

/**
 * Generated class for the NewContactCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-contact-customer',
  templateUrl: 'new-contact-customer.html',
})
export class NewContactCustomerPage {
first: any;
last: any;
address: any;
city: any;
state: any = 'MI';
zip: any;
homeNum:any;
workNum: any;
cellNum:any;
email: any;
cName: any;
cType:any = 'CTC';
cAction: any;
region: any;
employee: any;
contactID: any;
contact: any;
  constructor(
    private _alert:AlertController,
     private _emp: Employee,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private alert: AlertController, 
      private app: App,
    ) {

  this.employee = this._emp.getEmployee();
  console.log(this.employee)
  }
  //today = Date();
  ionViewDidLoad() {
   // console.log(this.today)
    console.log('ionViewDidLoad NewContactCustomerPage');
  }
  cancelButton(){
    this.navCtrl.setRoot(CustomerPage);
  }

  confirmButton(){
    let alert = this._alert.create({
      title: 'Successful',
      subTitle: 'You added a new contact',
      buttons: ['Ok']
    })
    
    console.log(this.employee);
    ds.Customer.contactMakeone(this.employee[2],this.employee[1],this.employee[2]).then(
      customer =>{
        this.contactID = customer;
        ds.Customer.find(this.contactID).then(
          customer1 =>{
            this.contact = customer1;
            console.log(this.contact);
            this.saveContact();
            alert.present();
            this.app.getRootNav().setRoot(TabsPage)
          }
        )
      }
    )
  }

  saveContact(){
    let today =  new Date();
    console.log(today)
    this.contact.firstName = this.first;
    this.contact.lastName = this.last;
    this.contact.address = this.address;
    this.contact.city = this.city;
    this.contact.state = "MI";
    this.contact.zip = this.zip;
    this.contact.phone = this.homeNum;
    this.contact.workPhone = this.workNum;
    this.contact.cellPhone = this.cellNum;
    this.contact.email = this.email;
    this.contact.contactName = this.cName;
    this.contact.contactType = this.cType;
    this.contact.contactAction = this.cAction;
    this.contact.region = this.region;
    this.contact.contactDate =  today;
    this.contact.contactNext = today;
    console.log(this.contact.contactDate)
    if (this.contact._stamp == 0) {
      this.contact._stamp = 1;
  }
    this.contact.save().catch((err) => {
      console.warn(err);
  });
  }

}
