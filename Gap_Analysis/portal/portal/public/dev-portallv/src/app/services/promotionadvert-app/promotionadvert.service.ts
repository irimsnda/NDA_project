import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppSettings } from '../../app-settings';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionadvertService {
  config:any;
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  app_details: any;

  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) { 
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

  }
  onSavePromotionalAdvertapplication(productData,action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url +action_url, productData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadApplicationCounterDetails(filter_params){
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    filter_params.trader_id =  user.trader_id;
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'promotionadverts/getApplicationsCounter', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onApplicationLoading(filter_params) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    filter_params.trader_id =  user.trader_id;
    this.config = {
      params:filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'promotionadverts/getPromotionAlderrApplication', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  getApplicationDetail() {
    return this.app_details;
  }
  setApplicationDetail(data: any[]) {
    this.app_details = data;
  }

  getPromotionalAppOtherDetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  OnDeletePromotionalOtherDetails(record_id,table_name,application_id,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'promotionadverts/onDeleteOtherApplicationsDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_id:application_id,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
}
