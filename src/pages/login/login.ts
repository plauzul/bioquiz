import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';
import { User } from '../../model/user.model';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  user: User = new User();
  loading: any;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public network: Network
  ) {
  }

  login() {
    this.presentLoadingCustom();
    setTimeout(() => {
      if(this.network.type == "none") {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Por favor conecte-se a internet para poder continuar!',
          duration: 3000
        });
        toast.present();
      } else {
        this.auth.login(this.user)
          .then(response => {
            this.loading.dismiss();
            localStorage.setItem('token', response.token);
            this.navCtrl.setRoot(HomePage);
          })
          .catch(error => {
            this.loading.dismiss();
            if(error.status = 404) {
              let toast = this.toastCtrl.create({
                message: 'Email ou senha incorretos!',
                duration: 3000
              });
              toast.present();
            } else {
              let toast = this.toastCtrl.create({
                message: 'Houve um erro desconhecido tente novamente!',
                duration: 3000
              });
              toast.present();
            }
        });
      }
    }, 3000);
  }
  
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
