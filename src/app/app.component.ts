import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../model/user.model';

import { HomePage } from '../pages/home/home';
import { Initial } from '../pages/initial/initial';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = !!localStorage.getItem('token') ? HomePage : Initial;
  pages: Array<{ title: string, component: any, icon: string, badge: string }>;
  activePage: any;
  user: User = new User();

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.user = JSON.parse(localStorage.getItem("userLogged"));

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home", badge: "" },
      { title: 'Provas', component: HomePage, icon: "bookmarks", badge: "" },
      { title: 'Notificações', component: HomePage, icon: "notifications", badge: "4" },
      { title: 'Rank', component: HomePage, icon: "trophy", badge: "" },
      { title: 'Configurações', component: HomePage, icon: "settings", badge: "" }
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  checkActive(page) {
    return page == this.activePage;
  }

  exit() {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("token");
    this.nav.setRoot(Login);
  }
}