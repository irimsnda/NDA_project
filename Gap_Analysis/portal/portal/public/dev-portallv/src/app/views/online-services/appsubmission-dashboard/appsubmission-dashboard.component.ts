import { Component, OnInit, Renderer, ChangeDetectorRef } from '@angular/core';
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
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

import CustomStore from 'devextreme/data/custom_store';
import { AuthService } from 'src/app/services/auth.service';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { PromotionadvertService } from 'src/app/services/promotionadvert-app/promotionadvert.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-appsubmission-dashboard',
  templateUrl: './appsubmission-dashboard.component.html',
  styleUrls: ['./appsubmission-dashboard.component.css']
})
export class AppsubmissionDashboardComponent implements OnInit {
  approved_applications:number= 0;
  pending_submission:number=0;
  queried_applications:number=0;
  invoiced_pendingpayment:number=0;
  rejected_applications:number = 0;

  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  dtaApplicationNotifications:any ={};
  productsapp_details:any;
  app_route:any;
  onFileUploadFrm: FormGroup;
  dtElement: DataTableDirective;
  files: FileList; 
  filestring: string; 
  dtaApplicationSubmissionData:any = {};
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
   
  assets_url = AppSettings.assets_url;

  FilterDetailsFrm:FormGroup;
  frmPreviewApplicationNotification:FormGroup;
  trader_id:number;
  country_id:number;
  isPreviewApplicationNotification:boolean=false;
  application_status_id:string;
  app_details:any;

  processData: any;
  product_applications: any = [];
  title: string;
  router_link: string;
  module_id:number;
  action_url:string;
  filter_params:any;
  app_data:any;
  report_url:string;
  constructor(public authService:AuthService,  private premisesService:PremisesApplicationsService, private appService: ProductApplicationService,private spinner: SpinnerVisibilityService,private fb: FormBuilder, private cd: ChangeDetectorRef,private http: HttpClient,private renderer: Renderer, private router:Router, private utilityService:Utilities,public toastr: ToastrService,private configService: ConfigurationsService,public httpClient: HttpClient, public gmpService:GmpApplicationServicesService, public importService: ImportexportService, public promoService: PromotionadvertService) { 

    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
  }

