import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { WorkordertableService } from "../../app/workordertable.service";
import { Wakanda } from "../../app/wakanda.service";
import { Employee } from "../../app/employee.service";
import { ListPage } from "../list/list";

/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage implements OnInit {

  selectedOrderNumber: any;
  workOrderInfoOfSelectedCustomer: any;
  driverName: any;
  item: any = {};
  fun = this.emp.getFunction();

  ngOnInit() {
    this.selectedOrderNumber = this._worktable.getSelectedOrderNumber();
    this.workOrderInfoOfSelectedCustomer = this._worktable.getworkOrderInfoOfSelectedCustomer();
    this.driverName = this._worktable.getDriverName();
    this.item = (this._worktable.getDelivieryAndPickUp());
  }

  constructor(private _alert: AlertController, private app: App, private emp: Employee, private wakanda: Wakanda, public navCtrl: NavController, public navParams: NavParams, private _worktable: WorkordertableService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ReviewPage');
  }


//get the value during submit 
  review(val) {
    this.item = val;
    if (this.item) {
      this.wakanda.catalog.then((ds: any) => {
        let newDelivery = ds['InvcItem'].create({
          productCode: 8100,
          description: 'Bottle deposit',
          orderNumber: this.selectedOrderNumber,
          deliveryDate: new Date(),
          customerID: this.workOrderInfoOfSelectedCustomer['customerID'],
          employee: this.driverName,
          quantity: this.item.delivery,
          charge: this.item.delivery * 7,
          unitPrice: 7,
          extdAmt: this.item.delivery * 7,
          tax: 0,
          origin: 'wakToinvoice',
          deleteItem: 'False'
        });
        newDelivery.save().then(() => {
          let newPickup = ds['InvcItem'].create({
            productCode: 8400,
            description: 'Bottle return',
            orderNumber: this.selectedOrderNumber,
            deliveryDate: new Date(),
            customerID: this.workOrderInfoOfSelectedCustomer['customerID'],
            employee: this.driverName,
            quantity: this.item.pickup,
            charge: this.item.pickup * -7,
            unitPrice: -7,
            extdAmt: this.item.pickup * -7,
            tax: 0,
            origin: 'wakToinvoice',
            deleteItem: 'False'
          });
          let alert = this._alert.create({
            title: 'Choose One',
            buttons:[
              {
                text: 'Cancel',
                handler: ()=>{

                }
              },{
                text: 'Save WO',
                handler: () =>{
                  newPickup.save().then(() => {
                  this.app.getRootNav().setRoot(ListPage) 
                         });
                }
              },
              {
                text: 'Complete WO',
                handler: () =>{
                  newPickup.save().then(
                    () =>{
                      this.complete();
                    }
                  )
                }
              }
            ]
          })

          alert.present();
          
        });
      });
    }
  }

  
  complete() {
    this.wakanda.catalog.then((ds: any) => {
      ds['SvrMethods'].isComplete(this.selectedOrderNumber, new Date(), ' ', this.workOrderInfoOfSelectedCustomer.email, this.workOrderInfoOfSelectedCustomer.instructions).then(op => {
        ds.SvrMethods.exportWorkOrders().then(() => {
          ds.SvrMethods.exportAllTo4D().then(() => { setTimeout(() => { 
             this.app.getRootNav().setRoot(ListPage)
           }, 200); })
        })
      });
    });
  }


}
