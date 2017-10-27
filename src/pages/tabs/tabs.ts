import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { MenuPage } from '../menu/menu'
import { CustomerPage } from '../customer/customer'
import { LogoutPage } from "../logout/logout";
import { Employee } from "../../app/employee.service";
import { ListSsrPage } from "../list-ssr/list-ssr";
import { CustomerSearchPage } from "../customer-search/customer-search";
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  menuRoot = LogoutPage;
  customerRoot : any = CustomerPage;
  homeRoot : any = HomePage;



  constructor(public navCtrl: NavController, private emp: Employee) {
let employee = this.emp.getEmployee();
    console.log(employee[0])

    if(employee[0] === 'Service'){
      this.homeRoot = ListSsrPage;
      this.customerRoot = CustomerSearchPage;
    }

  }


}
