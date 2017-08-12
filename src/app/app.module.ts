import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ContactsPage } from '../pages/contacts/contacts';
import { MoviesPage } from '../pages/movies/movies';
import { Api } from '../providers/api/api';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroProvider } from '../providers/cadastro/cadastro';
import { LoginProvider } from '../providers/login/login';
import { HomeProvider } from '../providers/home/home';
import { ContactsProvider } from '../providers/contacts/contacts';
import { MoviesProvider } from '../providers/movies/movies';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CadastroPage,
    ContactsPage,
    MoviesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CadastroPage,
    ContactsPage,
    MoviesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CadastroProvider,
    Api,
    AUTH_PROVIDERS,
    AuthHttp,
    {
      provide: AuthConfig, useValue: new AuthConfig({
        tokenName: 'token'
      })
    },
    LoginProvider,
    HomeProvider,
    ContactsProvider,
    MoviesProvider
  ]
})
export class AppModule { }
