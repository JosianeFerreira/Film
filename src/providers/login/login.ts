import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Api} from '../api/api'

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {

   login: { usr_email: string, usr_senha: string } = {
     usr_email:'',
     usr_senha:''
   };

  constructor(public http: Http, public api: Api) {
    console.log('Hello LoginProvider Provider');
  }

   autenticacaoUsuario(Authuser:any){

    let seq = this.api.post('autenticar', Authuser);
    seq.map(res => res.json());
    return seq;
   }


}
