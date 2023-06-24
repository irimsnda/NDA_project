import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { TraderAccountMdl } from '../../models/sharedpublicmdl.model';
import { AppSettings } from '../../app-settings';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  config:any;
  trader_id:number;
  constructor(private authService:AuthService, private myRoute: Router,private http: Http,private httpClient: HttpClient) { }
  onCreateAccount(traderData:TraderAccountMdl,uploadData,action_url){
    let traderData_sub = JSON.stringify(traderData) 
    var headers= new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    this.config = {
      params: {traderData_sub},
      
    };
    return this.http.post(AppSettings.base_url+'tradermanagement/'+action_url,uploadData, this.config)
        .pipe(map(data => {
            return data;
        }));
  }

  onCreateUserAccount(traderData,action_url){
    let traderData_sub = JSON.stringify(traderData) 

    var headers= new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let user = this.authService.getUserDetails();

    traderData.trader_id = user.trader_id;
    traderData.traderemail_address =  user.traderemail_address;
   
    traderData
    this.config = {
      params: {
        trader_id:this.trader_id,
        traderemail_address:user.traderemail_address
      },
      
    };
    return this.http.post(AppSettings.base_url+'tradermanagement/'+action_url,traderData, this.config)
        .pipe(map(data => {
            return data;
        }));
  }
  
  onSaveTradersApplicationInformation(data,mistrader_id){

    return this.http.post(AppSettings.base_url+'tradermanagement/onSaveTradersApplicationInformation',data,{params:{mistrader_id:mistrader_id}})
        .pipe(map(data => {
            return data;
        }));
  }
  //onload
  onLoadtraderApplicationInformation(mistrader_id){
   
    var headers = new HttpHeaders({
      "Accept": "application/json",
      
    });
    this.config = {
      params: { mistrader_id: mistrader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'tradermanagement/onLoadTradersApplicationInformation', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  onValidateAccountEmail(email_address,action_url){
   
    var headers = new HttpHeaders({
      "Accept": "application/json",
    });
    this.config = {
      params: { email_address: email_address },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'tradermanagement/'+action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  //
  onGetTraderInformation(){
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    var headers = new HttpHeaders({
      "Accept": "application/json",
    });
    this.config = {
      params: { trader_id: this.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'tradermanagement/getTraderInformation', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadTraderAccountUsers(){
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    var headers = new HttpHeaders({
      "Accept": "application/json",
    });
    this.config = {
      params: { trader_id: this.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'tradermanagement/gettraderUsersAccountsManagementDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
}
