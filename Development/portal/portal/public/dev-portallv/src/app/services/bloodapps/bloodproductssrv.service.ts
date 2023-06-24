import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app-settings';
import { map } from 'rxjs/operators';


import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BloodproductssrvService {
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  application_details: any;
  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

  }
  onSavePermitApplication(application_id, permitData, tracking_no,action_url ) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_id: application_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onsavePermitProductdetails(application_code, permitData, tracking_no,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url +action_url, permitData, { params: { application_code: application_code, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  
  onLoadApplicationCounterDetails(table_name,action_url) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, table_name:table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  
  onPermitApplicationLoading(action_url,filter_params){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    filter_params.trader_id = this.trader_id;
    filter_params.mistrader_id = this.mistrader_id;
    
    this.config = {
      params: filter_params,
      headers: headers
    };

    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  
}
