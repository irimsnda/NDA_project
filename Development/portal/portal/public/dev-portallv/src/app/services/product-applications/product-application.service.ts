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
export class ProductApplicationService {
  productapp_details: any;
  productapp_information: any;
  config: any;
  trader_id: number;
  email_address: string;
  mistrader_id:number;
  trader_user_id:number;
  account_role_id:number;
  constructor(private authService:AuthService,private myRoute: Router, private http: Http, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.trader_id = user.trader_id;
    this.email_address = user.email_address;
    this.trader_user_id = user.trader_user_id;
    this.account_role_id = user.account_role_id;

  }
  getProductApplicationDetail() {
      return this.productapp_details;
  }
  setProductApplicationDetail(data: any[]) {
    this.productapp_details = data;
  }
  
  onSaveProductApplication(productData,registrant_details,action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    let registrant_data = JSON.stringify(registrant_details);
    return this.http.post(AppSettings.base_url + 'productregistration/'+action_url, productData, { params: { 'trader_user_id': this.trader_user_id, 'trader_id': this.trader_id, 'email_address': this.email_address,registrant_data}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteRetentionProductsDetails(record_id,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/onDeleteRetentionProductsDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveApplicationOtherDetails(table_name,productOtherDetails,action_url){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/'+action_url, productOtherDetails, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,table_name:table_name }, headers: headers })
      .pipe(map(data => {
        
        return data;
      }));
  }
  onSaveProductNotification(productData,action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/'+action_url, productData, { params: { 'trader_user_id': this.trader_user_id,'trader_id': this.trader_id, 'email_address': this.email_address}, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }
  onSaveProductOtherDetails(table_name,productOtherDetails,product_id=null){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/onSaveProductOtherDetails', productOtherDetails, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,table_name:table_name,product_id:product_id }, headers: headers })
      .pipe(map(data => {
        
        return data;
      }));
  }
  
  onAddManufacturingSite(table_name,productOtherDetails){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/onAddManufacturingSite', productOtherDetails, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address,table_name:table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onProductApplicationLoading(filter_params,action_url,module_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
  //  filter_params.push({ trader_id: this.trader_id});
    filter_params.trader_id = this.trader_id;
    filter_params.trader_user_id = this.trader_user_id;
    filter_params.account_role_id = this.account_role_id;
    
    filter_params.module_id = module_id;
    
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'productregistration/'+action_url, this.config)
      .pipe(map(data => {
         return <any>data;
      }));
     
  }
  onProductNotificationLoading(filter_params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
  //  filter_params.push({ trader_id: this.trader_id});
    filter_params.trader_id = this.trader_id;
    filter_params.trader_user_id = this.trader_user_id;
    
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'productregistration/getproductNotificationsApps', this.config)
      .pipe(map(data => {
         return <any>data;
      }));
     
  }
  onLoadConfigurationData(data) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config)
      .pipe(map(data => {
        return data;
      }));
  }
  getProductApplicationInformation(application_code,action_url){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { application_code: application_code },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'productregistration/'+action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  getProductsOtherDetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    if(data != ''){
      data['mistrader_id']=this.mistrader_id; 
    }
    
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'productregistration/'+path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onDeleteProductsDetails(record_id,table_name,product_id,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/onDeleteProductsDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,product_id:product_id,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onProductApplicationSubmit(product_id,tracking_no){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'productregistration/onNewProductsApplicationSubmit', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address,'product_id':product_id,'tracking_no':tracking_no}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadProductsCounterDetails(){
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'productregistration/getProductsCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onValidateProductOtherdetails(product_id,section_id){
   
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
      
      'X-Requested-With': 'XMLHttpRequest'
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, product_id: product_id, section_id: section_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onValidateProductOtherdetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
      
  }
}
