import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Wakanda } from "../../app/wakanda.service";
import { WorkordertableService } from "../../app/workordertable.service";
import { GridOptions } from "ag-grid/main";
import { Content } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";


/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

    @ViewChild(Content) content: Content;


  workOrderInfoOfSelectedCustomer: any = new Object();
  selectedOrderNumber: any;
  driverName: any;
  defaultCode = 8000;

  constructor(private app: App, public navCtrl: NavController, public _workservice: WorkordertableService, public navParams: NavParams, private wakanda: Wakanda) {
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  createTableNoSelection(val: GridOptions, cols) {
    val = <GridOptions>{}
    val.columnDefs = this._workservice[cols];
    return val;
  }

  ionViewDidLoad() {
    this.workOrderInfoOfSelectedCustomer = this._workservice.getworkOrderInfoOfSelectedCustomer();
    
    this.selectedOrderNumber = this._workservice.getSelectedOrderNumber();
    console.log("Add Item:")
    // console.log(this.workOrderInfoOfSelectedCustomer);
    // console.log(this.selectedOrderNumber);

    this.driverName = this._workservice.getDriverName();
    //this.startUp()
  }

  newProductToAdd: any = new Object();


  // This functoin is responsible for adding a new element 
  addNewItem() {

     console.log(this.selectedOrderNumber);
    this.wakanda.catalog.then((ds: any) => {
      let newVal: any = ds['InvcItem'].create({
        productCode: this.newProductToAdd['productCode'],
        description: this.newProductToAdd['description'],
        orderNumber: this.selectedOrderNumber,
        deliveryDate: new Date(),
        customerID: this.workOrderInfoOfSelectedCustomer['customerID'],
        employee: "Mo",
        quantity: this.newProductToAdd['quantity'],
        charge: (this.newProductToAdd['quantity'] * this.newProductToAdd['price']),
        unitPrice: this.newProductToAdd['price'],
        extdAmt: (this.newProductToAdd['quantity'] * this.newProductToAdd['price']),
        tax: 0,
        origin: 'wakToinvoice',
        deleteItem: 'False'
      });
      console.log(newVal);
      this.getUnitPrice(newVal.productCode, newVal.quantity, newVal.price, newVal);
    });

  }

  catagoryArray = [{ 'category': 'Coffee' }, { 'category': 'Water' }, { 'category': 'Labor' }, { 'category': 'Salt' }, { 'category': 'Equipment' },
  { 'category': 'Support' }, { 'category': 'Misc' }, { 'category': 'Parts' }];

theProduct:any;
  getUnitPrice = function (prodCode, qty, stdPrice, ItemObject) {
    let thePrice = stdPrice;   // init var
    this.wakanda.catalog.then((ds: any) => {
      ds['CustomPricing'].query({  //  check for a custom price
        filter: 'customerID == :1 and productCode == :2',
        params: [this.workOrderInfoOfSelectedCustomer['customerID'], prodCode]
      }).then(op => {
        let custPrice = op['entities'][0];
        if (!custPrice) { //  no custom price exists
          if (prodCode === 8000 || prodCode === 8010) {    //  bottled water delivered
            ds['Product'].query({
              filter: 'productCode == :1',
              params: [prodCode]
            }).then(res => {
              this.theProduct = res['entities'][0];
              thePrice = this.theProduct.price;  // standard price
              if (qty > 6) {
                thePrice = this.theProduct.price3;  // best price
              } else if (qty >= 4) {
                thePrice = this.theProduct.price2;  // better price
              }
              ItemObject.unitPrice = thePrice;
              ItemObject.extdAmt = thePrice * qty;
              ItemObject.quantity = qty;
              ItemObject.save().then(() => {
                this.newItemObj = {};
                console.log("Nav Pop 1");
                //console.log(ItemObject)
                this.navCtrl.pop();
               // this.app.getRootNav().pop();
              })
            });  // close product query
          } else {
            console.log(prodCode)
            ds['Product'].query({
              filter: 'productCode == :1',
              params: [prodCode]
            }).then(res => {
              this.theProduct = res['entities'][0];
              thePrice = this.theProduct.price;  // standard price
              ItemObject.unitPrice = thePrice;
              ItemObject.extdAmt = thePrice * qty;
              ItemObject.quantity = qty;
              ItemObject.tax = this.theProduct.tax * ItemObject.extdAmt;
              ItemObject.save().then(()=>{
                console.log("Nav Pop 2")
                console.log(ItemObject)
                this.navCtrl.pop();
              });
            });  // close product query
          } //  end if product code
        } else {
            ds['Product'].query({
            filter: 'productCode == :1',
            params: [prodCode]
          }).then(res => {
            this.theProduct = res['entities'][0];
            
          thePrice = custPrice.price;
          ItemObject.unitPrice = thePrice;
          ItemObject.quantity = qty;
          ItemObject.extdAmt = thePrice * ItemObject.quantity;
          ItemObject.tax = this.theProduct.tax * ItemObject.extdAmt; 
          ItemObject.save().then(() => { 
            //console.log("Else option")
            //this.getValueForItemsTab()
           // console.log(this.getValueForItemsTab())
            ; })
        })
      }
      }); // close Custom Pricing query
    });
  };


  groupArray: any;
  selectedcatagoryVal: any;
  selectedgroupVal: any;
  groupFlag: boolean = false;
  productTable: GridOptions = this.createTableNoSelection(this.productTable, 'productTablecols');
  productTableFlag = true;

  getGroups() {
    this.groupArray = [];
    this.wakanda.catalog.then((ds: any) => {
      ds['Group'].query({
        filter: 'catName ==:1',
        params: [this.selectedcatagoryVal]
      }).then(op => {
        //console.log(op);
        for (const val of op['entities']) {
          this.groupArray.push({
            'groupName': val['groupName']
          });
        }
        this.groupFlag = true;
      });
    });
  }

  catagorySelect($event) {
    this.selectedcatagoryVal = $event;
    this.getGroups();
  }

  groupSelect($event) {
    this.selectedgroupVal = $event;
    this.productTableFlag = false;
    this.getListForSelectedValue();
  }
productArray:any;
  getListForSelectedValue() {
    this.productTableFlag = false;
    this.wakanda.catalog.then((ds: any) => {
      ds['Product'].makeproductArray(this.selectedcatagoryVal, this.selectedgroupVal, '', '').then(op => {
        this.productTable.rowData = op;
        this.productArray = op;
        this.productTableFlag = true;
      });
    });
  }

  // This function is responsible for performing the search query based on the entered value
  ProductSearch(val) {
    //console.log(val)
    this.productTableFlag = false;
    this.wakanda.catalog.then((ds: any) => {
      ds['Product'].makeproductArray('', '', val['keyword'], val['code']).then(op => {
        this.productTable.rowData = op[0];
        this.productArray = op;
       // console.log(op[0]);
        this.productTableFlag = true;
      });
    });
  }

  // This function is responsible for adding the new item to the customer
  productTableSelection(item) {
    const val = item; //$event.data;
    this.newProductToAdd = val;
    this.newProductToAdd['quantity'] = 0;
    this.scrollToTop();
  }
  getPrice(){
    this.newProductToAdd['charge'] = this.newProductToAdd['quantity'] * this.newProductToAdd['price'];
  }

  backToTop(){
    //document.getElementById('scroll').scrollTo('Top');
  }

startUp(){
  let val = {code: 8000, keyword: ''}
  console.log(val)
   this.ProductSearch(val);
   this.productTableSelection(this.productArray[0]);
}
}
