import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { Ranks } from '../../providers/ranks';

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class Rank {

  loading: any;
  usersRank: any;

  constructor(
    public navCtrl: NavController,
    public ranks: Ranks,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
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
      let toast = this.toastCtrl.create({
        message: 'Houve um erro! Não será exebido o rank :(',
        duration: 3000
      });
      toast.present();
    })
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
