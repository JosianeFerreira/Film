import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  lRetorno: any;
  lCallBack: any;
  lResult: number = 0;

   movies: { usr_id: string, mov_nome: string, mov_categoria: string } = {
     usr_id: localStorage.getItem('usr_id'),
     mov_nome:'',
     mov_categoria:''
   };

   categoria: { cat_id: string, cat_desc: string } = {
     cat_id:'',
     cat_desc:''
   };

  constructor(public http: Http, public api: Api) {
    console.log('Hello ContactsProvider Provider');
  }

   AddRecord(information: any) {
   let headers = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({ headers: headers});

   this.api.posts('api/cadastrarfilmes', information, options)
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

  getMovies(information: any) {
    console.log(information.usr_id + 'information');
    let seq = this.api.posts('api/movies', information);
    let values: any;
    seq.map(res => res.json());
    return seq;
  };

  getCategoria() {
    let seq = this.api.get('categoria');
    let values: any;
    seq.map(res => res.json());
    return seq;
  };

}
