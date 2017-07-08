import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Ranks } from '../../providers/ranks';

@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class Rank {

  loading: any;
  usersRank: any;
  viewRefreshPage: boolean;

  constructor(
    public navCtrl: NavController,
    public ranks: Ranks,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();

    this.ranks.getPositioning()
    .then(response => {
      this.loading.dismiss();
      this.usersRank = response;
    })
    .catch(error => {
      this.loading.dismiss();
      if(!!error.name) {
        this.viewRefreshPage = true;
      } else {
        let toast = this.toastCtrl.create({
          message: 'Houve um erro! Não será exebido o rank :(',
          duration: 3000
        });
        toast.present();
      }
    })
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
