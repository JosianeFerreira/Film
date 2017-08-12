import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContactsProvider {

  lRetorno: any;
  lCallBack: any;
  lResult: number = 0;

   contacts: { usr_id: string, con_nome: string, con_email: string } = {
     usr_id: localStorage.getItem('usr_id'),
     con_nome:'',
     con_email:''
   };

  constructor(public http: Http, public api: Api) {
    console.log('Hello ContactsProvider Provider');
  }

   AddRecord(information: any) {
   let headers = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({ headers: headers});

   this.api.posts('api/cadastrarcontatos', information, options)
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

  getContacts(information: any) {
    console.log(information.usr_id + 'information');
    let seq = this.api.posts('api/contacts', information);
    let values: any;
    seq.map(res => res.json());
    return seq;
  };

  // getContacts(information: any) {
  //  let headers = new Headers({'Content-Type': 'application/json'});
  //  let options = new RequestOptions({ headers: headers});

  //  this.api.posts('api/contacts', information, options)
  //  .subscribe(res=>{
  //    this.lCallBack = res;
  //    console.log(this.lCallBack);
  //    this.lResult=1;
  //  }, (err)=>{
  //    console.log(err);
  //    this.lResult = 0;
  //  });

  //  return this.lResult;
  // }
}
