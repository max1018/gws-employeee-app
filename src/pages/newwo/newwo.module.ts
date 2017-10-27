import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewwoPage } from './newwo';
import { AgGridModule } from "ag-grid-angular/main";

@NgModule({
  declarations: [
    NewwoPage,
  ],
  imports: [
    AgGridModule.withComponents([NewwoPage]),
    IonicPageModule.forChild(NewwoPage),
  ],
  exports: [
    NewwoPage
  ]
})
export class NewwoPageModule {}
