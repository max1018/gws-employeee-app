import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../app/employee.service";
import { ds } from "../../app/ds.service";
import { ItemsPage } from "../items/items";
import { WoinfoPage } from "../woinfo/woinfo";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';



/**
 * Generated class for the ListSsrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-ssr',
  templateUrl: 'list-ssr.html',
})
export class ListSsrPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private emp: Employee,
    private _http: Http,
    private googlePlus: GooglePlus

  ) {
  }
  employee: any;
  ionViewDidLoad() {


    console.log('ionViewDidLoad ListSsrPage');
    this.getList();
    //this.getCalendar();

    this.googlePlus.login({})
  .then(res => console.log(res))
  .catch(err => console.error(err));
  }

  todayWOList: any;
  getList() {
    this.employee = this.emp.getEmployee();
    console.log(this.employee);

    console.log('Get List method running')
    //  let newDate = new Date(todayDate.getTime() + (24 * 60 * 60 * 1000));
    //console.log(newDate)
    let date = new Date();
    const todayDate = date.toISOString().substring(0, 10);
    // ds['WorkOrder'].query({
    // filter: 'category ==:1 & assignedTo ==:2 & dateWanted >=:3 & dateWanted <:4',
    // params: ['Service','Tommy',todayDate,newDate]
    //   }).then(op =>
    //   {
    //     console.log(op['entities']);
    //     this.todayWOList = op['entities']
    //   }
    //   )
    ds['WorkOrder'].fieldList(todayDate, todayDate, 'Wesley', 'true', false, false, 0).then(op => {
      console.log(op['entities']);
      this.todayWOList = op['entities'];
    })

  }

  onclick(item) {
    item.customer.fetch().then(op => {
      this.emp.setSelectedCustomer(op);
    })
    this.emp.setCurrentEvent(item);
    this.invcQuery(item);
    this.equipmentQuery(item);
    this.customerQuery(item);

  }

  invcQuery(item) {
    console.log(item);
    ds['InvcItem'].query({
      filter: 'orderNumber ==:1',
      params: [item.orderNumber]
    }).then(op => {
      // console.log('WO Items from List Page')
      // console.log(op['entities'])
      this.emp.setCurrentCustomerItems(op['entities'])
    })
  }

  equipmentQuery(item) {
    console.log(item.customer)
    ds['Equipment'].query({
      filter: 'customerID ==:1',
      params: [item.customerID]
    }).then(op => {
      // console.log('Equipment from List Page')
      // console.log(op['entities'])
      this.emp.setCurrentCustomerEquipment(op['entities'])
      this.navCtrl.push(WoinfoPage)
    })
  }

  customerQuery(item) {
    ds['Customer'].query({
      filter: 'customerID ==:1',
      params: [item.customerID]
    }).then(op => {
      //console.log(op['entities'][0])
      this.emp.setSelectedCustomer(op['entities'][0]);
    })
  }

  getCalendar() {

    let url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList/calendarId';
    this._http.get(url).map(res => res.json()).subscribe(
      op =>{
        console.log(op);
      }
    )
  }

}
