import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Calendar} from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular';
import {ds} from '../../app/ds.service'
import {Employee} from '../../app/employee.service'
import {Wakanda} from '../../app/wakanda.service'
import {EventInfoPage} from '../event-info/event-info'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
name
  constructor(private wakanda:Wakanda, public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private _alert: AlertController, private emp :Employee) {
  //this.emp.getLogin()
  console.log("Constructor HomePage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
     this.wakanda.directory.getCurrentUser().then( user =>{
        let temp = user.fullName.split(',');
        this.name = user.fullName;
        this.name = temp[2];
       console.log(user)
        this.getMyEvents();
        this.getCustomers();
})
  }

  events: any = [];
  customer: any = [];
  getMyEvents(){
    ds['CustomerEvents'].query({
      select: ['eventType', 'customer'],
      filter: 'eventGuide =:1 && complete=:2',
      params: [this.name, false],
      orderBy: ['dateExpected']
    }).then( op =>
    {
      //this.events = op['entities'];

      //console.log(this.events)

      for(let i = 0; i < op['entities'].length;i++){
       this.getEventsInfo(op['entities'][i])

       
      }
    }
    )

    
  }
  getEventsInfo(item){
   // let customer:any;

    ds['Customer'].query({
      filter: "customerID ==:1",
      params: [item.customerID]
    }).then(
      op => {
        this.events.push(
          {
            event: item,
            customer: op['entities'][0]
          }
        );
        // console.log("This is me: ")
        // console.log(this.events[0].event.eventType.eventName)
      }
    )
 return }

  getEventInfo(item){
    console.log(item);
  this.emp.setCurrentEvent(item);
  this.navCtrl.push(EventInfoPage)
  }

  // ionViewWillLeave(){
  //   this.events = [];
  //   //this.ionViewDidLoad();
  // }
  getCustomers(){
    ds['Customer'].query({
      filter: 'contactRep ==:1 && type==:2',
      params: [this.name, 'CTC'],
      orderBy: 'firstName',
      pageSize: 300
    }).then(
      op =>{
        //console.log(op['entities']);
        this.emp.setMyCustomers(op['entities']);
      }
    )
  }

  

}