  ngOnInit() {

    const that = this; 
    this.app_details = this.appService.getProductApplicationDetail();
    if(this.app_details){
        this.application_status_id = this.app_details.application_status_id;

    }
    this.OnViewApplicationSubmissionsStatus(this.application_status_id,{});

    //this.onLoadApplicationProcessingData({});
    //this.funcReleadApplicationNotifications();
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
    this.onLoadModulesData();
    this.onLoadApplicationsCounterDetails();

  }
  //sub process 
  funcRecordClick(){
    
  }
  onLoadModulesData() {
    
    var data = {
      table_name: 'modules'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.modulesData =  data;
        });
  }
  onLoadSubModuleData(module_id) {
    
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
  onSelectModuleFilters(e){
    let module_id = this.FilterDetailsFrm.get('module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    
    this.OnViewApplicationSubmissionsStatus('0',{module_id:module_id,section_id:section_id});
    this.onLoadSubModuleData(module_id);

  }
  onSelectSubmissionFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let module_id = this.FilterDetailsFrm.get('module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
   
    this.OnViewApplicationSubmissionsStatus('0',{module_id:module_id,sub_module_id:sub_module_id,section_id:section_id});

  }
  onLoadApplicationsCounterDetails() {
   
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
  
  OnViewApplicationSubmissionsStatus(application_status_id,filter_data) {
   // this.spinner.show();
   
  
   var filter_params = filter_data;
   if(application_status_id != '0'){
    filter_params = {application_status_id:application_status_id};
    
   }
    this.utilityService.onLoadTraderApplicationProcessingData(filter_params, 'utilities/getDtaApplicationSubmissionData')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtaApplicationSubmissionData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onAppSubmissionToolbarPreparing(e) {
    
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.OnViewAllApplicationSubmissionsStatus.bind(this)
        }
      });
  
  }
  OnViewAllApplicationSubmissionsStatus(){
    this.OnViewApplicationSubmissionsStatus('0',{})
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
  
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

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

funcViewApplicationProcessing(data) {
  //details
    this.module_id = data.module_id;
    this.application_status_id = data.application_status_id;
    switch (this.module_id) {
      
        case 1:
            this.action_url = 'productregistration/getProductApplicationInformation';
            break;
        case 2:
          this.action_url = 'premisesregistration/getpremisesApplicationDetails';
            break;
        case 3:
          this.action_url = 'gmpinspection/getgmpApplicationDetails';
            break;
        case 4:
            this.action_url = 'importexportapp/getImportExpPermitsApplicationLoading';
          break;
          case 12:
            this.action_url = 'importexportapp/getImportExpPermitsApplicationLoading';
          break;
          case 7:
            this.action_url = 'clinicaltrials/getClinicalApplicationsDetails';
          break;
          case 14:
            this.action_url = 'promotionadverts/getPromotionAlderrApplication';
          break;
          case 15:
            this.action_url = 'importexportapp/getDisposalApplicationsLoading';
          break;
        default:
          this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
          return;
          
    }
    if(this.application_status_id == '1' || this.application_status_id == '6' || this.application_status_id == '7' || this.application_status_id == '8'  || this.application_status_id == '8'  || this.application_status_id == '51'  || this.application_status_id == '52' || this.application_status_id == '57'  || this.application_status_id == '64'){
        this.spinner.show();
        this.utilityService.getApplicationProcessInformation(data.application_code,this.action_url)
        .subscribe(
          data => {
            this.processData = data.data;
            this.spinner.hide();
            if(data.success){
              this.title = this.processData.process_title;
              this.router_link = this.processData.router_link;
              switch (this.module_id) {
                case 1:
                    this.appService.setProductApplicationDetail(this.processData);
                    break;
                case 2:
                    this.premisesService.setPremisesApplicationDetail(this.processData);
                    break;
                case 3:
                    this.gmpService.setGmpApplicationDetail(this.processData);
                    break;
                case 4:
                    this.importService.setApplicationDetail(this.processData);
                    break;
                case 14:
                    this.promoService.setApplicationDetail(this.processData);
                    break;
                case 12:
                    this.importService.setApplicationDetail(this.processData);
                break;
                 case 7:
                      this.premisesService.setPremisesApplicationDetail(this.processData);
                break;
                case 14:
                  this.promoService.setApplicationDetail(this.processData);
                break;
                case 15:
                  this.importService.setApplicationDetail(this.processData);
              break;
                default:
                  this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
                  return;
                  
            }
    
    
              if(this.router_link != ''){
                this.app_route = ['./online-services/' + this.router_link];
    
                this.router.navigate(this.app_route);
              }
              else{
                this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
              }
            
            }
            else{
              this.toastr.error(this.processData.message, 'Alert!');
    
            }
          
          });

    }
    else if(this.application_status_id == '4'){
      this.funcPrintApplicationInvoice(data)
    }
    else if(this.application_status_id == '10' || this.application_status_id == '33' || this.application_status_id == '26') {
     
      this.utilityService.onLoadTraderApplicationProcessingData({module_id:this.module_id,application_code:data.application_code}, 'utilities/getModuleApplicationdetails')
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.app_data =  resp_data.data;
            switch (this.module_id) {
                case 1:
                  this.report_url = this.mis_url+'reports/generateProductRegCertificate?application_code='+this.app_data.application_code+"&product_id="+this.app_data.product_id+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_product_applications";
                    break;
                case 2:
                    this.report_url = this.mis_url+'reports/generatePremiseCertificate?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_premises_applications";
                    break;
                case 3:
                  this.report_url = this.mis_url+'reports/generateGmpCertificate?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_gmp_applications";
                  
                    break;
                case 4:
                  this.report_url = this.mis_url+'reports/genenerateImportExportPermit?application_code='+ this.app_data.application_code+"&module_id="+ this.app_data.module_id+"&sub_module_id="+ this.app_data.sub_module_id+"&table_name=tra_importexport_applications";
                    break;
                    case 7:
                      this.report_url =   this.mis_url+'reports/generateClinicalTrialCertificate?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_clinical_trial_applications";
                  break;
                   case 15:
                    this.report_url =   this.mis_url+'reports/generateDisposalpermit?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_disposal_applications";
                  break;
                  case 12:
                    this.report_url =  this.mis_url+'reports/genenerateImportExportPermit?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_importexport_applications";
                break;
                case 14:
                  this.report_url =  this.mis_url+'reports/generatePromotionalRegCertificate?application_code='+this.app_data.application_code+"&module_id="+this.app_data.module_id+"&sub_module_id="+this.app_data.sub_module_id+"&table_name=tra_promotion_adverts_applications";
              break;
                default:
                  this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
                  return;
            }
            this.funcGenerateRrp(this.report_url,"Application Certificate");
          
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          
          
          this.spinner.hide();
        });
        
        //generate the report url 

        
    }
    
}funcPrintApplicationInvoice(app_data){

  let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name="+app_data.table_name;
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}
onClearApplicationFilters(){
  this.FilterDetailsFrm.reset();
  this.FilterDetailsFrm.reset();
  this.FilterDetailsFrm.reset();
   
  this.OnViewApplicationSubmissionsStatus('0',{});
}

}
