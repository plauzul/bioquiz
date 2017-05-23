import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Simulation } from '../../providers/simulation';

@IonicPage()
@Component({
  selector: 'page-simulations',
  templateUrl: 'simulations.html',
})
export class Simulations {

  loading: any;
  proofs: Array<{ id: number, name: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public simulation: Simulation) {
  }

  ionViewDidEnter() {
    this.presentLoadingCustom();

    this.simulation.getProofs()
      .then(response => {
        console.log(response);
        this.loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        this.loading.dismiss();
      })
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
