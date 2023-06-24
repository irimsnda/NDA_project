import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Http,Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppSettings } from '../../app-settings';
@Injectable({
  providedIn: 'root'
})
export class DocumentManagementService {
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  premisesapp_details: any;
  constructor(private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();
    if(user){
      this.trader_id = user.trader_id;
      this.mistrader_id = user.mistrader_id;
      this.email_address = user.email_address;
    }
   
  }
  onLoadApplicationDocploads( params, action_url) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/'+action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadnonStructureApplicationDocploads(record_id, column_name, table_name,document_type_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { record_id: record_id, column_name: column_name, table_name: table_name,document_type_id:document_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/getUnstructuredApplicationDocploads', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadProductImagesRequirements( application_code, section_id, sub_module_id, document_type_id,status_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { document_type_id: document_type_id, application_code: application_code, section_id: section_id, sub_module_id: sub_module_id,status_id:status_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/onLoadProductImagesRequirements', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadDocRequirements( application_code, section_id, sub_module_id, document_type_id,status_id,query_ref_id,prodclass_category_id,business_type_id=0,permit_product_id=0) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { document_type_id: document_type_id, application_code: application_code, section_id: section_id, sub_module_id: sub_module_id,status_id:status_id,query_ref_id:query_ref_id,prodclass_category_id:prodclass_category_id ,business_type_id:business_type_id, permit_product_id:permit_product_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/getDocumentRequirements', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getApplicationDocumentDownloadurl(application_code, node_ref, document_id) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, 'application_code':application_code, node_ref:node_ref, document_id:document_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/getApplicationDocumentDownloadurl', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getApplicationDocumentPreviousVersions(application_code, node_ref) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, 'application_code':application_code, node_ref:node_ref},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'documentmanagement/getApplicationDocumentPreviousVersions', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onApplicationDocumentDelete(application_code, node_ref, record_id,action_path) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'documentmanagement/'+action_path, '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_code': application_code, 'node_ref': node_ref, record_id: record_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }uploadApplicationDMSDocument(uploadData,  module_id, sub_module_id, section_id,  application_code, document_type_id,action_url) {
    var headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url +  'documentmanagement/'+action_url, uploadData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address, sub_module_id: sub_module_id, module_id: module_id, application_code: application_code, document_type_id: document_type_id } })
      .pipe(map(data => {
        return data;
      }));
  }
  uploadApplicationDMSUnstructuredDocument(uploadData,  module_id, sub_module_id, application_code, document_type_id,table_name, column_name,foreignkey_id) {
    var headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url +  'documentmanagement/uploadApplicationDMSUnstructuredDocument', uploadData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address, sub_module_id: sub_module_id, module_id: module_id, application_code: application_code, document_type_id: document_type_id, table_name: table_name,'column_name':column_name,foreignkey_id:foreignkey_id } })
      .pipe(map(data => {
        return data;
      }));
  }
}
