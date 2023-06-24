import { Component, OnInit, Renderer, ChangeDetectorRef, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
//import { DrushopsRegistrationService } from 'src/app/services/drugshop-applications/drugshops-registration.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

import CustomStore from 'devextreme/data/custom_store';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { WizardComponent } from 'ng2-archwizard';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-appdashboard',
  templateUrl: './appdashboard.component.html',
  styleUrls: ['./appdashboard.component.css']
})
export class AppdashboardComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  //the create acocunt details 
  trader_profile: FormGroup;
  countries: any;
  regions: any;
  districts: any;
  account_resp:any;
  trader_categories: any;
  region_id:number;
  district_id:number;
  is_readOnly:boolean= true;
  accountTypesData:any;
  isTPinNumberEnabled:boolean= false;
  isPacroNumberEnabled:boolean= false;
  is_local:any;
  isReadOnly:boolean =true;
  message:any;



  //end 
  approved_applications:number= 0;
  pending_submission:number=0;
  queried_applications:number=0;
  invoiced_pendingpayment:number=0;
  rejected_applications:number = 0;
  app_renewalduenotifications:number=0
  app_renewalduenotificationsdetails:any;
  isViewApplicationDueforRenewal:boolean = false;
  dtaApplicationNotifications:any ={};
  productsapp_details:any;
  app_route:any;
  onFileUploadFrm: FormGroup;
  dtElement: DataTableDirective;
  files: FileList; 
  filestring: string; 
  dtAppsnProcessesData:any = {};
  isPreviewApplicationProcessing:boolean=false;
  productApplicationProcessingData:any;
  contextMenuItems = [{
        text: 'Share',
        items: [
            { text: 'Facebook' },
            { text: 'Twitter' }]
    },
    { text: 'Download' },
    { text: 'Comment' },
    { text: 'Favorite' }
    ];
  dtretentionInvsData:any;

  retetentionFilterDetailsFrm:FormGroup;

  yearData:any= [];
  sectionsData:any;
  subModuleData:any;
  modulesData:any;
  yearUpperLimit:number = (new Date()).getFullYear();
  yearLowerLimit:number = 2014;

  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  
  base_url = AppSettings.base_url;
  assets_url = AppSettings.assets_url;

  FilterDetailsFrm:FormGroup;
  frmPreviewApplicationNotification:FormGroup;
  trader_id:number;
  country_id:number;
  mistrader_id:number;
  customer_account_id:number;
  isPreviewApplicationNotification:boolean=false;
  traderaccounts_status_id:number;
  is_trader_accountupdate:boolean;

  status_id: number = 1;
  sub_module_id:number = 88;
  module_id:number= 26;
  document_type_id:number = 33;
  onApplicationSubmissionFrm:FormGroup;
  termscheckbox:boolean;
  app_resp:any;
  loading:any;
  constructor(public authService:AuthService, private premisesService:PremisesApplicationsService, private appService: ProductApplicationService,private spinner: SpinnerVisibilityService,private fb: FormBuilder, private cd: ChangeDetectorRef,private http: HttpClient,private renderer: Renderer, private router:Router, private utilityService:Utilities,public toastr: ToastrService,private configService: ConfigurationsService,public httpClient: HttpClient ,private accountService:AccountManagementService,public modalServ: ModalDialogService,public viewRef: ViewContainerRef) { 

    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;

    this.mistrader_id = user_details.mistrader_id;
    this.mistrader_id = user_details.mistrader_id;
    this.customer_account_id =user_details.mistrader_id;
    this.traderaccounts_status_id = user_details.traderaccounts_status_id;

    this.onApplicationSubmissionFrm = new FormGroup({
     submission_comments:new FormControl('', Validators.compose([]))
    });

    this.trader_profile = new FormGroup({
      name: new FormControl('', Validators.compose([])), pacra_no: new FormControl('', Validators.compose([])),
      tpn_no: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl(this.region_id, Validators.compose([])),
      district_id: new FormControl(this.district_id, Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      trader_category_id: new FormControl('', Validators.compose([])),
      tin_certificate: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),
      traderaccount_type_id: new FormControl('', Validators.compose([Validators.required])),
      contact_person_telephone: new FormControl('', Validators.compose([])),
      contact_person_email: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([Validators.required])),
      
    });
    
   

    if(this.traderaccounts_status_id != 2){
        this.onLoadCountries();
        this.onLoadDistricts();
        this.onLoadAccountTypesData();
        this.onLoadTraderInformaton();
 10   }
  }
 submissionsTermscheckbox(e) {
   
    this.termscheckbox = e.value;

  }

  ngOnInit() {
    this.spinner.hide();
    const that = this; 

    this.onLoadApplicationProcessingData({});
    this.funcReleadApplicationNotifications();
    this.frmPreviewApplicationNotification = new FormGroup({
      subject: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.required])),
      sent_on: new FormControl('', Validators.compose([Validators.required]))
    });
    this.retetentionFilterDetailsFrm = new FormGroup({
      retention_yearfrom: new FormControl('', Validators.compose([])),
      retention_yearto: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([]))
    });
 this.FilterDetailsFrm = new FormGroup({
      module_id: new FormControl('', Validators.compose([])),
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([]))
    });
    //the year loop 

    for(var i=this.yearLowerLimit;i<=this.yearUpperLimit;i++) {

      this.yearData.push({id: i, name:i});
      
    }
    this.onLoadSections();
    this.onLoadmodulesData() ;
    this.onLoadApplicationsCounterDetails();
    this.onLoadApplicationCounterDueforRenewal();
    
    this.OnloadProductRetetentionDetails({});
  }
  //sub process 
  onLoadAccountTypesData() {
    var data = {
      table_name: 'par_traderaccount_types'
    };
    this.configService.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.accountTypesData = data;
        },
        error => {
          return false;
        });
  }
  onLoadTraderInformaton() {

    this.accountService.onGetTraderInformation()
      .subscribe(
        data => {
          if(data.success){
            this.trader_profile.patchValue(data.data)
            this.region_id = data.data.region_id;
            this.district_id = data.data.district_id;
            this.traderaccounts_status_id = data.data.traderaccounts_status_id;

            if(this.traderaccounts_status_id !=2){

                 this.is_trader_accountupdate = true;
                 
            }
            
          }
        },
        error => {
          return false;
        });
  }
  onCoutryCboSelect($event) {
    
    if($event.selectedItem.id){
      this.is_local = $event.selectedItem.is_local;
      let account_type_id = this.trader_profile.get('traderaccount_type_id').value;

      this.onLoadRegions($event.selectedItem.id);
        
    }
    
    
  }
  
  onUpdateTraderAccount() {

    if (this.trader_profile.invalid) {
      return;
    }
    this.spinner.show();
    
    this.accountService.onCreateAccount(this.trader_profile.value,'','onUpdateTraderAccountDetails')
      //.pipe(first())
      .subscribe(
        response => {
            this.account_resp = response.json();
            if(this.account_resp.success){
              this.message = this.account_resp.message;
              this.toastr.success(this.message, 'Response');
              this.wizard.model.navigationMode.goToStep(1);

            }else{
              this.message = this.account_resp.message;
              this.toastr.error(this.message, 'Alert');
            }
            this.spinner.hide();
        },
        error => {
          this.toastr.success('Error occurred!', 'Response');
          this.spinner.hide();
        });
  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.configService.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.regions = data;
        },
        error => {
          return false
        });
  }
  onLoadDistricts() {
    var data = {
      table_name: 'par_districts'
    };
    this.configService.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
    };
    this.configService.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }
  funcRecordClick(){
    
  }onLoadApplicationsCounterDetails() {
   
    this.utilityService.onLoadApplicationCounterDetails('wb_onlinesubmissions')
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
             
                  if(rec.status_id == 1){
                    this.pending_submission = rec.application_counter;
                  }if(rec.status_id == 6 || rec.status_id == 7 || rec.status_id == 8 || rec.status_id == 9){
                    this.queried_applications += rec.application_counter;
                  }if(rec.status_id == 10){
                    this.approved_applications = rec.application_counter;
                  }if(rec.status_id == 11){
                    this.rejected_applications = rec.application_counter;
                  }if(rec.status_id == 4){
                    this.invoiced_pendingpayment = rec.application_counter;
                  }

            }
          }
          
        });
  }
  onViewApplicationDueforRenewal(){


  }
  
  onLoadApplicationCounterDueforRenewal(){
    this.utilityService.getApplicationUniformDetails({},'onLoadApplicationCounterDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotifications =  resp_data.app_renewalduenotifications;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onLoadApplicationDetailsDueforRenewal(){
    if(this.app_renewalduenotifications <1){
      this.toastr.error('There is no application due for expiry (3months)!!', 'Alert!');
      return;
    }
    this.utilityService.getApplicationUniformDetails({},'onLoadApplicationDetailsDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotificationsdetails =  resp_data.app_renewalduenotificationsdetails;
            this.isViewApplicationDueforRenewal = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  
  funcReleadApplicationNotifications(){
   
    let me = this;
    this.dtaApplicationNotifications.store = new CustomStore({
      load: function (loadOptions: any) {
          var params = '?';
          params += 'skip=' + loadOptions.skip;
          params += '&take=' + loadOptions.take;//searchValue
          var headers = new HttpHeaders({
            "Accept": "application/json",
            "Authorization": "Bearer " + me.authService.getAccessToken(),
          });
        
          this.configData = {
            headers: headers,
            params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,trader_id:me.trader_id }
          };
          return me.httpClient.get(AppSettings.base_url + 'utilities/onLoadApplicationNotifications',this.configData)
              .toPromise()
              .then((data: any) => {
                  return {
                      data: data.data,
                      totalCount: data.totalCount
                  }
              })
              .catch(error => { throw 'Data Loading Error' });
      }
  });
  }
  
  onLoadSections() {

    var data = {
      table_name: 'par_sections',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });

  }
  onPrintRetetionApplicaitonState(){

    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
   let mis_url = AppSettings.mis_url;
    let report_url = mis_url+'reports/generateSelectedRetentionInvoiceStatement?retention_yearto='+retention_yearto+"&section_id="+section_id+"&retention_yearfrom="+retention_yearfrom+"&applicant_id="+this.mistrader_id ;

    this.funcGenerateRrp(report_url,"Retention Invoice")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  onSelectRetentionFilters() {
    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
     
    this.OnloadProductRetetentionDetails({retention_yearto:retention_yearto,section_id:section_id,retention_yearfrom:retention_yearfrom});
  }
  onClearRetetionApplicaitonFilters(){
    this.retetentionFilterDetailsFrm.reset();
    this.OnloadProductRetetentionDetails({});


  }
  OnloadProductRetetentionDetails(filter_params) {

    this.spinner.show();
    this.utilityService.getApplicationUniformDetails(filter_params,'onloadProductRetetentionDetails')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtretentionInvsData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  funcSystemNotificationLink(){
    let app_route = ['./../online-services/notifications-panel'];

    this.router.navigate(app_route);
  }
 
  onLoadApplicationProcessingData(filter_params) {
    this.spinner.show();
    this.utilityService.onLoadTraderApplicationProcessingData(filter_params,'utilities/getTraderApplicationProcessing')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtAppsnProcessesData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  onLoadAllApplicationProcessingData(data) {

    this.utilityService.onLoadApplicationProcessingData(data.application_code)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.productApplicationProcessingData =  resp_data.data;
            this.isPreviewApplicationProcessing = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  funcViewApplicationProcessing(data){
     this.onLoadAllApplicationProcessingData(data.data);

  }

  onViewRegisteredProductsApps(registration_status,validity_status,process_title){

    
    this.productsapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
    this.appService.setProductApplicationDetail(this.productsapp_details);

    this.app_route = ['./online-services/registered-products'];

    this.router.navigate(this.app_route);
 
}
onViewRegisteredPremisesApps(registration_status,validity_status,process_title){

    
    this.productsapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
    this.premisesService.setPremisesApplicationDetail(this.productsapp_details);

    this.app_route = ['./online-services/registered-premises'];

    this.router.navigate(this.app_route);

}
onViewRegisteredGMPApps(registration_status,validity_status,process_title){

    
  this.productsapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
  this.premisesService.setPremisesApplicationDetail(this.productsapp_details);

  this.app_route = ['./online-services/registered-premises'];

  this.router.navigate(this.app_route);

}
onSelectApplicationFilters(e) {
  let module_id = this.FilterDetailsFrm.get('module_id').value;
  let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
  let section_id = this.FilterDetailsFrm.get('section_id').value;
  let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
   
  this.onLoadApplicationProcessingData({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

}

onSelectModuleApplicationFilters(e) {
  let module_id = this.FilterDetailsFrm.get('module_id').value;
  let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
  let section_id = this.FilterDetailsFrm.get('section_id').value;
  let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
   this.onLoadProductAppType(module_id);
  this.onLoadApplicationProcessingData({module_id:module_id, sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

}OnViewApplicationSubmissionsStatus(application_status_id){

    
  this.productsapp_details = {application_status_id: application_status_id};
  this.appService.setProductApplicationDetail(this.productsapp_details);

  this.app_route = ['./online-services/appsubmission-dashboard'];

  this.router.navigate(this.app_route);

}

onClearProdutFilters(){
  this.FilterDetailsFrm.reset();
  this.FilterDetailsFrm.reset();
  this.FilterDetailsFrm.reset();
   
  this.onLoadApplicationProcessingData({});


}

onLoadProductAppType(module_id) {
  
  var data = {
    table_name: 'sub_modules',
    module_id: module_id
  };
  this.configService.onLoadConfigurationData(data)
    .subscribe(
      data => {
       this.subModuleData =  data;
      });
}

onLoadmodulesData() {
  
  var data = {
    table_name: 'modules'
  };
  this.configService.onLoadConfigurationData(data)
    .subscribe(
      data => {
       this.modulesData =  data;
      });
}
funcPrintRetentionInvoices(){

  
}
funcPreviewApplicationNotification(data){
  this.isPreviewApplicationNotification = true;
  this.frmPreviewApplicationNotification.patchValue(data.data);
  
}

funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}



onCustomerAccountRegistrationSubmission(mistrader_id, submission_data={}) {
  this.modalServ.openDialog(this.viewRef, {
    title: 'Do you want to complete the account registration process?',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
      text: 'Yes',
      buttonClass: 'btn btn-danger',
      onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
        this.utilityService.onCustomerAccountRegistrationSubmission(mistrader_id)
          .subscribe(
            response => {
              this.app_resp = response.json();
              //the details 
              this.spinner.hide();
              if (this.app_resp.success) {
                this.toastr.success(this.app_resp.message, 'Response');
                this.is_trader_accountupdate =false;
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
            },
            error => {
              this.loading = false;
              this.spinner.hide();
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
}
