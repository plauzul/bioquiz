import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Login } from '../login/login';

import { Simulation } from '../../providers/simulation';

@IonicPage()
@Component({
  selector: 'page-simulations',
  templateUrl: 'simulations.html',
})
export class Simulations {

  loading: any;
  proofs: Array<{ id: number, name: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public simulation: Simulation, public toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.presentLoadingCustom();

    this.simulation.getProofs()
      .then(response => {
        this.proofs = response;
        this.loading.dismiss();
      })
      .catch(error => {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Houve um erro! Recomendamos que seja feito o login novamente.',
          duration: 3000
        });
        toast.present();
        setTimeout(() => {
          this.navCtrl.setRoot(Login);
        }, 3000);
      })
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
