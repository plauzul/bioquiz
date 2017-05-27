import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Login } from '../login/login';
import { QuestionsSimulation } from '../../model/questions-simulation.model';

import { Simulation } from '../../providers/simulation';

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class Questions {

  loading: any;
  notQuestions: boolean;
  questions: any;
  questionsSimulation: QuestionsSimulation = new QuestionsSimulation();

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public simulation: Simulation, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();

    this.simulation.getQuestions(this.navParams.data.id)
     .then(response => {
       this.loading.dismiss();
       if(!!response.status) {
         this.notQuestions = true;
       } else {
         this.questions = response;
       }
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

  finished() {
    this.simulation.setResult(JSON.parse(localStorage.getItem("userLogged")).id, this.navParams.data.id, this.questionsSimulation);
  }


}
