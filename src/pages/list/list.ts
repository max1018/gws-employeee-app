import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, reorderArray } from 'ionic-angular';
import { GridOptions } from "ag-grid/main";
import { WorkordertableService } from "../../app/workordertable.service";
import { Wakanda } from "../../app/wakanda.service";
import { StatusBar } from "@ionic-native/status-bar";
import { Platform, LoadingController, Content } from 'ionic-angular';
import { NewwoPage } from "../newwo/newwo";
import { AddItemPage } from "../add-item/add-item";
import { SignaturePage } from "../signature/signature";
import { ReviewPage } from "../review/review";
import { MapPage } from "../map/map";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BarScannerPage } from "../bar-scanner/bar-scanner";
import { Employee } from "../../app/employee.service";
import { PopoverPage } from "../popover/popover";
import { EmailPage } from "../email/email";
import { ds } from "../../app/ds.service";

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})


export class ListPage {

  @ViewChild(Content) content: Content;

  // This is similar to ngOnInit in angular
  driver: any;
  defaultOption: any = 'unfinished';
  woQuantity: any = 0;
  ionViewDidLoad() {
    //this.login();
    this.wakanda.directory.getCurrentUser().then(op => {
      console.log(op);
      let splitValue = op['fullName'].split(',');
      let locationVal = splitValue[10].split(':');
      console.log(locationVal[1]);
    })
    this.today = new Date();
    this.todayISO = this.today.toISOString();
    this.getLoginDetail();
    this.getUsers();
    console.log(this.userData[2])
    this.emp.setFunction(this.complete);
  }

  // for developement we can remove it later
  // login() {
  //   this.wakanda.directory.login('Spencer100', 'Spencer100@100').then(res => {
  //     if (res) {
  //       this.getUsers();
  //       this.getLoginDetail();
  //     }
  //   }).catch(err => {
  //   });
  // }

  userData: any = new Object();
  driverArray: any;
  itemArray: any;
  equipmentArray: any;
  constructor(private emp: Employee, private _http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private _worktable: WorkordertableService, private wakanda: Wakanda) {
    //console.log(this.wakanda.directory.getCurrentUser());
  }

  getLoginDetail() {
    this.wakanda.directory.getCurrentUser().then(op => {
      this.userData = op.fullName.split(',');

      //This should display the infinished work order for the driver
      this.makeTableForSelectedUser(this.userData[2], 'true')
      this.driver = this.userData[2];
    })
  }

  presentModal() {
    let modal = this.modalCtrl.create(PopoverPage);
    modal.present();
  }
  testFunc() {
    this.navCtrl.push("TestPage");
  }

  // This is related with the date
  today: Date;
  todayISO: any;

  // helps to send back the exact format of date after change in the date picker
  dateChange(val) {
    console.log(val,'Date Change Event');
    //let dateParts = val.split('-');
    //let date = new Date(val.year, val.month - 1, val.day);
    //this.today = date;
    let date = val.substring(0,10);
    console.log(val.substring(0,10));

        ds['WorkOrder'].fieldList(date, date, this.driverName, true, false, false, 0).then(op => {
                  
          this.driverArray = op['entities']
            console.log(op['entities']);
        })

    return date;
  }

  // below code is responsible for the bottom options
  options = [
    { 'name': 'Finished', 'function': 'finishedFunction' },
    { 'name': 'Unfinished', 'function': 'unfinishedFunction' },
    { 'name': 'Future', 'function': 'futureFunction' },
    { 'name': 'Make WOs', 'function': 'makeWO' },
    { 'name': 'new WO', 'function': 'newWO' },
    { 'name': 'Export Today', 'function': 'exportToday' }];

  // perform the operation based on the selected dropdown options
  optionChange($event) {
    switch ($event) {
      case ('Finished'):
        this.finishedFunction();
        break;
      case ('Unfinished'):
        this.unfinishedFunction();
        break;
      case ('Future'):
        this.futureFunction();
        break;
      case ('Make WOs'):
        this.makeWO();
        break;
      case ('new WO'):
        this.newWO();
        break;
      case ('Export Today'):
        this.exportToday();
        break;
    }
  }

  ///////////These are the functions that are responsible for options dropdown under the list tab
  finishedFunction() {
    this.makeTableForSelectedUser(this.driverName, 'false');
  }

  unfinishedFunction() {
    this.makeTableForSelectedUser(this.driverName, 'true');
  }

