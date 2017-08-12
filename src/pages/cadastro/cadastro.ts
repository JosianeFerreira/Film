import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { ToastController } from 'ionic-angular';
import {LoginPage} from '../login/login';
/**
 * Generated class for the CadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  //public lData: any;
  public objeto: any = this.Cadastro.users;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Cadastro: CadastroProvider, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  doCadastroUsers(){
    this.Cadastro.AddRecord(this.objeto);
    this.presentToast('Cadastro OK!!!');
   // this.navCtrl.setRoot(LoginPage);

  }

  presentToast(pMessage: string) {
    let toast = this.toast.create({
      message: pMessage,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
       this.navCtrl.setRoot(LoginPage);
    });

    toast.present();
  }
}
