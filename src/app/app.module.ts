import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Initial } from '../pages/initial/initial';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { Simulations } from '../pages/simulations/simulations';
import { Notifications } from '../pages/notifications/notifications';
import { Rank } from '../pages/rank/rank';
import { Settings } from '../pages/settings/settings';
import { Questions } from '../pages/questions/questions';
import { ResultQuestions } from '../pages/result-questions/result-questions';

// Components
import { GoPage } from '../components/go-page/go-page';

// Providers
import { Auth } from '../providers/auth';
import { Users } from '../providers/users';
import { Simulation } from '../providers/simulation';
import { Ranks } from '../providers/ranks';
import { Network } from '@ionic-native/network';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    GoPage,
    MyApp,
    HomePage,
    Initial,
    Register,
    Login,
    Simulations,
    Notifications,
    Rank,
    Settings,
    Questions,
    ResultQuestions
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Initial,
    Register,
    Login,
    Simulations,
    Notifications,
    Rank,
    Settings,
    Questions,
    ResultQuestions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Users,
    Simulation,
    Ranks,
    Network,
    Facebook,
    HeaderColor,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
