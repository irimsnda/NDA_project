import { Injectable } from '@angular/core';
import { AppSettings } from '../../app-settings';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';  
  
@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {
  config: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';

  constructor(private sanitizer:DomSanitizer , private authService: AuthService,private httpClient: HttpClient, private http: Http) { }
  onLoadNavigation(navigation_type_id: number) {

    let user = this.authService.getUserDetails();
    
    if(user){
      this.data = {
        is_local:user.is_local,
        navigation_type_id: navigation_type_id,

      };
    }
    else{
      this.data = {
        navigation_type_id: navigation_type_id
      };
    }
    
    this.config = {
      params:  this.data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getNavigationItems', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  }

  onLoadServicesDataset(module_id) {
    
    this.config = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getOrganisationServices', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  }
  getSafeUrl(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  getProhibitedProducts(): Observable<any> {
    this.config = {
      headers: { 'Accept': 'application/json' }
    };

    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getProhibitedProducts', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadContactdetails(){
    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getContactdetails', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onLoadAppSubmissionGuidelines(sub_module_id,section_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadConfigurationData(data) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  
  onLoadAsynchConfigurationData(data) {
    
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    
    return this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  funcEncryptData(value){
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
      mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding
    });
   
    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get( value){
    var key = CryptoJS.enc.Utf8.parse(this.key);
    var iv = CryptoJS.enc.Utf8.parse(this.key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  onLoadPortalConfigurationData(data) {

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getPortalCommonMisParams', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  
  onApplicationProcessGuidelines(data) {

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getonApplicationProcessGuidelines', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  getAccessToken() {
    let userDetails = JSON.parse(localStorage.getItem('user'));
    return userDetails.access_token;
  }
  getSectionUniformApplicationProces(sub_module_id, status_id, section_id= null,prodmanufacuredsection_id=null,prodclass_category_id= null,appsubmissions_type_id= null) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { status_id: status_id, sub_module_id: sub_module_id,section_id:section_id,prodmanufacuredsection_id:prodmanufacuredsection_id,prodclass_category_id:prodclass_category_id,appsubmissions_type_id:appsubmissions_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getUniformSectionApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  
  getSectionUniformApplicationProcesWithValidation(sub_module_id, status_id, section_id= null,prodclass_category_id= null,reg_id=null,reg_iddefination=null,appsubmissions_type_id=null) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { status_id: status_id, sub_module_id: sub_module_id,section_id:section_id,prodclass_category_id:prodclass_category_id,reg_id:reg_id,reg_iddefination:reg_iddefination,appsubmissions_type_id:appsubmissions_type_id},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'configurations/getSectionUniformApplicationProcesWithValidation', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  onLoadCountries() {
   
    var data = {
      table_name: 'par_countries',
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data;
      },
      error => {
        return false;
      });
  }
  onLoadRegions(country_id) {
    
     var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data;
      },
      error => {
        return false
      });
  }
  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        return data
      },
      error => {
        return false;
      });
  }
  getApplicationProces(section_id, sub_module_id) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    this.config = {
      params: { section_id: section_id, sub_module_id: sub_module_id },
      headers: headers
    };

    return this.httpClient.get(AppSettings.base_url + 'configurations/getApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  returnReportIframe(report_url){
    let iframe = '<iframe class="w-100 h-100" style="height:650px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  
  returnFixedHeightReportIframe(report_url,height){
    let iframe = '<iframe class="w-100 h-100" style="height:"'+height+'" !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  returnReportIframeFill(report_url){
    let iframe = '<iframe class="col-lg-12 row" style="height:750px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
}
