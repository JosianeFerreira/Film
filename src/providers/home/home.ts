import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()

export class HomeProvider {

  lCallBack: any;
  lResult: number=0;

  users: {usr_id: string, usr_endereco: string } = {
    usr_id: '',
    usr_endereco: ''
  };

  constructor(public http: Http, public api: Api) {
    console.log('Hello HomeProvider Provider');
  }


  UpdateRecord(information: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.api.posts('api/updateusuario', information, options)
      .subscribe(res => {
        this.lCallBack = res;
        console.log(this.lCallBack);
        this.lResult = 1;
      }, (err) => {
        console.log(err);// Error getting the data      
        this.lResult = 0;
      });
    return this.lResult;
  }

}
