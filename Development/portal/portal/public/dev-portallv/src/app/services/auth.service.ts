import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { SystemData } from '../models/sharedpublicmdl.model';
import { SpinnerVisibilityService } from 'ng-http-loader';
import * as CryptoJS from 'crypto-js';
import {EncrDecrService} from '../app-crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: Headers;
  email_address: string;
  message:string;
  config:any;
  private systemdata:SystemData[];
  cipherText:string;
  constructor(private spinner:SpinnerVisibilityService,private myRoute: Router, private httpClient: HttpClient, private http: Http,public toastr: ToastrService,private EncrDecr: EncrDecrService) { }
  login(trader_no: number, email_address: string, user_password: string) {
   // var user_password = this.EncrDecr.set(AppSettings.encryptSecretKey, user_password);
    var headers = new Headers({
      "Accept": "application/json"
    });
    return this.http.post(AppSettings.base_url + 'authentication/onUserLogin',
      {
        trader_no: trader_no,
        email_address: email_address,
        user_password: user_password
      },{ headers: headers }
    )
     .pipe(map(user => {
        return user;
      }));
  }
  
  onAdminlogin( email_address: string, user_password: string) {
   
    var headers = new Headers({
      "Accept": "application/json"
    });
    return this.http.post(AppSettings.base_url + 'authentication/onAdminlogin',
      {
        email_address: email_address,
        user_password: user_password
      },{ headers: headers }
    )
     .pipe(map(user => {
        return user;
      }));
  }
  getAccessToken() {
    let userDetails = JSON.parse(localStorage.getItem('user'));
    return userDetails.access_token;
  }
  getUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem('user'));
    return userDetails;
  }
  isLoggednIn() {
    return this.getAccessToken() !== null;
  }
  logout() {
    this.spinner.show();
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    let user = this.getUserDetails();
    localStorage.removeItem("LoggedInUser");
        localStorage.clear();
    return this.http.post(AppSettings.base_url + 'administration/onUserLogOut',{email_address:user.email_address} ,{ headers: headers })
      .pipe(map(data =>{
        localStorage.removeItem("LoggedInUser");
        localStorage.clear();
        this.myRoute.navigate(["../"]);
        
        location.reload();
        this.spinner.hide();
      })).subscribe();
  }
  adminLogout() {
    this.spinner.show();
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    let user = this.getUserDetails();
    localStorage.removeItem("LoggedInUser");
        localStorage.clear();
    return this.http.post(AppSettings.base_url + 'administration/onUserLogOut',{email_address:user.email_address} ,{ headers: headers })
      .pipe(map(data =>{
        localStorage.removeItem("LoggedInUser");
        localStorage.clear();
        this.myRoute.navigate(["../admin-login"]);
        
        location.reload();
        this.spinner.hide();
      })).subscribe();
  }
  
  onApplicationInitialisationCall(){

    let userDetails = JSON.parse(localStorage.getItem('user'));
      
      let user = this.getUserDetails();
     
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": 'Bearer '+this.getAccessToken() ,
        });
        this.config = {
          headers: headers,
          params:{email_address:user.email_address}
        };
    return this.httpClient.get(AppSettings.base_url + 'administration/onApplicationInitialisation', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
 
  onApplicationInitialisation(){
 
    if(this.getUserDetails()){
      this.onApplicationInitialisationCall()
      .subscribe(
        data=>{
          
            let response:any = <any>data;
           
            if(!response.success){
                this.myRoute.navigate(['/']);
                localStorage.removeItem("LoggedInUser");
                localStorage.clear();
                location.reload();
            }
          
        },error => {

          this.message = error.message;
          this.toastr.error(this.message, 'Alert!');
          this.myRoute.navigate(['/']);
          localStorage.removeItem("LoggedInUser");
          localStorage.clear();
          location.reload();
        }
      );
    }
  

  }
  private handleError(errorResponse: HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
          console.error('Client Side Error:', errorResponse.error.message);
        }
        else{
          console.error('Searver Side Error:', errorResponse);
        }

  }
  onFuncChangePassword(data){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });
    let user = this.getUserDetails();

    return this.http.post(AppSettings.base_url + 'authentication/onFuncChangePassword', data, { params: { 'trader_user_id': user.trader_user_id, 'email_address': user.email_address}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onFuncRecoverPasswordRequest(data){
    var headers = new Headers({
      "Accept": "application/json"
    });
   
    return this.http.post(AppSettings.base_url + 'authentication/onFuncRecoverPasswordRequest', data, { params: { 'recover': ''}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  pass_complexcheck(newpassword) {
      var aLowerCase = /[a-z]/,
          aNumber = /[0-9]/;
      if (newpassword.length < 6 || newpassword.search(aLowerCase) == -1 || newpassword.search(aNumber) == -1) {
          return false;

      } else {
          return true;

      }
  }
  
}
