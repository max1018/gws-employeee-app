import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { WorkordertableService } from "../../app/workordertable.service";
/**
 * Generated class for the SignaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  selectedOrderNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _wakservice: WorkordertableService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignaturePage');
    this.selectedOrderNumber = this._wakservice.getSelectedOrderNumber();
    //console.log(this.selectedOrderNumber);
  }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 400,
    'canvasHeight': 300
  };

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  drawComplete() {

  }

  drawStart() {

  }

  clearSign() {
    this.signaturePad.clear();
  }

  sendVal() {
    if (this.signaturePad.toDataURL() != null) {
      const imageFile = this.dataURItoBlob(this.signaturePad.toDataURL());
      const docType = 'wo';
      const docID = this.selectedOrderNumber;
      const formData = new FormData();
      formData.append('imageFile', imageFile);
      formData.append('docType', docType);
      formData.append('docID', docID);
      const xhr = new XMLHttpRequest();
      ///// Change it to the production IP while deploying in the server
      xhr.open('POST', 'http://10.10.100.145:8081/saveImage', true);
      xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
        }
        ; //  end IF
      }; // end onReadyChangestate
      xhr.send(formData);
      this.navCtrl.pop();
    }
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    });
  };

}
