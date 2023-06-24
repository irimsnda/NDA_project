import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app-settings';
import { map } from 'rxjs/operators';


import { Http, Response, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
  //the function calls

  private componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  application_details: any;
  app_resp: any;

  app_route: any;
  loading: boolean;
  constructor(public router: Router, public toastr: ToastrService, public modalServ: ModalDialogService, private authService: AuthService, private myRoute: Router, private http: Http, private httpClient: HttpClient, public spinner: SpinnerVisibilityService) {
    if( this.authService.getUserDetails()){
      let user = this.authService.getUserDetails();
      this.trader_id = user.trader_id;
      this.mistrader_id = user.mistrader_id;
      this.email_address = user.email_address;
    }
    else{
      this.trader_id;
      this.mistrader_id;
      this.email_address;
    }
    
    

  }getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }  onCellPrepared(e) {
    
    if(e.rowType === "data" && e.column.dataField === "status_name") {
      let application_status_id =e.data.application_status_id;

       
        if(application_status_id ==1){
          e.cellElement.style.color = 'black';
          e.cellElement.style.backgroundColor = '#F1B53D';    
        }
        else if(application_status_id == 10 || application_status_id == 33 || application_status_id == 26  || application_status_id == 39){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';  
        
        }else if(application_status_id == 2 || application_status_id == 3){

          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#1BB99A';  
        } 
        else if(application_status_id == 11){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  

        } else if(application_status_id == 6 || application_status_id == 8 || application_status_id == 7  || application_status_id == 17){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#3DB9DC';  
      
        }
        else{
            e.cellElement.style.color = 'black';
            e.cellElement.style.backgroundColor = '#ccc';  
        

          }
          
    }
}
  onPermitApplicationSubmit(application_code, tracking_no, table_name,submission_data) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onPermitApplicationSubmit', submission_data, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_code': application_code, 'tracking_no': tracking_no, 'table_name': table_name}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onGroupedPermitApplicationSubmit(group_application_code, group_tracking_no, table_name,submission_data) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onGroupedPermitApplicationSubmit', submission_data, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'group_application_code': group_application_code, 'group_tracking_no': group_tracking_no, 'table_name': table_name}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  
  onCustomerAccountRegistrationSubmission(mistrader_id) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onCustomerAccountRegistrationSubmission', {}, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': mistrader_id,}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onMisApplicationSubmit(application_code, tracking_no, table_name,submission_data) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onMisPermitApplicationSubmit', submission_data, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_code': application_code, 'tracking_no': tracking_no, 'table_name': table_name}, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  getApplicationInvoiceDetails(app_params,action_url){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: app_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onApplicationInvoicePaymentConfirmation(app_params,action_url){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: app_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.mis_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadApplicationCounterDetails(table_name, sub_module_id=0){
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, table_name:table_name,sub_module_id:sub_module_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/getApplicationCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onMisPermitsApplicationSubmit(viewRef, application_code, tracking_no, table_name, app_route,submission_data={}) {
    this.modalServ.openDialog(viewRef, {
      title: 'Do you want to submit the application with tracking no ' + tracking_no + ' for processing?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.onMisApplicationSubmit(application_code, tracking_no, table_name,submission_data)
            .subscribe(
              response => {
                this.app_resp = response.json();
                //the details 
                this.spinner.hide();
                if (this.app_resp.success) {
                  this.toastr.success(this.app_resp.message, 'Response');
                  this.router.navigate(app_route);
                } else {
                  this.toastr.error(this.app_resp.message, 'Alert');
                }
              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }
  onPermitsApplicationSubmit(viewRef, application_code, tracking_no, table_name, app_route,submission_data={}) {
    this.modalServ.openDialog(viewRef, {
      title: 'Do you want to submit the application with tracking no ' + tracking_no + ' for processing?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.onPermitApplicationSubmit(application_code, tracking_no, table_name,submission_data)
            .subscribe(
              response => {
                this.app_resp = response.json();
                //the details 
                this.spinner.hide();
                if (this.app_resp.success) {
                  this.toastr.success(this.app_resp.message, 'Response');
                  this.router.navigate(app_route);
                } else {
                  this.toastr.error(this.app_resp.message, 'Alert');
                }
              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }

  onGroupedPermitsApplicationSubmit(viewRef, group_application_code, group_tracking_no, table_name, app_route,submission_data={}) {
    this.modalServ.openDialog(viewRef, {
      title: 'Do you want to submit the Grouped application with tracking no ' + group_tracking_no + ' for processing?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.onGroupedPermitApplicationSubmit(group_application_code, group_tracking_no, table_name,submission_data)
            .subscribe(
              response => {
                this.app_resp = response.json();
                //the details 
                this.spinner.hide();
                if (this.app_resp.success) {
                  this.toastr.success(this.app_resp.message, 'Response');
                  this.router.navigate(app_route);
                } else {
                  this.toastr.error(this.app_resp.message, 'Alert');
                }
              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }
  
  getApplicationPreRejectionDetails(application_code, table_name, status_column) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { application_code: application_code, table_name: table_name, status_column },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/getApplicationPreRejectionDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getApplicationPreQueriesDetails(application_code, table_name, status_column, action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { application_code: application_code, table_name: table_name, status_column },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadApplicationProcessingData(application_code) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { application_code: application_code},
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/getApplicationProcessing', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadTraderApplicationProcessingData(filter_params,action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    filter_params.mistrader_id = this.mistrader_id;
    filter_params.trader_id = this.trader_id;
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url +action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  getApplicationProcessInformation(application_code,action_url){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { application_code: application_code },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  onApplicationInvoiceGeneration(application_code, app_params, action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/' + action_url, app_params, { params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onGroupedApplicationInvoiceGeneration(group_application_code, app_params, action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/' + action_url, app_params, { params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, group_application_code: group_application_code }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onsaveApplicationCodeDetails(application_code, app_data, action_url) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/' + action_url, app_data, { params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  validateClinicalTrialOtherDetails(application_id,  table_name) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_id: application_id, table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/validateClinicalTrialOtherDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  validateApplicationDocumentsQuerySubmission(application_code, status_id, table_name,prodclass_category_id=0) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code, status_id: status_id, table_name: table_name,prodclass_category_id:prodclass_category_id },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/validateApplicationDocQuerySubmission', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  funcValidateApplicationLabels(application_code, document_type_id, table_name) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code, document_type_id: document_type_id, table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/funcValidateApplicationLabels', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  funcValidateApplicationQueryresponse(application_code, table_name) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code,  table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/validateApplicationQueryresponse', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onApplicationArchive(application_code, table_name) {


    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onApplicationArchive', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_code': application_code, 'table_name': table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onApplicationDelete(application_code, table_name) {


    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onApplicationDelete', '', { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_code': application_code, 'table_name': table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  funcApplicationDeleteCall(viewRef,data,table_name, func_reload) {
    this.modalServ.openDialog(viewRef, {
      title: 'Do you want to delete the selected application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          //this.spinner.show();
          this.onApplicationDelete(data.application_code, table_name)
            .subscribe(
              response => {
                this.app_resp = response.json();
                //the details 
                this.spinner.hide();

                if (this.app_resp.success) {
                  this.toastr.success(this.app_resp.message, 'Response');

                  func_reload();
                } else {
                  this.toastr.error(this.app_resp.message, 'Alert');
                }
              },
              error => {
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
  }
  funcApplicationArchiceCall(viewRef,data,table_name, func_reload) {
    this.modalServ.openDialog(viewRef, {
      title: 'Do you want to submit the application to archive, Note the application will not be accessible from the active application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          //this.spinner.show();
          this.onApplicationArchive(data.application_code, table_name)
            .subscribe(
              response => {
                this.app_resp = response.json();
                //the details 
                this.spinner.hide();

                if (this.app_resp.success) {
                  this.toastr.success(this.app_resp.message, 'Response');

                  func_reload();
                } else {
                  this.toastr.error(this.app_resp.message, 'Alert');
                }
              },
              error => {
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
  }
  onSubmitApplicationDismissal(mistable_name,portaltable_name, dismissal_data, application_code){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onSubmitApplicationDismissal', dismissal_data, { params: {mistable_name:mistable_name, portaltable_name:portaltable_name, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }
  getApplicationUniformDetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    data.trader_id = this.trader_id;
    data.mistrader_id = this.mistrader_id;
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/'+path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  onsaveApplicationUniformDetails(application_code, permitData,action_url) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    return this.http.post(AppSettings.base_url + 'utilities/'+action_url, permitData, { params: { application_code: application_code,  'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  
  onDeleteUniformAppDetails(record_id,table_name,application_code,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onDeleteUniformAppDetails', '', { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,record_id:record_id,application_code:application_code,table_name:table_name,title:title}, headers: headers })
      .pipe(map(data => {
        return data;
      }));

  }
  //
  validateApplicationotherDetails(application_code, table_name) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code, table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/validateApplicationotherDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onAddPersonnDetails(table_name,data){//tra_permitsenderreceiver_data
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(AppSettings.base_url + 'utilities/onAddUniformApplicantDataset', data, { params: { 'mistrader_id': this.mistrader_id,'trader_id': this.trader_id, 'traderemail_address': this.email_address,table_name:table_name }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }  getApplicationInformation(params,action_url){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: params,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
}
