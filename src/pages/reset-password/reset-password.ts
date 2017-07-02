import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../model/user.model';
import { PasswordReset } from '../../providers/reset-password';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  @ViewChild(Slides) slides: Slides;
  user: User = new User();
  step2: boolean;
  step3: boolean;
  loading: any;
  viewRefreshPage: boolean;

  constructor(
    public navCtrl: NavController,
    public passwordReset: PasswordReset,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
  }

  sendEmail() {
    this.presentLoadingCustom();
    this.passwordReset.email(this.user)
    .then(response => {
      this.step2 = true;
      setTimeout(() => {
        this.slides.slideNext();
        this.loading.dismiss();
      }, 500);
    })
    .catch(error => {
      this.loading.dismiss();
      if(error.status == 404) {
        let toast = this.toastCtrl.create({
          message: 'Email não encontrado em nossos servidores!',
          duration: 3000
        });
        toast.present();
      } else if(!!error.name) {
        this.viewRefreshPage = true;
      } else {
        let toast = this.toastCtrl.create({
          message: 'Houve um erro desconhecido tente novamente!',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  sendToken() {
    this.presentLoadingCustom();
    this.passwordReset.verifyToken(this.user)
    .then(response => {
      this.step3 = true;
      setTimeout(() => {
        this.slides.slideNext();
        this.loading.dismiss();
      }, 500);
    })
    .catch(error => {
      this.loading.dismiss();
      if(error.status == 404) {
        let toast = this.toastCtrl.create({
          message: 'Token não encontrado, verefique se digitou correto',
          duration: 3000
        });
        toast.present();
      } else if(!!error.name) {
        this.viewRefreshPage = true;
      } else {
        let toast = this.toastCtrl.create({
          message: 'Houve um erro desconhecido tente novamente!',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  sendPassword() {
    this.presentLoadingCustom();
    this.passwordReset.reset(this.user)
    .then(response => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Senha alterada com sucesso!',
        duration: 3000
      });
      toast.present();
      setTimeout(() => {
        this.navCtrl.setRoot(Login);
      }, 3000);
    })
    .catch(error => {
      this.loading.dismiss();
      if(!!error.name) {
        this.viewRefreshPage = true;
      } else {
        let toast = this.toastCtrl.create({
          message: 'Houve um erro desconhecido tente novamente!',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
