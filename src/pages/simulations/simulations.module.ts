import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Simulations } from './simulations';

@NgModule({
  declarations: [
    Simulations,
  ],
  imports: [
    IonicPageModule.forChild(Simulations),
  ],
  exports: [
    Simulations
  ]
})
export class SimulationsModule {}
