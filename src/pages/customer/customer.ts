import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Employee} from '../../app/employee.service'
import {Observable} from 'rxjs/Observable';
import {CustomerInfoPage} from '../customer-info/customer-info'
import {NewContactPage} from '../new-contact/new-contact'



/**
 * Generated class for the CustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
customers : any;
customersABC: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _emp: Employee) {
    this.customers = this._emp.getMyCustomers();
  
    console.log(this.customers)
    //this.alphabetDivider();
  }
  
  ionViewDidLoad() {
    
  }

  alphabetDivider(){
    this.customersABC = 
      {
        other:[],a:[],b:[],c:[],d:[],e:[],f:[],g:[],h:[],i:[],j:[],k:[],l:[],m:[],n:[],o:[],p:[],r:[],q:[],s:[],t:[],u:[],v:[],w:[],x:[],y:[],z:[]
      }
    ;
//console.log(this.customers[2].firstName)

for(let i = 0; i < this.customers.length;i++){
let firstLetter: string;
let params: any;
  if(this.customers[i].firstName[0]){
    firstLetter = this.customers[i].firstName[0];
    params = firstLetter.toUpperCase();
  } else{
    firstLetter = "Empty";
    firstLetter = this.customers[i].lastName[0];
    // console.log("FALSE SCENARIO")
    // console.log(this.customers[i].lastName)
    params = firstLetter.toUpperCase();
  }

  
  //this.customers[i].firstName = params;
  //console.log(this.customersABC.a)

  switch(params){
    default:
            this.customersABC.other.push(
              this.customers[i]              
            )
            break;
    case 'A':
            this.customersABC.a.push(
              this.customers[i]           
            )
            break;
    case 'B':
            this.customersABC.b.push(
              this.customers[i]          
            )
            break;
    case 'C':
            this.customersABC.c.push(
              this.customers[i]             
            )
            break;
    case 'D':
            this.customersABC.d.push(
              this.customers[i]              
            )
            break;
    case 'E':
            this.customersABC.e.push(
              this.customers[i]             
            )
            break;
    case 'F':
            this.customersABC.f.push(
              this.customers[i]            
            )
            break;
    case 'G':
            this.customersABC.g.push(
              this.customers[i]          
            )
            break;
    case 'H':
            this.customersABC.h.push(
              this.customers[i]              
            )
            break;
    case 'I':
            this.customersABC.i.push(
              this.customers[i]              
            )
            break;
    case 'J':
            this.customersABC.j.push(
              this.customers[i]              
            )
            break;
    case 'K':
            this.customersABC.k.push(
              this.customers[i]             
            )
            break;
    case 'L':
            this.customersABC.l.push(
              this.customers[i]              
            )
            break;
    case 'M':
            this.customersABC.m.push(
              this.customers[i]              
            )
            break;
    case 'N':
            this.customersABC.n.push(
              this.customers[i]              
            )
            break;
    case 'O':
            this.customersABC.o.push(
              this.customers[i]              
            )
            break;
    case 'P':
            this.customersABC.p.push(
              this.customers[i]             
            )
            break;
    case 'Q':
            this.customersABC.q.push(
              this.customers[i]              
            )
            break;
    case 'R':
            this.customersABC.r.push(
              this.customers[i]             
            )
            break;
    case 'S':
            this.customersABC.s.push(
              this.customers[i]              
            )
            break;
    case 'T':
            this.customersABC.t.push(
              this.customers[i]              
            )
            break;
    case 'U':
            this.customersABC.u.push(
              this.customers[i]             
            )
            break;
    case 'V':
            this.customersABC.v.push(
              this.customers[i]              
            )
            break;        
    case 'W':
            this.customersABC.w.push(
              this.customers[i]              
            )
            break;
    case 'X':
            this.customersABC.x.push(
              this.customers[i]             
            )
            break;
    case 'Y':
            this.customersABC.y.push(
              this.customers[i]              
            )
            break;
    case 'Z':
            this.customersABC.z.push(
              this.customers[i]              
            )
            break;
  }

 
     
   // console.log(this.customersABC)
}

  }
//  search(ev: any){
//     let params = ev.target.value;

//  }

 navToCusInfo(item){
   console.log(item)
this._emp.setSelectedCustomer(item);
this.navCtrl.push(CustomerInfoPage);
 }

 navToNewContact(){
   this.navCtrl.setRoot(NewContactPage)
 }

}


