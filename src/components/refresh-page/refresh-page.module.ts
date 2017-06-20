import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefreshPage } from './refresh-page';

@NgModule({
  declarations: [
    RefreshPage,
  ],
  imports: [
    IonicPageModule.forChild(RefreshPage),
  ],
  exports: [
    RefreshPage
  ]
})
export class RefreshPageModule {}
