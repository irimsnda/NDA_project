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
export class PremisesApplicationsService {
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  premisesapp_details: any;
  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

  }
  onPremisesApplicationLoading(filter_params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    filter_params.trader_id = this.trader_id;
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }

  onPremisesArchivedApplicationLoading() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: this.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesArchivedApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  onLoadPersonnelInformations() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { mistrader_id: this.mistrader_id }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPersonnelInformations', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }

    onLoadDirectorsInformations() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { mistrader_id: this.mistrader_id }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getDirectorsInformations', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadPersonnerQualifationsDetails(personnel_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      headers: headers,
      params: { personnel_id: personnel_id }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPersonnelQualifications', this.config)
      .pipe(map(data => {
        return <any>data;
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
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getTradersRegisteredPremises', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onCheckPendingPremisesRenewal(premise_target_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      headers: headers,
      params: { premise_target_id: premise_target_id }
    };

    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/checkPendingPremisesRenewal', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getPremisesApplicationDetail() {
    return this.premisesapp_details;
  }
  setPremisesApplicationDetail(data: any[]) {
    this.premisesapp_details = data;
  }

  onSavePremisesApplication(premise_id, premisesData, tracking_no) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesApplication', premisesData, { params: { premise_id: premise_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveRenPremisesApplication(premise_id, premisesData, tracking_no) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSaveRenPremisesApplication', premisesData, { params: { premise_id: premise_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesOtherDetails(premise_id, premisesOtherData) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesOtherDetails', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesAmmendmentsRequest(premise_id, premisesOtherData) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesAmmendmentsRequest', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  onSavePersonnelDetails(personnelData) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePersonnelDetails', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesPersonnelDetails(personnelData, premise_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesPersonnel', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesDirectorsDetails(personnelData, premise_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesDirectors', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesStaffDetails(personnelData, premise_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesStaff', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }



  onSavePremisesStoreLocationDetails(personnelData, premise_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePremisesStoreLocationDetails', personnelData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onSavePersonnelQualification(qualificationData) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onSavePersonnelQualification', qualificationData, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadPremisesOtherDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesOtherDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getpremisesApplicationDetails(application_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { application_id: application_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getpremisesApplicationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesPersonnelDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesPersonnelDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
    onLoadPremisesDirectorsDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesDirectorsDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
 onLoadPremisesStaffDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesStaffDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesStoreLocationDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesStoreLocationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadpremAmmendementsRequests(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesAmmendementsRequest', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesCounterDetails() {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'premisesregistration/getPremisesCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }


  onPremisesApplicationSubmit(premise_id, tracking_no) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onNewPremisesApplicationSubmit', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'premise_id': premise_id, 'tracking_no': tracking_no }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

 
  onDeletePremisesDetails(record_id, table_name, apppremises_id, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'premisesregistration/onDeletePremisesDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address, record_id: record_id, premise_id: apppremises_id, table_name: table_name, title: title }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onValidatePremisesOtherdetails(premise_id,table_name,title){
   
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
      
      'X-Requested-With': 'XMLHttpRequest'
    });

    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, premise_id: premise_id, table_name: table_name,title:title },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onValidatePremisesOtherdetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
      
  }
}