import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { FormsModule } from "@angular/forms";
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CustomerPage } from '../pages/customer/customer';
import { EventsPage } from '../pages/events/events';
import { MenuPage } from '../pages/menu/menu';
import {EventInfoPage} from '../pages/event-info/event-info';
import {CustomerInfoPage} from '../pages/customer-info/customer-info';
import {ListGoalsPage} from '../pages/list-goals/list-goals';
import {NewContactPage} from '../pages/new-contact/new-contact';
import {SwitchGuidePage} from '../pages/switch-guide/switch-guide';
import {CalendarPage} from '../pages/calendar/calendar';
import { NewContactCustomerPage} from '../pages/new-contact-customer/new-contact-customer';
import { NewContactBuildingPage} from '../pages/new-contact-building/new-contact-building';
import { NewContactBuilderPage} from '../pages/new-contact-builder/new-contact-builder';
import {ProfileInfoPage} from '../pages/profile-info/profile-info';
import {MarketingInfoPage} from '../pages/marketing-info/marketing-info';
import {CustomerGoalsPage} from '../pages/customer-goals/customer-goals';
import {NewGoalPage} from '../pages/new-goal/new-goal';
import {NewEventPage} from  '../pages/new-event/new-event';
import {CustomerEventsPage} from '../pages/customer-events/customer-events'
import { ListPage } from "../pages/list/list";
import { LogoutPage } from "../pages/logout/logout";
import { WorkDetailPage } from "../pages/work-detail/work-detail";
import { NewwoPage } from "../pages/newwo/newwo";
import { SignaturePage } from "../pages/signature/signature";
import { ReviewPage } from "../pages/review/review";
import { MapPage } from "../pages/map/map";
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { BarScannerPage } from "../pages/bar-scanner/bar-scanner";
import { EmailPage } from "../pages/email/email";
import { AgGridModule } from "ag-grid-angular/main";
import { WorkordertableService } from "./workordertable.service";
import { SignaturePadModule } from 'angular2-signaturepad';
import {GoogleMaps} from '@ionic-native/google-maps';
import { HttpModule } from "@angular/http";
import { Geolocation } from '@ionic-native/geolocation';
import { AddItemPage } from "../pages/add-item/add-item";
import { GooglePlus } from '@ionic-native/google-plus';




import {Wakanda} from './wakanda.service';
import {DsService} from './ds.service';
import {Employee} from './employee.service'
import { PopoverPage } from "../pages/popover/popover";
import { ListSsrPage } from "../pages/list-ssr/list-ssr";
import { ItemsPage } from "../pages/items/items";
import { HighlightDirective } from "./highlight.directive";
import { CustomerSearchPage } from "../pages/customer-search/customer-search";
import { WoinfoPage } from "../pages/woinfo/woinfo";
import { EquipmentPage } from "../pages/equipment/equipment";
import { ProductListPage } from "../pages/product-list/product-list";
import { ProductInfoPage } from "../pages/product-info/product-info";
import { ItemInfoPage } from "../pages/item-info/item-info";
import { SearchInfoCustomerPage } from "../pages/search-info-customer/search-info-customer";
import { SearchInfoWoPage } from "../pages/search-info-wo/search-info-wo";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CustomerPage,
    EventsPage,
    LoginPage,
    MenuPage,
    CalendarPage,
    NewContactPage,
    SwitchGuidePage,
    ListGoalsPage,
    EventInfoPage,
    CustomerInfoPage,
    NewContactCustomerPage,
    NewContactBuildingPage,
    NewContactBuilderPage,
    ProfileInfoPage,
    MarketingInfoPage,
    CustomerEventsPage,
    CustomerGoalsPage,
    NewEventPage,
    NewGoalPage,
    AddItemPage,
    ListPage,
    LoginPage,
    ListPage,
    EmailPage,
    LogoutPage,
    WorkDetailPage,
    NewwoPage,
    SignaturePage,
    ReviewPage,
    MapPage,
    BarScannerPage,
    PopoverPage,
    ListSsrPage,
    ItemsPage,
    HighlightDirective,
    CustomerSearchPage,
    WoinfoPage,
    EquipmentPage,
    ProductListPage,
    ProductInfoPage,
    ItemInfoPage,
    SearchInfoCustomerPage,
    SearchInfoWoPage

  ],
  imports: [
    BrowserModule,
    AgGridModule.forRoot(),
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    EventsPage,
    CustomerPage,
    LoginPage,
    MenuPage,
    CalendarPage,
    NewContactPage,
    SwitchGuidePage,
    ListGoalsPage,
    EventInfoPage,
    CustomerInfoPage,
    NewContactCustomerPage,
    NewContactBuildingPage,
    NewContactBuilderPage,
    ProfileInfoPage,
    MarketingInfoPage,
    CustomerEventsPage,
    CustomerGoalsPage,
    NewEventPage,
    AddItemPage,
    ListPage,
    LoginPage,
    ListPage,
    EmailPage,
    LogoutPage,
    WorkDetailPage,
    NewwoPage,
    SignaturePage,
    ReviewPage,
    MapPage,
    BarScannerPage,
    NewGoalPage,
    PopoverPage,
    ListSsrPage,
    ItemsPage,
    CustomerSearchPage,
    WoinfoPage,
    EquipmentPage,
    ProductListPage,
    ProductInfoPage,
    ItemInfoPage,
    SearchInfoCustomerPage,
    SearchInfoWoPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    BarcodeScanner,
    SplashScreen,
    InAppBrowser,
    DsService,
    Wakanda,
    Calendar,
    Employee,
    GooglePlus,
    WorkordertableService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
