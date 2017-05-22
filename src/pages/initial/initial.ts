import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class Initial {

  @ViewChild(Slides) slides: Slides;
  currentSlide: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.currentSlide = this.slides.getActiveIndex();
  }

  slideChanged() {
    this.currentSlide = this.slides.getActiveIndex();
  }

}
