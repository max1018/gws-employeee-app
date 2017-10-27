import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewContactPage } from './new-contact';

@NgModule({
  declarations: [
    NewContactPage,
  ],
  imports: [
    IonicPageModule.forChild(NewContactPage),
  ],
  entryComponents :[NewContactPage],
  exports: [
   NewContactPage
  ]
})
export class NewContactPageModule {}
