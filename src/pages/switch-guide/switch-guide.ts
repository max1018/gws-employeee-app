import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service'
import {ds} from "../../app/ds.service";
import { AlertController, App } from 'ionic-angular';
import { HomePage } from '../home/home'
import { EventInfoPage} from '../event-info/event-info'
import { TabsPage } from "../tabs/tabs";



/**
 * Generated class for the SwitchGuidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-switch-guide',
  templateUrl: 'switch-guide.html',
})
export class SwitchGuidePage {

  currentEvent:any;
  salesArray: any = [];
  newGuide: any;
  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, private _emp:Employee, private _alert: AlertController) {
    this.currentEvent = this._emp.getCurrentEvent();
    ds['SvrMethods'].userArraymake('Sales', '', '', '').then(op => {
            for (let entity of op) {
                this.salesArray.push(entity.name);
            }
              //console.log(this.salesArray)
    });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SwitchGuidePage');
  }
  getNewGuide(){
  // this.newGuide = item;
   console.log(this.newGuide);
  }
  confirmButton(){
    this.currentEvent.event.eventGuide = this.newGuide;
    this.currentEvent.event.save();

    let alertVar = this._alert.create(
  {
    title: 'Successful',
      subTitle: this.newGuide+' is the new guide',
      buttons: ['OK']
  }
)
  alertVar.present();
  this.app.getRootNav().setRoot(TabsPage)
   // this.navCtrl.pop();
    //this.navCtrl.setRoot(HomePage)
   // this.navCtrl.push(EventInfoPage)
    
  }

}
