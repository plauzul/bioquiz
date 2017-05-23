import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  login() {
    this.presentLoadingCustom();
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
        } else if(error.status = 0) {
          let toast = this.toastCtrl.create({
            message: 'Conecte-se a internet para continuar!',
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
  
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
