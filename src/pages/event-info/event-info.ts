import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service'
import { AlertController } from 'ionic-angular';
import {HomePage} from '../home/home'
import {SwitchGuidePage} from '../switch-guide/switch-guide'

/**
 * Generated class for the EventInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
  //styleUrls :['event-info.scss']
})
export class EventInfoPage {
newDate:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee, private _alert: AlertController) {
   this.currentEvent = this._emp.getCurrentEvent();
   this.eventDetails = this.currentEvent.event.eventType
   console.log(this.currentEvent.event.dateExpected.toISOString())
   this.newDate = this.currentEvent.event.dateExpected.toISOString();
  }
currentEvent:any;
eventDetails

  ionViewDidLoad() {
  
  }

  completeButton(){
    let now = Date();
    this.currentEvent.event.complete = true;
    this.currentEvent.event.notes = this.currentEvent.event.notes + ' (Marked completed as of ' + now +' )'
    this.currentEvent.event.save();

    let alertVar = this._alert.create(
  {
    title: 'Successful',
      subTitle: 'You completed this event',
      buttons: ['OK']
  }
)
  alertVar.present();
    this.navCtrl.setRoot(HomePage);
  }

  switchGuidesButton(){
    this.navCtrl.push(SwitchGuidePage)
  }
  saveButton(){
    let alertVar = this._alert.create(
  {
    title: ' Save Successful',
      buttons: ['OK']
  }
)
   this.currentEvent.event.save().then(()=>{
      alertVar.present();
   });

  }
}
