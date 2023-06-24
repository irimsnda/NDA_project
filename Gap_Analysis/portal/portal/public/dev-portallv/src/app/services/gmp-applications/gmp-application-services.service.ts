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
export class GmpApplicationServicesService {
  config:any;
  trader_id:number;
  gmpapp_details:any;
  mistrader_id: number;
  email_address: string;
  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;


   }
  onLoadGmpCounterDetails(filter_params){
    let user = this.authService.getUserDetails();

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    filter_params.trader_id = user.trader_id 
    this.config = {
      params:filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getGMPApplicationcounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onGMPApplicationLoading(params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer '+this.authService.getAccessToken() ,
    });
    params.trader_id = this.trader_id;
    this.config = {
      params: params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getGmpApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  onGmpArchivedApplicationLoading() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer '+this.authService.getAccessToken() ,
    });
    this.config = {
      params: { trader_id: this.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getPremisesArchivedApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  
  onGmpApplicationArchive(manufacturing_site_id,tracking_no){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onNewPremisesApplicationArchive', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address,'manufacturing_site_id':manufacturing_site_id,'tracking_no':tracking_no}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  getGmpApplicationDetail() {
    return this.gmpapp_details;
  }
  setGmpApplicationDetail(data: any[]) {
      this.gmpapp_details = data;
  }
  queryGMPApplicationDetails(application_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { application_id: application_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getgmpApplicationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
 
  getGMPDataDetails(data,path){

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
  onLoadPersonnelInformations() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer '+this.authService.getAccessToken() ,
    });

    this.config = {
      headers: headers,
      params:{mistrader_id:this.mistrader_id}
    };

    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getPersonnelInformations', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onDeleteGMPDetails(record_id,table_name,apppremises_id,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onDeletePremisesDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,manufacturing_site_id:apppremises_id,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveGMPPersonnelDetails(personnelData,manufacturing_site_id){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSavePremisesPersonnel', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id,manufacturing_site_id:manufacturing_site_id}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveGmpOtherDetails(table_name,premisesOtherData,manufacturing_site_id){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSaveGmpOtherDetails', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,manufacturing_site_id:manufacturing_site_id,table_name:table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  } onSavemanufatcuringSiteBlocks(manufacturing_site_id,premisesOtherData){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSavemanufatcuringSiteBlocks', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,manufacturing_site_id:manufacturing_site_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavemanufatcuringContractDetails(premisesOtherData){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSavemanufatcuringContractDetails', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  
  
  onSaveGmpProductLineDetails(manufacturing_site_id,premisesOtherData){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSaveGmpProductLinedetails', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,manufacturing_site_id:manufacturing_site_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadPremisesPersonnelDetails(manufacturing_site_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { manufacturing_site_id: manufacturing_site_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getPremisesPersonnelDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadPremDocploads(manufacturing_site_id,reference_no, section_id,sub_module_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { manufacturing_site_id: manufacturing_site_id,reference_no:reference_no, section_id:section_id,sub_module_id:sub_module_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getPremisesDocploads', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onSaveGmpApplication(manufacturing_site_id,premisesData,tracking_no,registrant_details) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    let registrant_data = JSON.stringify(registrant_details);
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSaveGmpApplication', premisesData, { params: {manufacturing_site_id:manufacturing_site_id,tracking_no:tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address,registrant_data}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveRenewalGmpApplication(manufacturing_site_id,premisesData,tracking_no) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSaveRenewalGmpApplication', premisesData, { params: {manufacturing_site_id:manufacturing_site_id,tracking_no:tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadGmpOtherDetails(manufacturing_site_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { manufacturing_site_id: manufacturing_site_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getGMPOtherDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onGmpApplicationSubmit(manufacturing_site_id,tracking_no){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onNewGmpApplicationSubmit', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address,'manufacturing_site_id':manufacturing_site_id,'tracking_no':tracking_no}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePersonnelDetails(personnelData, manufacturing_site_id){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSavePersonnelDetails', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id,manufacturing_site_id:manufacturing_site_id}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadRegisteredPremises(params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    params.mistrader_id = this.mistrader_id;
    this.config = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(AppSettings.base_url + 'gmpinspection/getTradersRegisteredGMPapplications', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onValidateGmpProductOtherdetails(manufacturing_site_id,section_id){
   
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken()
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, manufacturing_site_id: manufacturing_site_id, section_id: section_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onValidateGmpProductOtherdetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
      
  }
  onSavePremisesPersonnelDetails(personnelData, manufacturing_site_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'gmpinspection/onSavePremisesPersonnel', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, manufacturing_site_id: manufacturing_site_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onValidatePremisesOtherdetails(manufacturing_site_id,table_name,title){
   
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
      
      'X-Requested-With': 'XMLHttpRequest'
    });

    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, manufacturing_site_id: manufacturing_site_id, table_name: table_name,title:title },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onValidateGMPOtherdetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
      
  }
}
