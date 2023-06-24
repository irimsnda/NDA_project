import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PromotionadvertService } from 'src/app/services/promotionadvert-app/promotionadvert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';

@Component({
  selector: 'app-promotional-advertdash',
  templateUrl: './promotional-advertdash.component.html',
  styleUrls: ['./promotional-advertdash.component.css']
})
export class PromotionalAdvertdashComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  expanded = true;
  app_route:any;
  promotionapp_details:any;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  approved_applications: number = 0;
  pending_submission: number = 0;
  queried_applications: number = 0;
  rejected_applications: number = 0;
  submitted_application:number=0;
  sub_module_id:string;
  dtPromotionApplicationData:any;
  FilterDetailsFrm:FormGroup;
  isPreviewProductsDetails:boolean;
application_title:string;
  frmPreviewProductsDetails:FormGroup;
  processData:any;
  title:number;
  router_link:any;
  printiframeUrl:any
  printReportTitle:any;
  isPrintReportVisible:any= false;
  productApplicationProcessingData:any;
          isPreviewApplicationProcessing:boolean;

          applicationRejectionData:any;
          isApplicationRejectionVisible:boolean;
          productappTypeData:any;
          applicationStatusData:any;
          sectionsData:any;
          module_id:number = 14;app_renewalduenotifications:number;
          app_renewalduenotificationsdetails:any;
          isViewApplicationDueforRenewal:boolean;
  constructor(private utilityService:Utilities,private viewRef: ViewContainerRef,private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService,public toastr: ToastrService, public router: Router, private configService: ConfigurationsService, public appService:PromotionadvertService, private config:ConfigurationsService) {

      
      this.FilterDetailsFrm = new FormGroup({
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
        section_id: new FormControl('', Validators.compose([])),
        application_status_id: new FormControl('', Validators.compose([]))
      });
      this.frmPreviewProductsDetails = new FormGroup({
        tracking_no: new FormControl('', Validators.compose([Validators.required])),
        brand_name: new FormControl('', Validators.compose([Validators.required])),
        classification: new FormControl('', Validators.compose([Validators.required])),
        common_name: new FormControl('', Validators.compose([Validators.required])),
        application_type: new FormControl('', Validators.compose([Validators.required])),
        status: new FormControl('', Validators.compose([Validators.required]))
      });
      this.onLoadApplicationCounterDueforRenewal();
      
      this.onLoadApplicationstatuses();
      this.onLoadSections();
   }

  ngOnInit() {
 
  }
  onSelectApplicationsFilters() {
    
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
  onLoadProductAppType() {
    
    var data = {
      table_name: 'sub_modules',
      sub_module_id: this.sub_module_id,
      module_id: this.module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }
  onLoadApplicationstatuses() {
    
    var data = {
      table_name: 'wb_statuses'
    };
    this.config.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
         this.applicationStatusData =  data;
        });
  }
  
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onClearApplicaitonFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
    

  }
 funcApplicationSelectcion() {

    this.spinner.show();
   
    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.promotionapp_details = {module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, status_id: 1,status_name: 'New'};
            this.appService.setApplicationDetail(this.promotionapp_details);
            this.app_route = ['./online-services/' + this.router_link];
            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }
        });
    return false;
  }refreshDataGrid() {
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
  }
 onLoadApplicationCounterDetails() {
    let filter_params ={sub_module_id:this.sub_module_id};

    this.appService.onLoadApplicationCounterDetails(filter_params)
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
                  if (rec.status_id == 1) {

                    this.pending_submission = rec.application_counter;
                  } if(rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 7 || rec.status_id == 13  || rec.status_id == 14  || rec.status_id == 15){
                    this.queried_applications += rec.application_counter;
                  } if (rec.status_id == 10 || rec.status_id == 33 || rec.status_id == 26  || rec.status_id == 39) {
                    this.approved_applications = rec.application_counter;
                  } if (rec.status_id == 11) {
                    this.rejected_applications = rec.application_counter;
                  }if (rec.status_id == 2 || rec.status_id == 3) {
                    this.submitted_application = rec.application_counter;
                  }


            }
          }
          
        });
  }
  reloadPromotionAlderrApplication(filter_params ={}) {

    this.appService.onApplicationLoading(filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtPromotionApplicationData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
        });
  }
  //the 
  
