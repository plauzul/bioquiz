import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { User } from '../../model/user.model';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  user: User = new User();
  loading: any;
  userID: any;
  viewRefreshPage: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public toastCtrl: ToastController,
    public network: Network,
    public fb: Facebook,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  register() {
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
        this.auth.register(this.user)
          .then(response => {
            this.loading.dismiss();
            localStorage.setItem('token', response.token);
            this.navCtrl.setRoot(HomePage, {
              bounceOut: true
            });
          })
          .catch(error => {
            this.loading.dismiss();
            if(JSON.parse(error._body).email[0]) {
              let toast = this.toastCtrl.create({
                message: JSON.parse(error._body).email[0],
                duration: 3000
              });
              toast.present();
            } else if(!!error.name) {
              this.viewRefreshPage = true;
            } else {
              let toast = this.toastCtrl.create({
                message: 'Verefique se seus dados estão corretos!',
                duration: 3000
              });
              toast.present();
            }
        });
      }
    }, 3000);
  }

  registerWithFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.userID = res.authResponse.userID;
        this.presentLoadingCustom();
        this.getDataFacebook();
      })
      .catch(e => {
        let alert = this.alertCtrl.create({
          title: 'Oops ocorreu um erro',
          subTitle: 'Tente fazer o registro com email e senha. Desculpe-nos',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  getDataFacebook() {
    this.fb.api("/" + this.userID + "?fields=id,name,picture,email", [])
    .then(response => {
      this.user.email = response.email;
      this.user.img = response.picture;
      this.user.name = response.name;
      this.user.password = "8af3066def0c62e85fc77a790cd3c67b" + this.userID;

      this.auth.login(this.user)
      .then(response => {
        this.loading.dismiss();
        localStorage.setItem('token', response.token);
        this.navCtrl.setRoot(HomePage, {
          bounceOut: true
        });
      })
      .catch(error => {
        if(error.status = 404) {
          this.auth.register(this.user)
          .then(response => {
            this.loading.dismiss();
            localStorage.setItem('token', response.token);
            this.navCtrl.setRoot(HomePage, {
              bounceOut: true
            });
          })
          .catch(error => {
            this.loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Oops ocorreu um erro',
              subTitle: 'Tente fazer o registro com email e senha. Desculpe-nos',
              buttons: ['OK']
            });
            alert.present();
          });
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
    })
    .catch(error => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops ocorreu um erro',
        subTitle: 'Tente fazer o registro com email e senha. Desculpe-nos',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um instante',
    });

    this.loading.present();
  }

}
