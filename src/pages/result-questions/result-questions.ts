import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-result-questions',
  templateUrl: 'result-questions.html',
})
export class ResultQuestions {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  messageResult: string;
  messageColor: string;
  wrongs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let percentage = parseInt(this.navParams.data.percentage);
    this.wrongs = this.navParams.data.wrongs;
    if(percentage >= 0 && percentage <= 20) {
      this.messageResult = "Pô cara, você consegue mais que isso.";
      this.messageColor = "danger";
    } else if(percentage > 20 && percentage <= 79) {
      this.messageResult = "Ta legal mas, tente um pouco mais!";
      this.messageColor = "yellow";
    } else if(percentage > 79 && percentage <= 100) {
      this.messageResult = "Arrasou cara, você é realmente TOP";
      this.messageColor = "primary";
    }
    this.presentChart();
  }

  presentChart() {
  	this.barChart = new Chart(this.barCanvas.nativeElement, {
  		type: 'bar',
      data: {
      	labels: ["Hoje"],
        	datasets: [{
						label: 'Porcentagem de acertos',
            data: [parseInt(this.navParams.data.percentage) || 0],
						backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
						],
						borderColor: [
								'rgba(255,99,132,1)',
						],
						borderWidth: 1
					}]
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
  }

}
