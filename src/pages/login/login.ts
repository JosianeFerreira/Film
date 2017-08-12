import { Component } from '@angular/core';
import {  NavController, NavParams, IonicPage } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider} from '../../providers/login/login';
import {Api} from '../../providers/api/api';
import {ToastController} from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @IonicPage()


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  objeto: any = this.login.login;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public login: LoginProvider, public api: Api,
  public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goCadastro(){
    this.navCtrl.setRoot(CadastroPage);
  }

  autenticarUsuario(){ 

     this.login.autenticacaoUsuario(this.objeto).subscribe((resp) => {
       this.data = resp.json();
       console.log(this.data);
       if(this.data.status == 'nothing'){
        this.presentToast('Usuário ou senha incorreto!!!');
        this.objeto.usr_senha='';
        localStorage.setItem('token','');
       }
      else{
        this.api.token = this.data.tk;
        localStorage.setItem('token',this.data.tk);
        localStorage.setItem('usr_id',this.data.profile.usr_id);
        localStorage.setItem('usr_nome',this.data.profile.usr_nome);
        localStorage.setItem('usr_email',this.data.profile.usr_email);
        localStorage.setItem('usr_endereco',this.data.profile.usr_endereco);
        localStorage.setItem('usr_status',this.data.profile.usr_status);
        
        this.navCtrl.setRoot(TabsPage);
      }
     },(err) => {
        console.log('pateta!!!'+err);
      });
    
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
