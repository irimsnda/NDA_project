

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
  selector: 'app-productlocal-representation',
  templateUrl: './productlocal-representation.component.html',
  styleUrls: ['./productlocal-representation.component.css']
})
export class ProductlocalRepresentationComponent implements  OnInit {

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
  constructor(private viewRef: ViewContainerRef, private utilityService:Utilities,private spinner: SpinnerVisibilityService,public toastr: ToastrService,private configService: ConfigurationsService, private appService: ProductApplicationService, private router: Router, public modalService: NgxSmartModalService, private config: ConfigurationsService) { 

  }
  //productAppdataTable

  ngOnInit() {
    
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
    this.onLoadApplicationstatuses();

  }
  onLoadProductApplciations(filter_params={}) {

    this.appService.onProductApplicationLoading(filter_params,'getLocaAgentProductApplications',1)
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
 
 
  refreshDataGrid() {
    
    this.onLoadProductApplciations({});
  }
  funcProductPreviewDetails(data){
      this.isPreviewProductsDetails = true;
      this.frmPreviewProductsDetails.patchValue(data);

  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData;
 
     if(action_btn.action === 'preview'){
      this.funcProductPreviewDetails(data.data);
    }
    else if(action_btn.action == 'print_applications'){
      this.funcPrintApplicationDetails(data.data);
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
 
  funcPrintProductRegistrationCertificate(app_data){
    let report_url = this.mis_url+'reports/generateProductRegCertificate?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  
  funcPrintApplicationReceipts(app_data){

    let report_url = this.mis_url+'reports/generateApplicationReceipts?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
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
  funcGenerateRrp(report_url,title){
    
      this.printiframeUrl =  this.configService.returnReportIframe(report_url);
      this.printReportTitle= title;
      this.isPrintReportVisible = true;

  }
  funcProductArchiveApplication(data){
      this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_product_applications', this.onLoadProductApplciations)
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