import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the CadastroProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CadastroProvider {

  lRetorno: any;
  lCallBack: any;
  lResult: number = 0;

  users: {usr_nome: string, usr_email: string, usr_senha: string} = {
    usr_nome:'',
    usr_email:'',
    usr_senha:''
  };


  constructor(public http: Http, public api: Api) {
    console.log('Hello CadastroProvider Provider');
  }

  AddRecord(information: any) {
   let headers = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({ headers: headers});

   this.api.post('cadastrarusuario', information, options)
   .subscribe(res=>{
     this.lCallBack = res;
     console.log(this.lCallBack);
     this.lResult=1;
   }, (err)=>{
     console.log(err);
     this.lResult = 0;
   });

   return this.lResult;
  }

}
