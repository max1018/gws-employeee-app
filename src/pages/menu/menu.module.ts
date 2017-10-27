import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  entryComponents :[MenuPage],
  exports: [
   MenuPage
  ]
})
export class MenuPageModule {}
