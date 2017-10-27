import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import Rx from 'rxjs/Rx';
import { ds } from "../../app/ds.service";
/**
 * Generated class for the CustomerSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-search',
  templateUrl: 'customer-search.html',
})
export class CustomerSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSearchPage');
  }

  searchString:any;
  getItems(ev: any){
    console.log(ev.target.value)
   this.searchString = ev.target.value;
   this.allQuery(ev.target.value);
  }
  beers: any = [
    {name: 'Stella', country: 'Belgium', price:9.50},
    {name: 'Sam Adams', country: 'USA', price:8.50},
    {name: 'Bud Light', country: 'USA', price:6.50},
    {name: 'Sapporo', country: 'Japan', price:7.50}
  ]

  obBeers  = Rx.Observable.create(this.searchString)
              // .filter((beer:any) => beer.price > 8.0)
              .do(beer => {
                console.log(beer)
              })

  printHey(){
    this.obBeers
    .subscribe( 
      beer => console.log( beer))
  }
  addNewBeer(){
    this.beers.push({
      name: 'Corona', country: 'Mexico', price: 10.50
    })
  }

  firstNameArr: any = [];
  lastNameArr: any = [];
  workOrderArr: any = [];
  fullNameArr: any = [];


  //This function performs several queries at once first name, last name, syn name, and wo to try to find a match for the user 
  allQuery(item){

      

      console.log(isNaN(item))

      if(isNaN(item)){
ds['Customer'].query({
        filter: 'firstName ==:1',
        params: ['*'+item + '*']
      }).then( op =>{
        console.log(op['entities'])
        this.firstNameArr = op['entities'];
      }
      )
    ds['Customer'].query({
        filter: 'lastName ==:1',
        params: ['*'+item + '*']
      }).then( op =>{
        console.log(op['entities'])
        this.lastNameArr = op['entities'];
      }
      )
    ds['Customer'].query({
        filter: 'synName ==:1',
        params: ['*'+item + '*']
      }).then( op =>{
        console.log(op['entities'])
        this.fullNameArr = op['entities'];
      }
      )
      ds['WorkOrder'].query({
        filter: 'woName ==:1',
        params: ['*'+item + '*']
      }).then (op => {
        console.log(op['entities'])
        this.workOrderArr = op['entities'];
      })
      }
      else{
ds['Customer'].query({
        filter: 'customerID ==:1',
        params: ['*'+item + '*']
      }).then( op =>{
        console.log(op['entities'])
        this.fullNameArr = op['entities'];
      }
      )
      ds['WorkOrder'].query({
        filter: 'customerID ==:1',
        params: ['*'+item + '*']
      }).then (op => {
        console.log(op['entities'])
        this.workOrderArr =op['entities'];
      })
       }
   }
}
