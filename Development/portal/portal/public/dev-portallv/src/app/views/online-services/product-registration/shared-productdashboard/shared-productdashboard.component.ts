import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import DataSource from "devextreme/data/data_source";
import { ProductApplicationService } from '../../../../services/product-applications/product-application.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule
} from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-shared-productdashboard',
  templateUrl: './shared-productdashboard.component.html',
  styleUrls: ['./shared-productdashboard.component.css']
})
export class SharedProductdashboardComponent implements  OnInit {

  productappTypeData:any;
  applicationStatusData:any;
  selectBoxReportType:any;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  frmPreviewProductsDetails:FormGroup;
  FilterDetailsFrm:FormGroup;
  productApplicationProcessingData:any;
  isPreviewProductsDetails:boolean= false;
  isPreviewApplicationProcessing:boolean= false;

  selectBoxDataSource:any;
  dtProductApplicationData: any = {};
  prod_resp:any;

  applicationType_id: number;
  applicationType_name: string;
  productAppSelectionfrm: FormGroup;
  section_id: number;
  productApplications_records: any;//productApplicationMdl[]
  sectionItem: any;
  app_typeItem: any;
  app_route: any;
  productApps: any;
  sectionsData: any;
  module_data: any;

  productapp_details: any;
  applicationProcessData: any;
  processData: any;
  product_applications: any = [];
  title: string;
  router_link: string;

  approved_products:number= 0;
  pending_submission:number=0;
  queried_products:number=0;
  rejected_products:number=0;
  dossier_products:number=0;
  applicationRejectionData:any;
  isApplicationRejectionVisible:boolean= false;

  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  module_id:number =1;
  productsapp_details:any;
  reasonForDismissalData:any;
  public appTableWidget: any;

  isDismissApplicationWin:boolean=false;
  applicationDismissalFrm:FormGroup;
  constructor(public viewRef: ViewContainerRef, public utilityService:Utilities,public spinner: SpinnerVisibilityService,public toastr: ToastrService,public configService: ConfigurationsService, public appService: ProductApplicationService, public router: Router, public modalService: NgxSmartModalService, public config: ConfigurationsService) { 

          // this.modalService.getModal('productAppSelection').open();
          this.applicationDismissalFrm = new FormGroup({
            dismissal_reason_id: new FormControl('', Validators.compose([Validators.required])),
            dismissal_remarks: new FormControl('', Validators.compose([Validators.required])),
            application_code: new FormControl('', Validators.compose([Validators.required]))

          });
          this.frmPreviewProductsDetails = new FormGroup({
            tracking_no: new FormControl('', Validators.compose([Validators.required])),
            brand_name: new FormControl('', Validators.compose([Validators.required])),
            classification: new FormControl('', Validators.compose([Validators.required])),
            common_name: new FormControl('', Validators.compose([Validators.required])),
            application_type: new FormControl('', Validators.compose([Validators.required])),
            status: new FormControl('', Validators.compose([Validators.required]))
          });
          this.FilterDetailsFrm = new FormGroup({
            sub_module_id: new FormControl('', Validators.compose([])),
            section_id: new FormControl('', Validators.compose([])),
            application_status_id: new FormControl('', Validators.compose([]))
          });
          this.onLoadSections();
          this.onLoadProductAppType();
          this.onLoadProductApplciations({});
          this.onLoadProductsCounterDetails();
          this.onLoadApplicationstatuses();
          this.onLoadreasonForDismissalData();
  }
  //productAppdataTable

  ngOnInit() {
    
  }
  onLoadProductApplciations(filter_params={}) {
    
    this.appService.onProductApplicationLoading(filter_params,'getProductApplications',1)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtProductApplicationData =  resp_data.data;
            
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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
  onLoadreasonForDismissalData() {
    
    var data = {
      table_name: 'par_applicationdismissal_reasons'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.reasonForDismissalData =  data;
        });
  }
  funcselNewApplication() {

    this.app_route = ['./online-services/productapplication-sel'];
    this.router.navigate(this.app_route);
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
  }
  /** Slection product process */
  onProductAppSelection() {
    this.sectionItem = this.productAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.productAppSelectionfrm.controls['applicationType_process'];
    this.section_id = this.sectionItem.value;
    this.configService.getApplicationProces(this.sectionItem.value, this.app_typeItem.value)
      .subscribe(
        data => {
          //console.log(data);
          this.processData = data;
          this.title = this.processData[0].name;
          this.router_link = this.processData[0].router_link;

          this.app_route = ['./online-services/' + this.router_link];

          this.productapp_details = { process_title: this.title, appsection_id: this.sectionItem.value, section_name: this.sectionItem.text, sub_module_id: this.app_typeItem.value, app_title: this.app_typeItem.text };
          this.appService.setProductApplicationDetail(this.productapp_details);

          this.router.navigate(this.app_route);

        });

    return false;

  }

