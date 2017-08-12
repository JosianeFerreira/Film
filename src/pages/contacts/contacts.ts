import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import {LoginPage} from '../login/login';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public ldata: any;
  public objeto: any = this.contacts.contacts;

  // variáveis para Observable
  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public contacts: ContactsProvider,
          public toast: ToastController) {
  }


  ionViewWillEnter() {
    let token = localStorage.getItem('token');
    this.objeto.usr_id = localStorage.getItem('usr_id');
    if (token == '') {
      this.presentToast('Não vai rolar');
    }
    else {  
      this.doAtualizarDados();
    }
  }


  doRegistro() {
    this.data = new Observable(observer => {
      // inclusao do registro
      setTimeout(() => {
        this.contacts.AddRecord(this.objeto);
        observer.next();
        console.log("1");
      }, 500);

      // listar os dados
      setTimeout(() => {
        observer.next();
        this.doAtualizarDados();
        console.log("2");
        // limpa campos da tela
        this.objeto.con_nome = '';
        this.objeto.con_email = '';
      }, 1000);

    });

    // código que aguarda todas as tarefas
    let subscription = this.data.subscribe(
      value => this.values.push(),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  doAtualizarDados() {
    this.contacts.getContacts(this.objeto).subscribe(res => {
      console.log('atualizando');
      this.ldata = res.json();
      console.log(this.ldata);
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
