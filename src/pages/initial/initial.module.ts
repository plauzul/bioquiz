import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Initial } from './initial';

@NgModule({
  declarations: [
    Initial,
  ],
  imports: [
    IonicPageModule.forChild(Initial),
  ],
  exports: [
    Initial
  ]
})
export class InitialModule {}
