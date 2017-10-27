import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { GridOptions } from "ag-grid/main";
import { WorkordertableService } from "../../app/workordertable.service";
import { Wakanda } from "../../app/wakanda.service";
import { ListPage } from "../list/list";

/**
 * Generated class for the NewwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-newwo',
  templateUrl: 'newwo.html',
})
export class NewwoPage {

  constructor(private app: App, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private wakanda: Wakanda, public navCtrl: NavController, public navParams: NavParams, private _worktable: WorkordertableService) {
  }

  userData: any;
  customerInfo: any = '';

  ionViewDidLoad() {
    this.wakanda.directory.getCurrentUser().then(op => {
      this.userData = op.fullName.split(',');
    })
  }

  customerTable: GridOptions = this.createTableNoSelection(this.customerTable, 'customerTableCols');
  customerTableFlag: boolean = true;

  createTableNoSelection(val: GridOptions, cols) {
    val = <GridOptions>{}
    val.columnDefs = this._worktable[cols];
    return val;
  }

  customerArray: any;

  customerTableSelection(val) {

    this.customerInfo = val.data.firstName + " " + val.data.lastName + " " + val.data.address + " " + val.data.city + " " + val.data.customerID;
    this.customerArray = val;

  }

  createWO() {
console.log("Create WO")
    let alert = this.alertCtrl.create({
      title: 'warning',
      message: 'Are you sure you want to create the WO for the customer ' + this.customerArray.data.customerID,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            if (this.customerArray.data.type !== 'Can') {
              this.wakanda.catalog.then((ds: any) => {
                ds.SvrMethods.createWorkOrder(this.customerArray.data.customerID, this.userData[2], this.userData[2], this.userData[1]).then(op => {
                   this.app.getRootNav().setRoot(ListPage)
                })
              })
            }
          }
        }
      ]
    })
    alert.present();


  }

  searchCust(val) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.wakanda.catalog.then((ds: any) => {
      ds.Customer.custListarray(val.lastname, val.firstname, val.address, val.phone, val.customerID, "", "").then(op => {
        console.log(op)
        this.customerTableFlag = false;
        this.customerTable.rowData = op;
        setTimeout(() => {
        this.customerTableFlag = true;
          loading.dismiss();
        }, 0);

      })
    })
  }

}
