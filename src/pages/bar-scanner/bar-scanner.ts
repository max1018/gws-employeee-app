import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { WorkordertableService } from "../../app/workordertable.service";
import { Wakanda } from "../../app/wakanda.service";

/**
 * Generated class for the BarScannerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bar-scanner',
  templateUrl: 'bar-scanner.html',
})
export class BarScannerPage {

  constructor(public wakanda:Wakanda,public _service:WorkordertableService,public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  replaceItem : any ;
  driverLocation : any;

  ionViewDidLoad() {
    this.wakanda.directory.getCurrentUser().then(op=>{
      console.log(op);
      let splitValue = op['fullName'].split(',');
      let locationVal = splitValue[10].split(':');
      console.log(locationVal);
      this.driverLocation = locationVal[1];
    })
    this._service.getReplaceItem().then((op)=>{
      this.replaceItem =op;
      this.barcodeScan();
    })
  }

  barcodeScan(){
    console.log(this.replaceItem);
    if(this.replaceItem.ID > 0){
      this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      //barcodeData.text gives the code

      // this.replaceItem.serialNum = barcodeData.text;
      // this.replaceItem.save().then(()=>{
      //   this.navCtrl.pop();
      // })

      this.wakanda.catalog.then((ds:any)=>{
        ds['Equipment'].query({
          filter : 'serialNum =:1',
          params:[barcodeData.text]
        }).then(op=>{
          console.log(op['entities']);
          let temp = op['entities']['ID'];
           op['entities']['ID'] = this.replaceItem.ID;

           if(this.driverLocation == 'kal'){
             this.replaceItem.ID = 99993;
           }
           else{
             this.replaceItem.ID = 99992;
           }
          // this.replaceItem.ID = (kal else GR ID (99993 ,99992));
          this.replaceItem.save().then(()=>{ op['entites'].save().then(()=>{ this.navCtrl.pop()})})
        })
      })
      console.log(this.replaceItem);
      console.log(barcodeData);
    }, (err) => {
      // An error occurred
      console.log('error');
    });
    }
    
  }

}
