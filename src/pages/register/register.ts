import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../model/user.model';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public toastCtrl: ToastController) {
  }

  register() {
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
