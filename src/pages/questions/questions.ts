import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Slides } from 'ionic-angular';
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
  params: any;
  viewAlreadyIn: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public simulation: Simulation,
    public toastCtrl: ToastController
  ) {
    this.params = this.navParams.data;
  }

  ionViewDidLoad() {
    if(localStorage.getItem("alreadyIn")) {
      this.viewAlreadyIn = false;
      this.getQuestions();
    } else {
      this.viewAlreadyIn = true;
      localStorage.setItem("alreadyIn", "true");
    }
  }

  getQuestions() {
    this.presentLoadingCustom();

    this.simulation.getQuestions(this.params.id)
     .then(response => {
       this.loading.dismiss();
       if(!!response.status) {
         this.notQuestions = true;
       } else {
         this.questions = this.shuffle(response);
       }
     })
     .catch(error => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Houve um erro! tente novamente.',
        duration: 3000
      });
      toast.present();
      setTimeout(() => {
        this.navCtrl.setRoot(Simulations);
      }, 3000);
     })
  }

  gotItTuturial() {
    this.viewAlreadyIn = false;
    this.getQuestions();
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
    if(this.slides.getActiveIndex() >= 10) {
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

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


}
