import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController } from 'ionic-angular'
import { Simulation } from '../../providers/simulation';

@IonicPage()
@Component({
  selector: 'page-simulations',
  templateUrl: 'simulations.html',
})
export class Simulations {

  loading: any;
  proofs: any;
  visibility: boolean = false;
  viewRefreshPage: boolean;
  visibilityMessageError: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public simulation: Simulation,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewDidEnter() {
    this.presentLoadingCustom();

    this.simulation.getProofs()
      .then(response => {
        this.proofs = response;
        localStorage.setItem("proofs", JSON.stringify(this.proofs));
        this.loading.dismiss();
      })
      .catch(error => {
        this.loading.dismiss();
        if(!!error.name) {
          this.viewRefreshPage = true;
        } else {
          let toast = this.toastCtrl.create({
            message: 'Houve um erro! Não será exibido os tipos de prova :(',
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

  filterProofs(ev: any) {
    let val = ev.target.value || '';

    this.proofs = JSON.parse(localStorage.getItem("proofs"));

    if (val && val.trim() != '') {
      this.proofs = this.proofs.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

    if(this.proofs[0]) {
      this.visibilityMessageError = false;
    } else {
      this.visibilityMessageError = true;
    }
  }

  presentActionSheet(idProof) {
    let proof = this.proofs.filter((value) => {
      return value.id == idProof;
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções para ' + proof[0].name,
      buttons: [
        {
          text: 'Não mostrar',
          role: 'destructive',
          icon: 'eye-off',
          handler: () => {
            console.log('não mostrar');
          }
        },{
          text: 'Favoritar',
          role: 'destructive',
          icon: 'star',
          handler: () => {
            console.log('favoritar');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('cancelar');
          }
        }
      ]
    });
    actionSheet.present();
  }

}