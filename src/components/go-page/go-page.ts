import { Directive, HostListener, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Register } from '../../pages/register/register';
import { Login } from '../../pages/login/login';
import { Simulations } from '../../pages/simulations/simulations';
import { Notifications } from '../../pages/notifications/notifications';
import { Rank } from '../../pages/rank/rank';
import { Settings } from '../../pages/settings/settings';
import { Questions } from '../../pages/questions/questions';


@Directive({
  selector: '[go-page]' // Attribute selector
})
export class GoPage {

  @Input('go-page') goPage: string;
  @Input('root') root: boolean;
  @Input('params') params: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'register', component: Register },
      { title: 'login', component: Login },
      { title: 'questions', component: Questions }
    ];
  }

  @HostListener('click') click() {
    let page = this.pages.filter((val) => {
      return val.title == this.goPage;
    });

    if(this.root) {
      !!this.params ? this.navCtrl.setRoot(page[0].component, JSON.parse(this.params)) : this.navCtrl.setRoot(page[0].component);
    }else {
      !!this.params ? this.navCtrl.push(page[0].component, JSON.parse(this.params)): this.navCtrl.push(page[0].component);
    }
  }

}
