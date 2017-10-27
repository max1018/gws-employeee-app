import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListGoalsPage } from './list-goals';

@NgModule({
  declarations: [
    ListGoalsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListGoalsPage),
  ],
  entryComponents :[ListGoalsPage],
  exports: [
   ListGoalsPage
  ]
})
export class ListGoalsPageModule {}