  // This function is initiated when future button is being clicked
  futureFunction() {
    // console.log('future function called')
    // console.log('date:',this.today);
    var woDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0);
    var dateTomilli = woDate.setDate(woDate.getDate() + 1);
    woDate = new Date(dateTomilli);
    var moNum1 = woDate.getMonth() + 1;
    var isoDate1 = woDate.getFullYear() + '-' + moNum1 + '-' + woDate.getDate();
    var userName = this.driverName;
    var deliverySeq = 0;
    dateTomilli = woDate.setDate(woDate.getDate() + 8) + 86395000;
    var woDateto = new Date(dateTomilli);
    var moNum2 = woDateto.getMonth() + 1;
    var isoDate2 = woDateto.getFullYear() + '-' + moNum2 + '-' + woDateto.getDate();
    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    loading.present();
    this.wakanda.catalog.then((ds: any) => {
      ds['WorkOrder'].fieldList(isoDate1, isoDate2, userName, 'both', false, false, deliverySeq).then(op => {
        // console.log(op);
        this.ListTableFlag = false;
        this.listTable.rowData = op['entities'];
        this.driverArray = op['entities']
        this.woQuantity = op._count
        setTimeout(() => {
          this.ListTableFlag = true;
          loading.dismiss();
        }, 0);
      })
    });
  }

  // create new wo
  newWO() {
    this.navCtrl.push(NewwoPage);
  }


  dayVar: any = 0;
  weekVar: any = 0;

  makeWO() {
    /////// I assume this function is in development which is  using the maxfield and value from the user dynamically
    ///we still need to build it
    let driverName = this.driverName;
    let makeFlag = true;
    if (driverName != this.userData[2]) {
      let confirm = this.alertCtrl.create({
        title: 'Warning',
        message: 'You are logged in under a different name, Ok to proceed',
        buttons: [
          {
            text: 'No',
            handler: () => {
              makeFlag = false;
              let alert = this.alertCtrl.create({
                title: 'Warning',
                subTitle: 'Canceled Creating Work Order',
                buttons: ['OK']
              });
              alert.present();
            }
          },
          {
            text: 'Yes',
            handler: () => {
              makeFlag = true;
              if (makeFlag) {
                var drvrNum = this.userData[1].substring(6);
                var woBaseNum = this.userData[1];
                var dname = this.driverName;
                var dayVar = this.dayVar;
                var weekVar = this.weekVar;
                var maxFindVar = 9;
                let routeNum = driverName + dayVar + weekVar + "0000";
                // We still need to add some code into this
                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
                loading.present();
                this.wakanda.catalog.then((ds: any) => {
                  ds.SvrMethods.createWorkOrderList(routeNum, driverName, this.userData[1], 9, this.today.toISOString().substring(0, 10)).then((op) => {
                    //console.log(op);
                    ds.WorkOrder.wocheckList(driverName, routeNum).then((op) => {
                      //console.log(op);
                      loading.dismiss();
                    })
                  })
                });
              }
            }
          }
        ]
      });
      confirm.present();
    }
  }

  // This function helps to export the today information
  exportToday() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    const tempDate = new Date();
    tempDate.setMonth(this.today.getMonth() + 1);
    tempDate.setFullYear(this.today.getFullYear());
    tempDate.setDate(this.today.getDate());
    this.wakanda.catalog.then((ds: any) => {
      ds['SvrMethods'].exportWODay(tempDate, this.driverName).then(op => {
        loading.dismiss();
      });
    });
  }




  List: string = 'list';

  driverName: string;

  // The main table which holds all the content
  listTable: GridOptions = this.createTableNoSelection(this.listTable, 'listTableCols');
  ListTableFlag: boolean = true;

  createTableNoSelection(val: GridOptions, cols) {
    val = <GridOptions>{}
    val.columnDefs = this._worktable[cols];
    return val;
  }

  // This function is to reload the page again when we go to a new page and come back
  ionViewWillEnter() {
    //console.log('reached',this.selectedCustomerInformation);
    this.equipmentTableSelectedValue = {};
    // if(this.driverName!=null){
    //   this.makeTableForSelectedUser(this.driverName,"");
    // }

    if (this.selectedCustomerInformation.customerID) {
      //console.log('reached');
      this.getValueForItemsTab();
      this.getSelectedCustomerEquipment();
    }
  }


  // This fuction is used to get all the users under the sevice and Drivers
  userArray: any;

  getUsers() {
    this.userArray = [];
    this.wakanda.catalog.then((ds: any) => {
      ds['SvrMethods'].userArraymake('Service', 'Driver', '').then(op => {
        this.userArray = op;
      });
    });
  }
  // This is used to give the loading message to the users


  // This function helps to create the workorder based on the use selection
  makeTableForSelectedUser(val, flag?) {
    let date = new Date(); //////////use this for production to get the today
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.driverName = val;
    this._worktable.setDriverName(this.driverName);
    //const date = new Date('22 February 2016 05:00 UTC');
    const todayDate = date.toISOString().substring(0, 10);
    console.log(date.toISOString().substring(0, 10))
    console.log(todayDate);
    this.wakanda.catalog.then((ds: any) => {
      ds['WorkOrder'].fieldList(todayDate, todayDate, this.driverName, flag, false, false, 0).then(op => {
        this.ListTableFlag = false;
        this.listTable.rowData = op['entities'];
        this.driverArray = op['entities']
        this.woQuantity = op._count
        this.emp.setDriverRouteArray(op['entities']);
        console.log(this.emp.getDriverRouteArray());
        setTimeout(() => {
          // this.presentModal();
          this.ListTableFlag = true;
          // this.List = 'wo'
          loading.dismiss();
        }, 0);

      });
    });
  }

  // ionic Change function which helps to keep track of the selected user from the drop down menu
  userSelected($event) {
    //console.log(this.selUser);
    this.makeTableForSelectedUser($event, '');
  }

  getSelectedCustomerEquipment() {
    this.wakanda.catalog.then((ds: any) => {
      ds['Equipment'].query({
        filter: 'customerID ==:1',
        params: [this.selectedCustomerInformation.customerID]
      }).then(op => {
        this.equipmentTableFlag = false;
        this.equipmentTable.rowData = op['entities'];
        this.equipmentArray = op['entities'];
        setTimeout(() => { this.equipmentTableFlag = true; }, 0);
      });
    })
  }


  selectedOrderNumber: any;
  selectedCustomerInformation: any = new Object;
  workOrderInfoOfSelectedCustomer: any = new Object;

  // This function is responsible when we click the list table it does some background works such as 
  // it gets the work order information and the customer information 
  customerEmail: any;
  listTableSelection(item) {
    this.total = 0;
    let selectedValue = item;
    this.selectedOrderNumber = selectedValue.orderNumber;
    this._worktable.setSelectedOrderNumber(this.selectedOrderNumber);
    this.wakanda.catalog.then(ds => {
      ds['Customer'].query({
        filter: 'customerID == :1',
        params: [selectedValue.customerID]
      }).then(op => {
        this.selectedCustomerInformation = op['entities'][0];
        this.customerEmail = this.selectedCustomerInformation['email'];
        console.log(this.customerEmail)
        if (this.selectedCustomerInformation._stamp == 0) {
          this.selectedCustomerInformation._stamp++;
        }
        this.getSelectedCustomerEquipment();
        this._worktable.setSelectedCustomerInformation(this.selectedCustomerInformation);
      });
    });
    this.wakanda.catalog.then(ds => {
      ds['WorkOrder'].query({
        filter: 'orderNumber ==:1',
        params: [selectedValue.orderNumber]
      }).then(op => {
        this.workOrderInfoOfSelectedCustomer = op['entities'][0];
        this.newDate = this.workOrderInfoOfSelectedCustomer['dateWanted'].toISOString();
        if (this.workOrderInfoOfSelectedCustomer['_stamp'] == 0) {
          this.workOrderInfoOfSelectedCustomer._stamp++;
        }
        this._worktable.setworkOrderInfoOfSelectedCustomer(this.workOrderInfoOfSelectedCustomer);
      });
    });
    // this.wakanda.catalog.then((ds: any) => {
    //   ds['Equipment'].query({
    //     filter: 'customerID ==:1',
    //     params: [selectedValue.customerID]
    //   }).then(op => {
    //     this.equipmentTableFlag = false;
    //     this.equipmentTable.rowData = op['entities'];
    //     setTimeout(() => { this.equipmentTableFlag = true; }, 0);
    //   });
    // })
    this.List = 'item';
    this.getValueForItemsTab();
  }


  // Item table content 

  itemTableFlag: boolean = true;
  itemTable: GridOptions = this.createTableNoSelection(this.itemTable, 'itemTableCols');

  // This function helps to store the content the the item tab after query is being made to the database
  getValueForItemsTab() {
    let loading = this.loadingCtrl.create({
      content: 'loading ..'
    })
    loading.present();
    this.wakanda.catalog.then((ds: any) => {
      ds['InvcItem'].query({
        filter: 'orderNumber ==:1 ',
        params: [this.selectedOrderNumber]
      }).then(op => {
        this.itemTableFlag = false;
        this.itemTable.rowData = op['entities'];
        this.itemArray = op['entities'];
        this.calcWOTotal();
        console.log(op['entities'])
        setTimeout(() => {
        this.itemTableFlag = true;
          loading.dismiss()
        }, 0);
      });
    });
  }

  // This belong to the equip
  equipmentTable: GridOptions = this.createTableNoSelection(this.equipmentTable, 'equipmentTableCols');
  equipmentTableFlag = true;
  equipmentTableSelectedValue: any;

  //This function is to get the content of the selected element
  equipmentTableSelection(item) {
    if (Object.keys(this.equipmentTableSelectedValue).length == 0) {
      this.equipmentTableSelectedValue = item; //$event.data;
      console.log(this.equipmentTableSelectedValue);
      if (this.equipmentTableSelectedValue._stamp == 0) {
        this.equipmentTableSelectedValue._stamp = 1;
      }
    } else {
      if (item.ID == this.equipmentTableSelectedValue.ID) {
        this.equipmentTableSelectedValue = new Object();
      }
    }
  }


  itemTableSelectVal: any = new Object();

  itemTableSelection(item) {
    const val = item; //$event.data;
    if (Object.keys(this.itemTableSelectVal).length == 0) {
      this.itemTableSelectVal = val;
      if (this.itemTableSelectVal._stamp == 0) {
        this.itemTableSelectVal._stamp = 1;
      }
    } else {
      if (val.ID == this.itemTableSelectVal.ID) {
        this.itemTableSelectVal = new Object();
      }
    }

  }

  //////////////This function is responsible for deleting the item from the grid under the items tab
  deleteSelectedItem() {
    if (this.itemTableSelectVal._key != null) {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        message: 'Do you want to Delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.itemTableSelectVal.delete().then(() => { this.getValueForItemsTab(); });
            }
          }
        ]
      });
      alert.present();
    }
  }

  /// Update button Click
  updateInventory() {
    //Write the reload function
    if (this.itemTableSelectVal['_key'] != null) {
      //const QuantityBefore = this.itemTableSelectVal['quantity'];
      let modal = this.modalCtrl.create("UpdatePage", { quantity: this.itemTableSelectVal['quantity'] });
      modal.present();
      modal.onDidDismiss(res => {
        this.getUnitPrice(this.itemTableSelectVal.productCode, res, this.itemTableSelectVal.price, this.itemTableSelectVal);
      })
      // dialogRef.afterClosed().subscribe(res => {
      //   this.getUnitPrice(this.itemTableSelectVal.productCode,res,this.itemTableSelectVal.price,this.itemTableSelectVal)
      // });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        message: 'Select an item To update',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  // This function is responsible to get the custom pricing for the customer when a new item is added else its being 
  // updated
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
                this.getValueForItemsTab();
                this.newItemObj = {};
                this.ItemTableSelectedValue = {};
              })
            });  // close product query
          } else {
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
              ItemObject.save().then(() => { this.getValueForItemsTab(); })
            });  // close product query
          } //  end if product code
        } else {
          thePrice = custPrice.price;
          ItemObject.unitPrice = thePrice;
          ItemObject.quantity = qty;
          ItemObject.extdAmt = thePrice * ItemObject.quantity;
          ItemObject.tax = this.theProduct.tax * ItemObject.extdAmt;
          ItemObject.save().then(() => { this.getValueForItemsTab(); })
        }
      }); // close Custom Pricing query
    });
  };

  // this function is responsible for adding a new element 
  addNewItem() {
    this.navCtrl.push(AddItemPage);
  }

  // This function is responsible for getting the signature
  signature() {
    this.navCtrl.push(SignaturePage);
  }


  // This function is responsible for the review button
  review() {
    ///Get the deposit and perform operations
    ///This function is yet to build
    this._worktable.setDeliveryAndPickUp(this.calcBottles('water'), this.calcBottles('return'));
    this.navCtrl.push(ReviewPage);

  }

  /// This function is responsible for the complete button click under the infomation tab defaults to unfinished
  complete() {
    this.wakanda.catalog.then((ds: any) => {
      ds['SvrMethods'].isComplete(this.selectedOrderNumber, new Date(), ' ', this.workOrderInfoOfSelectedCustomer.email, this.workOrderInfoOfSelectedCustomer.instructions).then(op => {
        this.makeTableForSelectedUser(this.driverName, 'true');
        ds.SvrMethods.exportWorkOrders().then(() => {
          ds.SvrMethods.exportAllTo4D().then(() => { setTimeout(() => { this.List = 'list'; }, 200); })
        })
      });
    });
  }


  // This functions helps to calculate the number of bottle , water . deposit under the order
  calcBottles(prodType) {
    var totalBottleCount = 0;
    for (let item of this.itemTable.rowData) {
      if (item.quantity > 0) {
        switch (prodType) {
          case 'water':
            if ([8050, 8010, 8210, 8000, 8060, 8080, 8045].indexOf(item.productCode) >= 0)  //  -1 if not found in array
            { totalBottleCount = totalBottleCount + item.quantity; }; break;
          case 'deposit': if (item.productCode == '8100') totalBottleCount = totalBottleCount + item.quantity; break;
          case 'return': if (item.productCode == '8400') totalBottleCount = totalBottleCount + item.quantity; break;
        };	// end switch
      }; //End if item has a quantity
    }
    //return totalBottleCount;
    return totalBottleCount;
  }; // end calcBottles function


  //This function helps to navigate to the map tab
  showMap() {
    //this.navCtrl.push(MapPage);
    this.getGeo();
  }


  getGeo() {
    //console.log(this.selectedClient);
    let arr = this.workOrderInfoOfSelectedCustomer.woAddress.split(' ');
    let url = 'http://maps.google.com/maps/api/geocode/json?address=';
    arr.forEach(function (part) {
      url += part + '+';
    });
    url += this.selectedCustomerInformation.city;
    url += '&sensor=false';
    console.log(url)
    this._http.get(url).map(res => res.json()).subscribe(op => {
      //console.log(op);
      if (op.results.length > 0) {
        //console.log(op['results'][0]['geometry']['location']);
        //this.loadMap(op['results'][0]['geometry']['location']);
        //this.loadMap();
        this._worktable.setLocation(op['results'][0]['geometry']['location']);
        this.navCtrl.push(MapPage);
        //this.mapValue = (op['results'][0]['geometry']['location']);
      } else {
        //this.mapValue = {};
      }
    });
  }


  replace() {
    if (this.equipmentTableSelectedValue._stamp > 0) {
      this._worktable.setReplaceItem(this.equipmentTableSelectedValue);
      this.navCtrl.push(BarScannerPage);
    }

  }
  reorderItems(indexes: any) {
    let element = this.driverArray[indexes.from];
    console.log(this.driverArray[indexes.from], indexes);
    this.driverArray.splice(indexes.from, 1);
    this.driverArray.splice(indexes.to, 0, element);
  }
  newDate: string;
  editDateBool = false;

  editDate() {
    this.editDateBool = true;
  }
  saveWO() {
    let month;
    let day;
    let year;
    //this.workOrderInfoOfSelectedCustomer.dateWanted.toISOString() = this.newDate;
    console.log(this.newDate);
    console.log(this.newDate.substring(0, 4));
    console.log(this.newDate.substring(5, 7));
    console.log(this.newDate.substring(8, 10));
    month = this.newDate.substring(5, 7);
    year = this.newDate.substring(0, 4);
    day = this.newDate.substring(8, 10);

    let alert = this.alertCtrl.create({
      title: 'Saved',
      subTitle: 'WO saved succesfully',
      buttons: ['OK']
    })

    let date = new Date(this.newDate)
    date.setHours(0, 0);
    console.log(date)
    this.workOrderInfoOfSelectedCustomer.dateWanted = date;
    this.workOrderInfoOfSelectedCustomer.save();
    alert.present()
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
    this.List = 'list'
  }

  email() {
    this.navCtrl.push(EmailPage);
  }
  total: any = 0;
  calcWOTotal() {
    this.total = 0;
    console.log(this.itemArray)
    for (let i = 0; i < this.itemArray.length; i++) {
      this.total += this.itemArray[i].extdAmt;
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
