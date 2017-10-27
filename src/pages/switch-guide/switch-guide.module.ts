import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchGuidePage } from './switch-guide';

@NgModule({
  declarations: [
    SwitchGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchGuidePage),
  ],
  entryComponents :[SwitchGuidePage],
  exports: [
   SwitchGuidePage
  ]
})
export class SwitchGuidePageModule {}
