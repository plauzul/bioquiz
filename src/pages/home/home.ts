import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Users } from '../../providers/users';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public users: Users, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.users.getUser()
      .then(response => {
        localStorage.setItem("userLogged", JSON.stringify(response));
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
            message: 'Houve um erro desconhecido você será direcionado ao login!',
            duration: 3000
          });
          toast.present();
          setTimeout(() => {
            localStorage.removeItem("userLogged");
            localStorage.removeItem("token");
            this.navCtrl.setRoot(Login);
          }, 3000);
      })
  }

}
