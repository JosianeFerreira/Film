import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import {LoginPage} from '../login/login';

/**
 * Generated class for the MoviesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

   public ldata: any;
   public objeto: any = this.movies.movies;
   public objetoCategoria: any = this.movies.categoria;
   public categorias: any;

  // variáveis para Observable
  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movies: MoviesProvider,
          public toast: ToastController) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');

  }

  ionViewWillEnter() {
    let token = localStorage.getItem('token');
    this.objeto.usr_id = localStorage.getItem('usr_id');
    if (token == '') {
      this.presentToast('Não vai rolar');
    }
    else {  
      this.doAtualizarDados();
      this.returnCategora();
    }
  }


  doRegistro() {
    this.data = new Observable(observer => {
      console.log(this.objeto);
      //inclusao do registro
      setTimeout(() => {
        this.movies.AddRecord(this.objeto);
        observer.next();
        console.log("1");
      }, 500);

      // listar os dados
      setTimeout(() => {
        observer.next();
        this.doAtualizarDados();
        console.log("2");
        // limpa campos da tela
        this.objeto.mov_nome = '';
        this.objeto.mov_categoria = '';
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
    this.movies.getMovies(this.objeto).subscribe(res => {
      console.log('atualizando');
      this.ldata = res.json();
      console.log(this.ldata);
      
    });
    console.log(this.movies.getCategoria());
  }

  returnCategora(){
    this.movies.getCategoria().subscribe(res=>{
    this.objetoCategoria = res.json();
    console.log(this.objetoCategoria);
    this.categorias = this.objetoCategoria;
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
