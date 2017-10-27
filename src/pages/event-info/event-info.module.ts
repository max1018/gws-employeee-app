import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInfoPage } from './event-info';

@NgModule({
  declarations: [
    EventInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInfoPage),
  ],
  entryComponents :[EventInfoPage],
  exports: [
   EventInfoPage
  ]
})
export class EventInfoPageModule {}
