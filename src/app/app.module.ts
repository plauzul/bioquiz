import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

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

// Components
import { GoPage } from '../components/go-page/go-page';

// Providers
import { Auth } from '../providers/auth';
import { Users } from '../providers/users';
import { Simulation } from '../providers/simulation';

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
    Settings
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    Settings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Users,
    Simulation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
