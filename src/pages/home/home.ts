import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Users } from '../../providers/users';
import { User } from '../../model/user.model';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hour: number = new Date().getHours();
  messageWelcome: string;
  user: User = new User();

  constructor(public navCtrl: NavController, public users: Users, public toastCtrl: ToastController) {
    this.user = JSON.parse(localStorage.getItem("userLogged"));
    if(this.hour >= 0 && this.hour <= 12) {
      this.messageWelcome = "Bom dia";
    } else if(this.hour > 12 && this.hour <= 18) {
      this.messageWelcome = "Boa tarde";
    } else if(this.hour > 18 && this.hour <= 23) {
      this.messageWelcome = "Boa noite";
    }
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
