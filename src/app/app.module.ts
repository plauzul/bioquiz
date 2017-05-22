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

// Components
import { GoPage } from '../components/go-page/go-page';

// Providers
import { Auth } from '../providers/auth';
import { Users } from '../providers/users';

@NgModule({
  declarations: [
    GoPage,
    MyApp,
    HomePage,
    Initial,
    Register,
    Login
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
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Users,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
