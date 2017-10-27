import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { WorkordertableService } from "../../app/workordertable.service";
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/Rx';
import { GoogleMap, LatLng, GoogleMapsEvent, MarkerOptions, Marker } from "@ionic-native/google-maps";

// declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  selectedClient: any;
  clientDetail: any;
  // constructor(public navCtrl: NavController, private geolocation: Geolocation, public _service: WorkordertableService, private _http: Http) {

  // }


  // This block of code is responsible to get the geo json based on the address
  // which we are using under the google map


  // ionViewDidLoad() {

  //   this.selectedClient = this._service.getworkOrderInfoOfSelectedCustomer();
  //   this.clientDetail = this._service.getSelectedCustomerInformation();
  //   this.getGeo();

  // }


  // getUserLocation(directionsDisplay,directionsService) {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     this.origlatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
  //     this.calculateAndDisplayRoute(directionsDisplay,directionsService)
  //     //console.log(this.origlatLng)
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  // destlatLng: any;
  // origlatLng: any;

  // loadMap(val) {
  //   this.destlatLng = new google.maps.LatLng(val.lat, val.lng);

  //   //console.log(this.destlatLng);

  //   let mapOptions = {
  //     center: this.destlatLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

  //   //console.log(mapOptions);

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


  //   var directionsDisplay = new google.maps.DirectionsRenderer();
  //   var directionsService = new google.maps.DirectionsService();
  //   directionsDisplay.setMap(this.map);

  //   // this.calculateAndDisplayRoute(directionsDisplay,directionsService);

  //   // let marker = new google.maps.Marker({
  //   //   position : this.destlatLng,
  //   //   map : this.map
  //   // });

  //   this.getUserLocation(directionsDisplay,directionsService);

  // }




  // calculateAndDisplayRoute(directionsDisplay,directionsService) {
  //   directionsService.route({
  //     origin: this.origlatLng,
  //     destination: this.destlatLng,
  //     travelMode: 'DRIVING'
  //   }, function (response, status) {
  //     if (status === 'OK') {
  //       directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }


  map: GoogleMap;

  constructor(private geolocation: Geolocation, public navCtrl: NavController, public platform: Platform, public _service: WorkordertableService) {
  }

  ionViewDidLoad() {

    this._service.getLocation().then(op => {
      this.loadMap(op);
    })

    
    //this.getGeo();

  }
  latLng: any;
  loadMap(val) {

    let location = new LatLng(val.lat, val.lng);
    this.latLng = location;

    this.map = new GoogleMap('map', {
     //'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
      //  'zoom': true,
      //   'traffic' : true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': {
          lat: val.lat,
          lng: val.lng
        },
        //'latLng': location,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    });

    this.map.fromLatLngToPoint(this.latLng).then(
      op => {
        console.log('From LatLng Method')
        console.log(op)
      }

     
    )
    this.map.getMyLocation().then(op2 =>{
       console.log(op2)
     }) 
    let markerOptions: MarkerOptions = {
      position: location,
      title: 'Destination'
    }

    this.map.addMarker(markerOptions).then((marker: Marker) => {
      marker.showInfoWindow();
    });


  }

}
