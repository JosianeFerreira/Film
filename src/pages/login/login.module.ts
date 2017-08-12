
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@NgModule({
  declarations: [
    LoginPage,
    TabsPage,
    HomePage,
    AboutPage,
    ContactPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    
  ],
})
export class LoginPageModule {}