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
  selector: 'app-product-reg-dashboard',
  templateUrl: './product-reg-dashboard.component.html',
  styleUrls: ['./product-reg-dashboard.component.css']
})
export class ProductRegDashboardComponent implements  OnInit {
  app_renewalduenotifications:number=0
  app_renewalduenotificationsdetails:any;
  isViewApplicationDueforRenewal:boolean = false;

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
  dtGroupedProductApplicationData:any ={};
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
  submitted_application:number=0;
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
  isProductApplicationInitialisation:boolean;
  isDismissApplicationWin:boolean=false;
  applicationDismissalFrm:FormGroup;
  sub_module_id:number;
  appprocess_title:string;
  prodclass_category_id:number;
  prodClassCategoryItem:any;
  prodClassCategoriesData:any;
  prodProductTypeData:any;
  appsubmissionTypesData:any;
  isviewGroupedApplications:boolean= false;
  constructor(public viewRef: ViewContainerRef, public utilityService:Utilities,public spinner: SpinnerVisibilityService,public toastr: ToastrService,public configService: ConfigurationsService, public appService: ProductApplicationService, public router: Router, public modalService: NgxSmartModalService, public config: ConfigurationsService) { 

          // this.modalService.getModal('productAppSelection').open();
          this.applicationDismissalFrm = new FormGroup({
            dismissal_reason_id: new FormControl('', Validators.compose([Validators.required])),
            dismissal_remarks: new FormControl('', Validators.compose([Validators.required])),
            application_code: new FormControl('', Validators.compose([Validators.required]))

          });
          this.productAppSelectionfrm = new FormGroup({
            section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            regulated_producttype_id: new FormControl('', Validators.compose([])),
            appsubmissions_type_id: new FormControl('', Validators.compose([])),
            prodclass_category_id: new FormControl('', Validators.compose([Validators.required]))
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
       //   this.onLoadProductAppType();
         
          this.onLoadApplicationstatuses();
          this.onLoadreasonForDismissalData();

          this.onLoadApplicationCounterDueforRenewal();
          this.onLoadprodProductTypeData();
         this.onLoadappsubmissionTypesData();

  }
  //productAppdataTable

  ngOnInit() {
    
  }
   onLoadprodClassCategoriesData(regulated_producttype_id) {
    var data = {
      table_name: 'par_prodclass_categories',
      regulated_producttype_id:regulated_producttype_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodClassCategoriesData = data;
        });

  }
  
  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodProductTypeData = data;
        });
  }
  
  onLoadappsubmissionTypesData() {
    var data = {
      table_name: 'par_appsubmission_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.appsubmissionTypesData = data;
        });
  }
  
  onprodProductTypeDataChange($event) {
    if($event.selectedItem){
      let prodtypes =$event.selectedItem;
      this.onLoadprodClassCategoriesData(prodtypes.id)
    }
    
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
  onLoadApplicationCounterDueforRenewal(){
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
  onLoadApplicationDetailsDueforRenewal(){
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
    if (this.productAppSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.productAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.productAppSelectionfrm.controls['sub_module_id'];
    this.prodClassCategoryItem = this.productAppSelectionfrm.controls['prodclass_category_id'];
    let appsubmissions_type_id = this.productAppSelectionfrm.get('appsubmissions_type_id').value;
    this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;
    this.prodclass_category_id = this.prodClassCategoryItem.value;
    
    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1,this.section_id,this.prodclass_category_id, appsubmissions_type_id)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            //console.log(processData);

            this.router_link = this.processData[0].router_link;
            this.productsapp_details = {module_id: this.module_id,prodclass_category_id: this.prodclass_category_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id,status_id: 1,status_name: 'New', form_fields:this.processData.form_fields,appsubmissions_type_id:appsubmissions_type_id};
            this.appService.setProductApplicationDetail(this.productsapp_details);
            if(this.sub_module_id == 7 && appsubmissions_type_id == 2){
                this.app_route = ['./online-services/' + this.router_link];
            }
            else{
              this.app_route = ['./online-services/' + this.router_link];
            }
            this.router.navigate(this.app_route);
            this.isProductApplicationInitialisation = false;
          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }
        });
    return false;
  }
  onProductClassificationChange($event) {
    if($event.selectedItem){
      let prodclass_category =$event.selectedItem;
      
      this.productAppSelectionfrm.get('section_id').setValue(prodclass_category.section_id);

    }
  }
  onLoadProductsCounterDetails(sub_module_id) {

    this.utilityService.onLoadApplicationCounterDetails('wb_product_applications',sub_module_id)
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
             // this.dtPremisesApplicationData = data.data;
             for(let rec of records){
             
                  if(rec.status_id == 1){
                    this.pending_submission = rec.application_counter;
                  }if(rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 7 || rec.status_id == 13  || rec.status_id == 14  || rec.status_id == 15 || rec.status_id == 17){
                    this.queried_products += rec.application_counter;
                  }if(rec.status_id == 10){
                    this.approved_products = rec.application_counter;
                  }if(rec.status_id == 11){
                    this.rejected_products = rec.application_counter;
                  }if(rec.status_id == 19 || rec.status_id == 20){
                    this.dossier_products = rec.application_counter;
                  }if(rec.status_id == 2 || rec.status_id == 3){
                    this.submitted_application = rec.application_counter;
                  }
            }
          }
          
        });
  }


  onLoadProductAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      sub_module_id:sub_module_id,
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
    
    this.onLoadProductApplciations({sub_module_id:this.sub_module_id});
  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 7 || sub_module_id == 91){
      //this.app_route = ['./online-services/productapplication-sel'];
      //this.router.navigate(this.app_route);
      this.isProductApplicationInitialisation = true;
      this.productAppSelectionfrm.get('sub_module_id').setValue(sub_module_id);
    }else if(sub_module_id == 30){
       // this.productsapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id,prodclass_category_id:3,section_id:4};
       // this.appService.setProductApplicationDetail(this.productsapp_details);

        //this.app_route = ['./online-services/newmedicaldevices-notification'];

       // this.router.navigate(this.app_route);
       this.isProductApplicationInitialisation = true;
       this.productAppSelectionfrm.get('sub_module_id').setValue(sub_module_id);

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
  
  
  funcProductPreviewDetails(data){
      this.isPreviewProductsDetails = true;
      this.frmPreviewProductsDetails.patchValue(data);

  }
  funcActionsProcess(action_btn,data){


    if(action_btn === 'edit'){
      this.funcProductPreveditDetails(data);
    }
    else if(action_btn === 'preview'){
      this.funcProductPreviewDetails(data);
    }
    else if(action_btn == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    else if(action_btn == 'archive'){
      this.funcProductArchiveApplication(data);
    }
    else if(action_btn == 'pre_rejection'){
      this.funcApplicationRejection(data);
    }
    else if(action_btn == 'query_response'){
      
      this.funcProductPreveditDetails(data);

    }
    else if(action_btn == 'sample_submission'){
      
      this.funcProductSampleSubmissionStageDetails(data);

    }
    else if(action_btn == 'processing_details'){
      
      this.onLoadApplicationProcessingData(data);

    }
    else if(action_btn == 'print_invoice'){
      
      this.funcPrintApplicationInvoice(data);

    } 
    else if(action_btn == 'print_receipt'){
      
      this.funcPrintApplicationReceipts(data);

    }
    
    else if(action_btn == 'print_rejectionletter'){
      
      this.funcPrintLetterofRejection(data);

    }
    else if(action_btn == 'reg_certificate'){
      
      this.funcPrintProductRegistrationCertificate(data);

    }else if(action_btn == 'dismiss_applications'){
      
      this.funcDismissApplication(data);

    }else if(action_btn == 'view_groupedapplications'){
      
      this.funcviewGroupedApplications(data);

    }
  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action,data.data);

  }
  
  singleApplicationActionColClick(data){
    
    this.funcActionsProcess(data.action,data);

  }
  
  funcDismissApplication(data){
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
          this.onLoadProductApplciations({sub_module_id: this.sub_module_id});

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
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./online-services/application-payments'];
   
    this.router.navigate(this.app_route);

  
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
  funcviewGroupedApplications(data){
      let group_application_code = data.group_application_code;
      this.spinner.show();
        this.appService.onProductApplicationLoading({group_application_code:group_application_code},'getProductApplications',1)
          .subscribe(
            resp_data => {
              if (resp_data.success) {
                this.dtGroupedProductApplicationData =  resp_data.data;
                this.isviewGroupedApplications = true;   this.spinner.hide();
              }
              else {
                this.spinner.hide();
                this.toastr.error(resp_data.message, 'Alert!');
              }
            });
  }
  funcProductPreveditDetails(data) {
    //details
      if(data.appsubmissions_type_id >0 && data.group_application_code >0){
        this.spinner.show();
        this.appService.getProductApplicationInformation(data.group_application_code,'getGroupedProductApplicationInformation')
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
                this.isviewGroupedApplications =false;
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
      else{
        this.spinner.show();
        this.appService.getProductApplicationInformation(data.application_code,'getProductApplicationInformation')
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
    
    

}

  onSelectProdutFilters(e) {
    let sub_module_id = this.sub_module_id;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.onLoadProductApplciations({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
  } onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);
    
}
}