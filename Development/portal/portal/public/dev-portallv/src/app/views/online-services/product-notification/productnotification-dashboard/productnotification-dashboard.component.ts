import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule
} from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-productnotification-dashboard',
  templateUrl: './productnotification-dashboard.component.html',
  styleUrls: ['./productnotification-dashboard.component.css']
})
export class ProductnotificationDashboardComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  sectionItem: any;
  app_typeItem: any;
  printiframeUrl:any
  printReportTitle:any;
  isPrintReportVisible:any= false;
  base_url = AppSettings.base_url;
  app_route: any;
  productApps: any;
  sectionsData: any;
  productappTypeData: any;
  productapp_details: any;
  applicationProcessData: any;
  processData: any;
  product_applications: any = [];
  title: string;
  router_link: string;
  appTypeData:any;
  approved_products: number = 0;
  pending_submission: number = 0;
  queried_products: number = 0;
  rejected_products: number = 0;
  dtProductApplicationData: any = {};
  productsapp_details:any;
  public appTableWidget: any;
  module_id:number;
  FilterDetailsFrm:FormGroup;
  applicationStatusData:any;
  productApplicationProcessingData:any;
          isPreviewApplicationProcessing:boolean;
          applicationRejectionData:any;
          isApplicationRejectionVisible:boolean;
          isPreviewProductsDetails:boolean;
          frmPreviewProductsDetails:FormGroup;

  constructor(private viewRef: ViewContainerRef, private utilityService:Utilities,private spinner: SpinnerVisibilityService, public toastr: ToastrService, private configService: ConfigurationsService, private appService: ProductApplicationService, private router: Router, public modalService: NgxSmartModalService, private config: ConfigurationsService) { }

  ngOnInit() {
    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
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
    
      this.onLoadProductAppType();
      this.onLoadProductApplciations({});
      this.onLoadSections();
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      sectionSelection: '4'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe( 
        data => {
          this.sectionsData = data;
        });
  }
  onProductsesappsToolbarPreparing(e){

    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onLoadProductAppType() {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 6
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
    this.configService.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
         this.applicationStatusData =  data;
        });
  }
  refreshDataGrid() {
    this.onLoadProductApplciations({});
  } funcselNewApplication() {

    this.app_route = ['./online-services/productnotifications-sel'];
    this.router.navigate(this.app_route);
  } onLoadProductApplciations(filter_params={}) {

    this.appService.onProductNotificationLoading(filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtProductApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  onLoadProductsCounterDetails() {

    this.appService.onLoadProductsCounterDetails()
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
            // this.dtPremisesApplicationData = data.data;
            for (let rec of records) {

              if (rec.status_id == 1) {
                this.pending_submission = rec.application_counter;
              } if (rec.status_id == 6 || rec.status_id == 8) {
                this.queried_products += rec.application_counter;
              } if (rec.status_id == 10) {
                this.approved_products = rec.application_counter;
              } if (rec.status_id == 11) {
                this.rejected_products = rec.application_counter;
              }

            }
          }

        });
  }
  onSelectApplicationsFilters() {
    
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.onLoadProductApplciations({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
 
  onClearApplicaitonFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.onLoadProductApplciations({});
    

  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 30){
      this.productsapp_details = {status_id:1, status_name:'New', module_id: this.module_id,section_id:4, process_title: sub_module_name, sub_module_id: sub_module_id, product_id:''};
      this.appService.setProductApplicationDetail(this.productsapp_details);

      this.app_route = ['./online-services/newmedicaldevices-notification'];
      
    }else{

      this.productsapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setProductApplicationDetail(this.productsapp_details);

      this.app_route = ['./online-services/registered-product-selection'];

     
    } this.router.navigate(this.app_route);

  }
  onViewRegisteredProductsApps(registration_status,validity_status,process_title){

    
    this.productsapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
    this.appService.setProductApplicationDetail(this.productsapp_details);

    this.app_route = ['./online-services/registered-products'];

    this.router.navigate(this.app_route);
 
}

funcProductNotPreveditDetails(data) {
  //details

    //get the details 
    this.spinner.show();
    this.appService.getProductApplicationInformation(data.application_id,'getProductNotificationsInformation')
    .subscribe(
      data => {
        this.processData = data.data;
        this.spinner.hide();
        if(data.success){
          this.title = this.processData.process_title;
          this.router_link = this.processData.router_link;
          
          this.appService.setProductApplicationDetail(this.processData);

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
prodApplicationActionColClick(e,data){
  
  var action_btn = e.itemData;

  if(action_btn.action === 'edit'){
    this.funcProductNotPreveditDetails(data.data);
  }
  else if(action_btn.action === 'preview'){
    this.funcProductPreviewDetails(data.data);
  }
  else if(action_btn.action == 'print_applications'){
    this.funcPrintApplicationDetails(data.data);
  }
  else if(action_btn.action == 'archive'){
    this.funcProductArchiveApplication(data.data);
  }
  else if(action_btn.action == 'pre_rejection'){
    this.funcApplicationRejection(data.data);
  }
  else if(action_btn.action == 'query_response'){
    
    this.funcProductNotPreveditDetails(data.data);

  }
  else if(action_btn.action == 'processing_details'){
    
    this.onLoadApplicationProcessingData(data.data);

  }
  else if(action_btn.action == 'print_invoice'){
    
    this.funcPrintApplicationInvoice(data.data);

  } 
  else if(action_btn.action == 'print_receipt'){
    
    this.funcPrintApplicationReceipts(data.data);

  }
  
  else if(action_btn.action == 'print_rejectionletter'){
    
    this.funcPrintLetterofRejection(data.data);

  }
  else if(action_btn.action == 'reg_certificate'){
    
    this.funcPrintProductRegistrationCertificate(data.data);

  }
  
}  

funcProductPreviewDetails(data){
  this.isPreviewProductsDetails = true;
  this.frmPreviewProductsDetails.patchValue(data);

}
funcApplicationRejection(app_data){
    
  //this.spinner.show();
      this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_product_applications', 'application_status_id')
      .subscribe(
        data => {
          this.applicationRejectionData = data.data;
          this.spinner.hide();
          
          this.isApplicationRejectionVisible= true;
          
        });
} funcPrintProductRegistrationCertificate(app_data){
  let report_url = this.base_url+'reports/generateProductRegCertificate?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}

funcPrintApplicationReceipts(app_data){

  let report_url = this.base_url+'reports/generateApplicationReceipts?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}
funcPrintApplicationInvoice(app_data){

  let report_url = this.base_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
  this.funcGenerateRrp(report_url,"Application Invoice")
  
}
funcPrintLetterofRejection(app_data){
    //print details

    let report_url = this.base_url+'reports/generateProductRejectionLetter?application_code='+app_data.application_code;
    this.funcGenerateRrp(report_url,"Application Details");

}
funcPrintApplicationDetails(app_data){
  //print details

    let report_url = this.base_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
    this.funcGenerateRrp(report_url,"Application Details");
   
}
funcGenerateRrp(report_url,title){
  
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcProductArchiveApplication(data){
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_product_applications', this.onLoadProductApplciations)
}

funcProductSampleSubmissionStageDetails(data){

    this.spinner.show();
    this.appService.getProductApplicationInformation(data.application_id,'getProductSampleStageInformation')
    .subscribe(
      data => {
        this.processData = data.data;
        this.spinner.hide();
        if(data.success){
          console.log(this.processData[0]);
          this.title = this.processData[0].process_title;
          this.router_link = this.processData[0].router_link;
          
          this.appService.setProductApplicationDetail(this.processData[0]);

          this.app_route = ['./online-services/' + this.router_link];

          this.router.navigate(this.app_route);
        }
        else{
          this.toastr.error(this.processData.message, 'Alert!');

        }
      
      });

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
}
}
