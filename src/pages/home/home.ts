import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomeProvider } from '../../providers/home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    objeto: { ur_id: any, usr_nome: string, usr_email: string, usr_endereco: string  } = {
    ur_id:localStorage.getItem('usr_id'),
    usr_nome:localStorage.getItem('usr_nome'), 
    usr_email:localStorage.getItem('usr_email'),
     usr_endereco:localStorage.getItem('usr_endereco')
   };

  
data: any;

  constructor(public navCtrl: NavController, public toast: ToastController, public home: HomeProvider) {
console.log(localStorage.getItem('usr_id'));

  }

  ionViewWillEnter() {
   let token = localStorage.getItem('token');
    if (token == '') {
      this.presentToast('Não vai rolar');
    }
  }


    presentToast(pMessage: string) {
    let toast = this.toast.create({
      message: pMessage,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.setRoot(TabsPage);
    });

    toast.present();
  }

  atualizaUsuario(){
    this.home.UpdateRecord(this.objeto);
  }

}
