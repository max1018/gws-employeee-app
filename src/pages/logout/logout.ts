import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Wakanda } from "../../app/wakanda.service";
import { LoginPage } from "../login/login";

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  logout() {
    this.wakanda.directory.logout().then(() => {
      //this.navCtrl.setRoot(LoginPage);
      //this.navCtrl.popAll();
      
      console.log(this.app.getRootNav().setRoot(LoginPage));
      //this.app.
    })
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public wakanda: Wakanda, private app: App) {
   
  }

  ionViewDidLoad() {
     this.logout();
    //console.log('ionViewDidLoad LogoutPage');

  }

}
