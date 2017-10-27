import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkDetailPage } from './work-detail';

@NgModule({
  declarations: [
    WorkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkDetailPage),
  ],
  exports: [
    WorkDetailPage
  ]
})
export class WorkDetailPageModule {}
