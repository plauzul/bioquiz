import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Slides } from 'ionic-angular';
import { Login } from '../login/login';
import { QuestionsSimulation } from '../../model/questions-simulation.model';

import { ResultQuestions } from '../result-questions/result-questions';
import { Simulations } from '../simulations/simulations';

import { Simulation } from '../../providers/simulation';

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class Questions {

  @ViewChild(Slides) slides: Slides;
  loading: any;
  notQuestions: boolean;
  questions: any;
  questionsSimulation: QuestionsSimulation = new QuestionsSimulation();
  viewButton: boolean;

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
    this.simulation.setResult(JSON.parse(localStorage.getItem("userLogged")).id, this.navParams.data.id, this.questionsSimulation)
      .then(response => {
        this.navCtrl.setRoot(ResultQuestions, {
          percentage: response.percentage
        })
      })
      .catch(error => {
        let toast = this.toastCtrl.create({
          message: 'Houve um erro! Nos perdoe mas começe denovo.',
          duration: 3000
        });
        toast.present();
        setTimeout(() => {
          this.navCtrl.setRoot(Simulations);
        }, 3000);
      });
  }

  slideChanged() {
    if(this.slides.getActiveIndex() >= 1) { // depois mudar para 10
      this.viewButton = true;
    } else {
      this.viewButton = false;
    }
  }

  setId(idFor, idQuestion) {
    switch (idFor + 1) {
      case 1:
        this.questionsSimulation.idq1 = idQuestion
        break;
      case 2:
        this.questionsSimulation.idq2 = idQuestion;
        break;
      case 3:
        this.questionsSimulation.idq3 = idQuestion;
        break;
      case 4:
        this.questionsSimulation.idq4 = idQuestion;
        break;
      case 5:
        this.questionsSimulation.idq5 = idQuestion;
        break;
      case 6:
        this.questionsSimulation.idq6 = idQuestion;
        break;
      case 7:
        this.questionsSimulation.idq7 = idQuestion;
        break;
      case 8:
        this.questionsSimulation.idq8 = idQuestion;
        break;
      case 9:
        this.questionsSimulation.idq9 = idQuestion;
        break;
      case 10:
        this.questionsSimulation.idq10 = idQuestion;
        break;
    
      default:
        break;
    }
  }


}
