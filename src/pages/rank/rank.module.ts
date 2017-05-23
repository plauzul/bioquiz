import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Rank } from './rank';

@NgModule({
  declarations: [
    Rank,
  ],
  imports: [
    IonicPageModule.forChild(Rank),
  ],
  exports: [
    Rank
  ]
})
export class RankModule {}
