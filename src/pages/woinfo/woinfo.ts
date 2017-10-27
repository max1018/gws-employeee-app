import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from "../../app/employee.service";
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ProductListPage } from "../product-list/product-list";
import { AddItemPage } from "../add-item/add-item";
import { Content } from 'ionic-angular';
import { WorkordertableService } from "../../app/workordertable.service";
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { MapPage } from "../map/map";
import { Geolocation } from '@ionic-native/geolocation';





/**
 * Generated class for the WoinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-woinfo',
  templateUrl: 'woinfo.html',
})
export class WoinfoPage {

  @ViewChild(Content) content: Content;

  currentWO: any;
  currentCustomer: any;
  newDate: string;
  items: any;
  equipment: any;
  parts: any;
  totalTax = 0;
  totalPrice = 0;
  constructor(
    public _workservice: WorkordertableService,
    private emp: Employee,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private geo: Geolocation,
    private _http: Http
  ) {

    this.items = this.emp.getCurrentCustomerItems();
    this.equipment = this.emp.getCurrentCustomerEquipment();
    this.currentWO = this.emp.getCurrentEvent();
    this.currentCustomer = this.emp.getSelectedCustomer();
    this.newDate = this.currentWO.dateWanted.toISOString();
    this._workservice.setSelectedOrderNumber(this.currentWO.orderNumber);
    this._workservice.setworkOrderInfoOfSelectedCustomer(this.currentCustomer);
    this._workservice.setDriverName = this.emp.getEmployee()[2];
    //console.log(this.emp.getEmployee()[2])

    // // console.log(this.equipment);
    console.log(this.equipment)
    let month;
    let day;
    let year;
    month = this.newDate.substring(5, 7);
    year = this.newDate.substring(0, 4);
    day = this.newDate.substring(8, 10);

    this.getMyLatLng();
  }

  ionViewDidLoad() {
    this.countTotals();
    console.log('ionViewDidLoad WoinfoPage');
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  addProduct() {
    let modal = this.modalCtrl.create(ProductListPage);
    modal.present();
  }

  addItem() {
    this.navCtrl.push(AddItemPage);
  }

  countTotals() {
    console.log("count method running");
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].charge);
      console.log(this.items[i].tax);

      this.totalPrice += this.items[i].charge;
      this.totalTax += this.items[i].tax;
    }
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Additonal Options',
      buttons: [
        {
          text: 'Time-in',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Make New Work Order',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present()
  }
  myLat: any;
  myLng: any;
  getMyLatLng() {
    this.geo.getCurrentPosition().then(
      op => {
        console.log(op)
        this.myLat = op.coords.latitude;
        this.myLng = op.coords.longitude;
        this.getDirections();
      }
    )
  }

  //Google Maps API Key - AIzaSyCDaq7O2Z_xE2TeADcvhppJgKFJTnERFgs
  dirFlag: boolean = false;
  travelDistance: any;
  travelTime: any;
  getDirections() {
    let locationTo: any;
    let arrTo = this.currentWO.woAddress.split(' ');
    let url = 'http://maps.google.com/maps/api/geocode/json?address=';
    arrTo.forEach(function (part) {
      url += part + '+';
    });
    url += this.currentCustomer.city;
    url += '&sensor=false';
    this._http.get(url).map(res => res.json()).subscribe(op => {
      console.log(op['results'][0]['geometry']['location'].lat, op['results'][0]['geometry']['location'].lng);
      locationTo = op['results'][0]['geometry']['location'];

      url = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
      url += this.myLng + ',' + this.myLat;
      url += ';';
      url += locationTo.lng + ',' + locationTo.lat;

      url += '.json?&access_token=pk.eyJ1IjoibWF4MTAxOCIsImEiOiJjajh5azBlajkyYWZ0MzJwMGN0cDM1bWxoIn0.VWVERhOFVbbpdrEvG-c85Q';
      this._http.get(url).map(res => res.json()).subscribe(op => {
        console.log(op);
        this.travelDistance = Math.round(op['routes'][0].distance * 0.000621371);
        // console.log(Math.round(op['routes'][0].duration/60) + ' Mins');
        this.travelTime = Math.round(op['routes'][0].duration / 60);
        this.dirFlag = true;
      });
    })

    //this.getMyLatLng();



  }

  printHey() {
    console.log("hey");
  }

}
