import { Directive, HostListener, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Register } from '../../pages/register/register';
import { Login } from '../../pages/login/login';

@Directive({
  selector: '[go-page]' // Attribute selector
})
export class GoPage {

  @Input('go-page') goPage: string;
  @Input('root') root: boolean;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'register', component: Register },
      { title: 'login', component: Login }
    ];
  }

  @HostListener('click') click() {
    let page = this.pages.filter((val) => {
      return val.title == this.goPage;
    });

    if(this.root) {
      this.navCtrl.setRoot(page[0].component);
    }else {
      this.navCtrl.push(page[0].component);
    }
  }

}
