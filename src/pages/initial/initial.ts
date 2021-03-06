import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html'
})
export class Initial {

  @ViewChild(Slides) slides: Slides;
  currentSlide: number;
  viewAfterSplash: boolean;

  constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.viewAfterSplash = true;
    }, 5000);
    this.currentSlide = this.slides.getActiveIndex();
  }

  slideChanged() {
    this.currentSlide = this.slides.getActiveIndex();
  }

}
