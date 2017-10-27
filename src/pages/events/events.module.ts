import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';

@NgModule({
  declarations: [
    EventsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsPage),
  ],
  entryComponents :[EventsPage],
  exports: [
   EventsPage
  ]
})
export class EventsPageModule {}
