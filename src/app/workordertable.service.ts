import { Injectable } from '@angular/core';
import { GridOptions } from "ag-grid/main";

@Injectable()
export class WorkordertableService {

  selectedCustomerInformation : any = new Object();
  workOrderInfoOfSelectedCustomer : any = new Object();
  driverName : any;
  selectedOrderNumber: any;
  reviewObject : any = {};
  location : any ;
  replaceItem : any;
  driverLocation : any ;

  constructor() { }

  setDriverLocation(val){
    this.driverLocation=val;
  }

  getDriverLocation(){
    return Promise.resolve(this.driverLocation);
  }

  setReplaceItem(val){
    this.replaceItem=val;
  }

  getReplaceItem(){
    return Promise.resolve(this.replaceItem);
  }

  setLocation(val){
    this.location = val;
  }

  getLocation(){
    return Promise.resolve(this.location);
  }

  setDeliveryAndPickUp(pickup : any , delivery : any){
    this.reviewObject.pickup = pickup;
    this.reviewObject.delivery = pickup;
  }

  getDelivieryAndPickUp(){
    return this.reviewObject;
  }

  setSelectedOrderNumber(val){
    this.selectedOrderNumber = val;
  }

  getSelectedOrderNumber(){
    return this.selectedOrderNumber;
  }

  setDriverName(val){
    this.driverName = val;
  }

  getDriverName(){
    return this.driverName;
  }

  setSelectedCustomerInformation(val){
    this.selectedCustomerInformation = val;
  }

  getSelectedCustomerInformation(){
    return this.selectedCustomerInformation;
  }

  setworkOrderInfoOfSelectedCustomer(val){
    this.workOrderInfoOfSelectedCustomer = val;
  }

  getworkOrderInfoOfSelectedCustomer(){
    return this.workOrderInfoOfSelectedCustomer;
  }

  get colArr(){
    return [ {'category': 'Coffee'}, {'category': 'Water'}, {'category': 'Labor'}, {'category': 'Salt'}, {'category': 'Equipment'},
      {'category': 'Support'}, {'category': 'Misc'}, {'category': 'Parts'}];
  }

  get listTableCols(){
    return [
      {headerName: 'Seq' , field : 'deliverySeq', width: 50, minWidth : 75 , maxWidth : 200},
      {headerName: 'open' , field : 'open_txt', width: 60, minWidth : 75 , maxWidth : 200},
      {headerName: 'name' , field : 'woName', width: 130, minWidth : 75 , maxWidth : 300},
      {headerName: 'address' , field : 'woAddress', width: 200, minWidth : 75 , maxWidth : 600},
      {headerName: 'phone' , field : 'phone', width: 120, minWidth : 75 , maxWidth : 300}
    ];
  }

  get customerTableCols(){
    return [
      {headerName : 'First', field:'firstName',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'Last', field:'lastName',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'Address', field:'address',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'City', field:'city',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'Phone', field:'phone',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'WorkPhone', field:'workPhone',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'CellPhone', field:'cellPhone',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'CustomerID', field:'customerID',width: 50, minWidth : 75 , maxWidth : 200},
      {headerName : 'type', field:'type',width: 50, minWidth : 75 , maxWidth : 200},
    ]
  }

  get itemTableCols(){
    return [
      {headerName: 'Code' , field : 'productCode', width: 100},
      {headerName: 'Description' , field : 'description', width: 170},
      {headerName: 'Quantity' , field: 'quantity', width: 100}
    ];
  }


  get equipmentTableCols(){
    return [
      {headerName : 'status' , field : 'status' , width: 100},
      {headerName : 'serialNum' , field : 'serialNum' , width: 100},
      {headerName : 'description' , field : 'description' , width: 100},
      {headerName : 'model' , field : 'model' , width: 100},
      {headerName : 'brand' , field : 'brand' , width: 100},
      {headerName : 'newDate' , field : 'newDate' , width: 100},
      {headerName : 'installed' , field : 'installDate' , width: 100},
      {headerName : 'cancelled' , field : 'cancellDate' , width: 100},
      {headerName : 'rent' , field : 'rent' , width: 100},
      {headerName : 'cid' , field : 'customerID' , width: 100}
    ];
  }

  get productTablecols(){
    return [
      {headerName : 'Code', field: 'productCode', width: 100},
      {headerName : 'Product', field: 'description', width: 100},
      {headerName : 'Price', field: 'price', width: 100},
      {headerName : 'brand', field: 'brand', width: 100}
    ];
  }

}
