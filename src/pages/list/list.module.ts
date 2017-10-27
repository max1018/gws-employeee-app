import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { AgGridModule } from "ag-grid-angular/main";

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    AgGridModule.withComponents([ListPage]),
    IonicPageModule.forChild(ListPage),
  ],
  entryComponents:[],
  exports: [
    ListPage
  ]
})
export class ListPageModule {}
