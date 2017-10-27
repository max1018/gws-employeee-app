import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ds } from "../../app/ds.service";

/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
products:any;
currentlySelected:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allQuery();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  allQuery(){
    ds['Product'].query({
      filter: 'subTitle ==:1',
      params: ['Service']
    }).then(
      op =>{
        this.products = op['entities'];
        console.log(op['entities'])
      }
    )
  }

  backButton(){
    this.navCtrl.pop();
  }

  selected(item){
    this.currentlySelected = item;
  }
}
