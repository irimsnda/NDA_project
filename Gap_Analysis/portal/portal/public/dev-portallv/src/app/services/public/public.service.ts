import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app-settings';
import { map } from 'rxjs/operators';


import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  config: any;
  application_details:any;
  constructor(public myRoute: Router, public http: Http, public httpClient: HttpClient) { }
 
  
  
  OnSearchRegistrationDataSets(searchFrmData,path) {
    var headers = new HttpHeaders({
      "Accept": "application/json"
    });

    this.config = {
     // headers: headers,
      params:searchFrmData
    };
    return this.httpClient.get(AppSettings.base_url + 'publicaccess/'+path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  } onsaveApplicationUniformDetails(application_code, permitData,action_url) {

    var headers = new Headers({
      "Accept": "application/json"
    });
    return this.http.post(AppSettings.base_url + 'utilities/'+action_url, permitData, { params: { application_code: application_code,  'trader_id': ''}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }onGetApplicationDetails(searchFrmData,path) {
    var headers = new HttpHeaders({
      "Accept": "application/json"
    });
    this.config = {
     // headers: headers,
      params:searchFrmData
    };
    return this.httpClient.get(AppSettings.base_url + path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  
  onPermitApplicationLoading(action_url,filter_params){

    var headers = new HttpHeaders({
      "Accept": "application/json"
    });

    filter_params.mistrader_id = filter_params.applicant_id;
    
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
