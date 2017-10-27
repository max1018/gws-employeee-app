import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { Wakanda } from "../../app/wakanda.service";
import { DsService } from "../../app/ds.service";
import { ListPage } from "../list/list";
import { EmailPage } from "../email/email";
import { LogoutPage } from "../logout/logout";

/**
 * Generated class for the WorkDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-detail',
  templateUrl: 'work-detail.html',
})
export class WorkDetailPage {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = ListPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private wakanda: Wakanda, private dsservice: DsService) {
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Email', component: EmailPage },
      { title: 'Logout', component: LogoutPage }
    ];
  }

  public openPage(page) {
    if (page.title === 'List') {
      this.rootPage = (page.component);
    } else {
      this.navCtrl.push(page.component);
    }

  }

  ionViewDidLoad() {
  }
 


  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
