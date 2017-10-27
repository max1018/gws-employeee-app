import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Wakanda } from "../../app/wakanda.service";
import { DsService } from "../../app/ds.service";
import { TabsPage } from '../tabs/tabs';
import {HomePage} from '../home/home'
import { AlertController, App } from 'ionic-angular';
import { Employee} from '../../app/employee.service'
import { ListPage } from "../list/list";
import { ListSsrPage } from "../list-ssr/list-ssr";



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [Customer]
})
export class LoginPage {

  constructor(private app: App, private emp: Employee, public navCtrl: NavController, public navParams: NavParams, private wakanda: Wakanda, private dsservice: DsService, private alert: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
name:any;
employee:any;
homepage:any;
  loginFunction(val) {

    //console.log(val.username, val.password)
    this.wakanda.directory.login(val.username, val.password).then(res => {
      if (res) {
        this.wakanda.directory.getCurrentUser().then( user =>{
          let temp = user.fullName.split(',');
          this.name = user.fullName;
          //this.id = parseInt(temp[1])/1000;
          console.log(temp[0]);
          this.emp.setEmployee(temp);
       
          if(temp[0]=='Driver'){
           this.homepage = ListPage;
          }
          else if(temp[0]=='Service'){
            this.homepage = TabsPage;
          }
          else{
            this.homepage = TabsPage;
          }
          
          this.dsservice.makeDS().then(op => {
    if (op) {
        // this.navCtrl.setRoot(this.homepage)
         this.app.getRootNav().setRoot(this.homepage);
         console.log('Test')
       }
  })
  
  });
} else {
 //console.log("ERROR")
  //console.log('incorrect Login');
}
}).catch(err => {
console.log(err)
let alertVar = this.alert.create(
{
title: 'Invalid',
subTitle: 'Password or Username incorrect!',
buttons: ['OK']
}
)
alertVar.present();

}) ;
  }
}
