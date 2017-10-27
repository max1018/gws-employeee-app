import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarScannerPage } from './bar-scanner';

@NgModule({
  declarations: [
    BarScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(BarScannerPage),
  ],
  exports: [
    BarScannerPage
  ]
})
export class BarScannerPageModule {}
