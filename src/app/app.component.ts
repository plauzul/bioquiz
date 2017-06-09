import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../model/user.model';

import { HomePage } from '../pages/home/home';
import { Initial } from '../pages/initial/initial';
import { Login } from '../pages/login/login';
import { Simulations } from '../pages/simulations/simulations';
// import { Notifications } from '../pages/notifications/notifications';
import { Rank } from '../pages/rank/rank';
// import { Settings } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = !!localStorage.getItem('token') ? HomePage : Initial;
  pages: Array<{ title: string, component: any, icon: string, badge: string }>;
  user: User = new User();
  activePage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.user = JSON.parse(localStorage.getItem("userLogged"));

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home", badge: "" },
      { title: 'Simulados', component: Simulations, icon: "bookmarks", badge: "" },
      // { title: 'Notificações', component: Notifications, icon: "notifications", badge: "4" },
      { title: 'Rank', component: Rank, icon: "trophy", badge: "" },
      // { title: 'Configurações', component: Settings, icon: "settings", badge: "" }
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
    this.activePage = page;
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