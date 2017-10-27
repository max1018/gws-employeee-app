import {Wakanda} from './wakanda.service';
import { Injectable } from '@angular/core';
import {ds} from './ds.service'

let employee:any;
let currentEvent: any;
let myCustomers: any;
let selectedCustomer: any;
let selectCustomerProfile: any;
let customerGoals: any;
let goalTypes: any;
let driverArray:any;
let exportFunction:any;
let customerItems: any;
let customerEquipment:any;


@Injectable()
export class Employee{

    constructor(private wakanda: Wakanda){
        console.log("Max")
        //this.setEmployee();
    }


 id:any;
 name:any;

getLogin(){
    this.wakanda.directory.getCurrentUser().then( user =>{
        let temp = user.fullName.split(',');
        this.name = user.fullName;
        //this.id = parseInt(temp[1])/1000;
        console.log(temp[2]);
        this.name = temp[2];
        console.log(this.name)
        employee = user;
})

       
return this.name}

setEmployee(temp){
    // this.wakanda.directory.getCurrentUser().then( user =>{
    //     let temp = user.fullName.split(',');
    //     this.name = user.fullName;
    //     //this.id = parseInt(temp[1])/1000;
    //     console.log(temp[2]);
    //     this.name = temp[2];
    //     console.log(this.name)
        employee = temp;
// })
    //return employee;
}
getEmployee(){
    return employee;
}
setCurrentEvent(event){
    currentEvent = event;
}
getCurrentEvent(){
    return currentEvent;
}
setMyCustomers(customers){
myCustomers = customers; 
}
getMyCustomers(){
    return myCustomers;
}
setSelectedCustomer(item){
selectedCustomer = item;
this.profileQuery();
}

getSelectedCustomer(){
    return selectedCustomer;
}

profileQuery(){
ds['Profile'].query({
    filter: 'customerID==:1',
    params: [selectedCustomer.customerID]
}).then(
    op => {
        selectCustomerProfile = op['entities'][0];
    }
)
}

equipmentQuery(){
ds['Profile'].query({
    filter: 'customerID==:1',
    params: [selectedCustomer.customerID]
}).then(
    op => {
        selectCustomerProfile = op['entities'][0];
    }
)
}

getSelectedProfile(){
    return selectCustomerProfile;
}

setCustomerGoals(item){
    customerGoals = []
customerGoals = item;
let i = 0;

// while(i < 3){
//     customerGoals.push(
//         item[0],
//         item[1]
//     )
// i++;
// }
}
getCustomerGoals(){
    return customerGoals;
}
queryGoalTypes(){
    ds['GoalType'].query({
        filter: 'ID > :1',
        params: [0]
    }).then( op =>{
        console.log('Printing goal types from query');
        console.log(op['entities']);
        goalTypes = op['entities'];
    }
    
    )
}

getGoalTypes()
{
    this.queryGoalTypes();
    console.log('Printing goal types from get goal types in service');
    console.log(goalTypes)
    return goalTypes;
}

setDriverRouteArray(item){
driverArray = item;
console.log();
}

getDriverRouteArray(){
    return driverArray;
}

setCurrentCustomerItems(item){
    customerItems = item;
}

getCurrentCustomerItems(){
    return customerItems;
}

setCurrentCustomerEquipment(item){
    customerEquipment = item;
}

getCurrentCustomerEquipment(){
   return customerEquipment;
}

setCurrentCustomer(item){
    selectedCustomer.customer = item;
}
setFunction(func: Function){
exportFunction = func;
}
getFunction(){
    return exportFunction;
}
}
export{employee}