  onLoadProductsCounterDetails() {

    this.utilityService.onLoadApplicationCounterDetails('wb_product_applications')
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
             
                  if(rec.status_id == 1){
                    this.pending_submission = rec.application_counter;
                  }if(rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 17){
                    this.queried_products += rec.application_counter;
                  }if(rec.status_id == 10){
                    this.approved_products = rec.application_counter;
                  }if(rec.status_id == 11){
                    this.rejected_products = rec.application_counter;
                  }if(rec.status_id == 19 || rec.status_id == 20){
                    this.dossier_products = rec.application_counter;
                  }

            }
          }
          
        });
  }


  onLoadProductAppType() {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 1
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
  //sub process 
  onProductsesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 7){
      this.app_route = ['./online-services/productapplication-sel'];
      this.router.navigate(this.app_route);
    }else if(sub_module_id == 30){
        this.productsapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id,prodclass_category_id:3,section_id:4};
        this.appService.setProductApplicationDetail(this.productsapp_details);

        this.app_route = ['./online-services/newmedicaldevices-notification'];

        this.router.navigate(this.app_route);
      
    }else{

      this.productsapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setProductApplicationDetail(this.productsapp_details);

      this.app_route = ['./online-services/registered-product-selection'];

      this.router.navigate(this.app_route);
    }

  }
  onViewRegisteredProductsApps(registration_status,validity_status,process_title){

    
      this.productsapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
      this.appService.setProductApplicationDetail(this.productsapp_details);

      this.app_route = ['./online-services/registered-products'];

      this.router.navigate(this.app_route);
   
  }
  
  refreshDataGrid() {
    
    this.onLoadProductApplciations({});
  }
  funcProductPreviewDetails(data){
      this.isPreviewProductsDetails = true;
      this.frmPreviewProductsDetails.patchValue(data);

  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData;
 
    if(action_btn.action === 'edit'){
      this.funcProductPreveditDetails(data.data);
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
      
      this.funcProductPreveditDetails(data.data);

    }
    else if(action_btn.action == 'sample_submission'){
      
      this.funcProductSampleSubmissionStageDetails(data.data);

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

    }else if(action_btn.action == 'dismiss_applications'){
      
      this.funcDismissApplication(data.data);

    }

    
  } funcDismissApplication(data){
    this.applicationDismissalFrm.get('application_code').setValue(data.application_code)
    this.isDismissApplicationWin = true;
  }
  onSubmitApplicationDismissal(data){

    if (this.applicationDismissalFrm.invalid) {
      return;
    }
    this.utilityService.onSubmitApplicationDismissal('tra_product_applications','wb_product_applications',this.applicationDismissalFrm.value,'' )
    .subscribe(
      data => {
        
        let app_resp = data.json();
        if (app_resp.success) {

          this.toastr.success(app_resp.message, 'Response');
          this.isDismissApplicationWin = false;
          this.onLoadProductApplciations({});

        }else{
          this.toastr.error(app_resp.message, 'Alert');
        }
        

      });

  }
  funcPrintProductRegistrationCertificate(app_data){
    let report_url = this.mis_url+'reports/generateProductRegCertificate?application_code='+app_data.application_code+"&product_id="+app_data.product_id+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Certificate");
    
  }
  
  funcPrintApplicationReceipts(app_data){

    let report_url = this.mis_url+'reports/generateApplicationReceipts?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcPrintLetterofRejection(app_data){
      //print details

      let report_url = this.mis_url+'reports/generateProductRejectionLetter?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");

  }
  funcPrintApplicationDetails(app_data){
    //print details

      let report_url = this.mis_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");
     
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
  funcProductPreveditDetails(data) {
    //details

      //get the details 
      this.spinner.show();
      this.appService.getProductApplicationInformation(data.application_id,'getProductApplicationInformation')
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
  onSelectProdutFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.onLoadProductApplciations({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.onLoadProductApplciations({});


  }
}