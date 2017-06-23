import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Users } from '../../providers/users';
import { User } from '../../model/user.model';
import { Week } from '../../model/week.model';
import { Login } from '../login/login';
import { Chart } from 'chart.js';
import { Simulation } from '../../providers/simulation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  hour: number = new Date().getHours();
  messageWelcome: string;
  user: User = new User();
  resultsUser: Week = new Week();
  viewAfterSplash: boolean;
  viewRefreshPage: boolean;
  messageReport: string;
  weeklyAverage: number;

  constructor(
    public navCtrl: NavController,
    public users: Users,
    public toastCtrl: ToastController,
    public simulation: Simulation,
    public navParams: NavParams
  ) {
    if(!!this.navParams.data.bounceOut) {
      this.viewAfterSplash = true;
    } else {
      setTimeout(() => {
        this.viewAfterSplash = false;
      }, 5000);
    }
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
      this.user = JSON.parse(localStorage.getItem("userLogged"));
      this.presentChart();
    })
    .catch(error => {
      if(!!error.name) {
        this.viewRefreshPage = true;
      } else {
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
      }
    });
  }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  presentChart() {
    this.simulation.getResult(JSON.parse(localStorage.getItem("userLogged")).id)
    .then(response => {
      response.forEach((value) => {
        let parts = value.created_at.split(" ")[0].split("-");
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let day = parseInt(parts[2], 10);
        let date = new Date(year, month, day);
        let week = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
        let dia = week[date.getDay()];
        this.resultsUser[dia] = value.percentage;
      });

      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'line',
        data : {
          labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
          datasets: [
            {
              label: 'Porcentagem',
              fillColor: 'rgba(220, 220, 220, 0.2)',
              strokeColor: 'rgba(220, 220, 220, 1)',
              pointColor: 'rgba(220, 220, 220, 1)',
              pointStrokeColor: '#fff',
              pointHighlighFill: '#fff',
              pointHighlighStroke: 'rgba(220, 220, 220, 1)',
              data: [
                parseInt(this.resultsUser.segunda) || 0,
                parseInt(this.resultsUser.terca) || 0,
                parseInt(this.resultsUser.quarta) || 0,
                parseInt(this.resultsUser.quinta) || 0,
                parseInt(this.resultsUser.sexta) || 0,
                parseInt(this.resultsUser.sabado) || 0,
                parseInt(this.resultsUser.domingo) || 0
              ]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }]
          }
        }
      });
      this.presentMessageReport();
    })
    .catch(error => {
      let toast = this.toastCtrl.create({
        message: 'Houve um erro desconhecido, o relatório não será exibido',
        duration: 3000
      });
      toast.present();
    });
  }

  presentMessageReport() {
    this.weeklyAverage =
    (
      (
        (parseInt(this.resultsUser.segunda) / 100) || 0 +
        (parseInt(this.resultsUser.terca) / 100) || 0 +
        (parseInt(this.resultsUser.quarta) /100) || 0 +
        (parseInt(this.resultsUser.quinta) / 100) || 0 +
        (parseInt(this.resultsUser.sexta) / 100) || 0 +
        (parseInt(this.resultsUser.sabado) / 100) || 0 +
        (parseInt(this.resultsUser.domingo) / 100) || 0
      ) / 7
    ) * 100;

    if(this.weeklyAverage >= 0 && this.weeklyAverage <= 10) {
      this.messageReport = "tente estudar um pouco mais";
    } else if(this.weeklyAverage > 10 && this.weeklyAverage <= 30) {
      this.messageReport = "está mais ou menos, mais pode ficar melhor";
    } else if(this.weeklyAverage > 10 && this.weeklyAverage <= 50) {
      this.messageReport = "parabéns, está no caminho certo";
    } else if(this.weeklyAverage > 50 && this.weeklyAverage <= 70) {
      this.messageReport = "uau que semana incrivel!";
    } else if(this.weeklyAverage > 70 && this.weeklyAverage <= 100) {
      this.messageReport = "simplemeste está tendo uma semana perfeita!";
    }
  }

}
