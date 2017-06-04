import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { User } from '../../model/user.model';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  user: User = new User();

  constructor(public navCtrl: NavController, public auth: Auth, public toastCtrl: ToastController, public network: Network, public fb: Facebook) {
  }

  register() {
    if(this.network.type == "none") {
      let toast = this.toastCtrl.create({
        message: 'Por favor conecte-se a internet para poder continuar!',
        duration: 3000
      });
      toast.present();
    } else {
      this.auth.register(this.user)
        .then(response => {
          localStorage.setItem('token', response.token);
          this.navCtrl.setRoot(HomePage);
        })
        .catch(error => {
          let toast = this.toastCtrl.create({
            message: 'Verefique se seus dados estão corretos!',
            duration: 3000
          });
          toast.present();
      });
    }
  }

  registerWithFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        alert(JSON.stringify(res.authResponse));
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

}