funcProductNotPreveditDetails(data) {
  //details

    //get the details 
    //this.spinner.show();
    this.appService.getPromotionalAppOtherDetails({application_id:data.application_id},'promotionadverts/getPromotionalAdvertDetails')
    .subscribe(
      data => {
        this.processData = data.data;
        this.spinner.hide();
        if(data.success){
          this.title = this.processData.process_title;
          this.router_link = this.processData.router_link;
          
          this.appService.setApplicationDetail(this.processData);

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
functActionColumnClick(action_btn,data){


  if(action_btn === 'edit'){
    this.funcProductNotPreveditDetails(data.data);
  }
  else if(action_btn === 'preview'){
    this.funcProductPreviewDetails(data.data);
  }
  else if(action_btn == 'print_applications'){
    this.funcPrintApplicationDetails(data.data);
  }
  else if(action_btn == 'archive'){
    this.funcProductArchiveApplication(data.data);
  }
  else if(action_btn == 'pre_rejection'){
    this.funcApplicationRejection(data.data);
  }
  else if(action_btn == 'query_response'){
    
    this.funcProductNotPreveditDetails(data.data);

  }
  else if(action_btn == 'processing_details'){
    
    this.onLoadApplicationProcessingData(data.data);

  }
  else if(action_btn == 'print_invoice'){
    
    this.funcPrintApplicationInvoice(data.data);

  } 
  else if(action_btn == 'print_receipt'){
    
    this.funcPrintApplicationReceipts(data.data);

  }
  
  else if(action_btn == 'print_rejectionletter'){
    
    this.funcPrintLetterofRejection(data.data);

  }
  else if(action_btn == 'reg_certificate'){
    
    this.funcPrintProductRegistrationCertificate(data.data);

  }
  

}
applicationActionColClick(e,data){
  var action_btn = e.itemData;
  this.functActionColumnClick(action_btn.action,data);
}  
singleApplicationActionColClick(d){
    
  this.functActionColumnClick(d.data.action,d);

}

funcProductPreviewDetails(data){
  this.isPreviewProductsDetails = true;
  this.frmPreviewProductsDetails.patchValue(data);

}
funcApplicationRejection(app_data){
    
  //this.spinner.show();
      this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_product_notifications', 'application_status_id')
      .subscribe(
        data => {
          this.applicationRejectionData = data.data;
          this.spinner.hide();
          
          this.isApplicationRejectionVisible= true;
          
        });
} funcPrintProductRegistrationCertificate(app_data){
  let report_url = this.mis_url+'reports/generatePromotionalRegCertificate?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_promotion_adverts_applications";
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}

funcPrintApplicationReceipts(app_data){

  this.utilityService.setApplicationDetail(app_data);
  this.app_route = ['./online-services/application-payments'];
 
  this.router.navigate(this.app_route);
  
}
funcPrintApplicationInvoice(app_data){

   let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_premises_applications";
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}


funcPrintLetterofRejection(app_data){
    //print details

    let report_url = this.mis_url+'reports/generatePromotionalRejectionLetter?application_code='+app_data.application_code;
    this.funcGenerateRrp(report_url,"Application Details");

}
funcPrintApplicationDetails(app_data){
  //print details

    let report_url = this.mis_url+'reports/generatePromotionalApplicationRpt?application_code='+app_data.application_code;
    this.funcGenerateRrp(report_url,"Application Details");
   
}
funcGenerateRrp(report_url,title){
  
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcProductArchiveApplication(data){
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_product_applications', this.reloadPromotionAlderrApplication)
}

onLoadApplicationProcessingData(data) {

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
}  onCellPrepared(e) {
  this.utilityService.onCellPrepared(e);
  
} onLoadApplicationDetailsDueforRenewal(){
  if(this.app_renewalduenotifications < 1){
    this.toastr.error('There is no application due for expiry (3months)!!', 'Alert!');
    return;
  }
  this.utilityService.getApplicationUniformDetails({module_id:this.module_id},'onLoadApplicationDetailsDueforRenewal')
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
} onLoadApplicationCounterDueforRenewal(){
  this.utilityService.getApplicationUniformDetails({module_id:this.module_id},'onLoadApplicationCounterDueforRenewal')
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
}
