import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-prodretention-dashboard',
  templateUrl: './prodretention-dashboard.component.html',
  styleUrls: ['./prodretention-dashboard.component.css']
})
export class ProdretentionDashboardComponent implements OnInit {
  pending_submission:number =0;
  queried_products:number =0;
  approved_products:number=0;
  dtProductApplicationData:any;
  is_popupguidelines:boolean;
  sub_module_id:number = 67;
  module_id:number = 1;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  guidelines_title:string= "Product Retention Requests & Payments";
  applicationStatusData:any;
  FilterDetailsFrm:FormGroup;app_route:any;
  isPreviewApplicationProcessing:boolean;
  productApplicationProcessingData:any;
  prodretentionapp_details:any;
  constructor(public viewRef: ViewContainerRef, public utilityService:Utilities,public spinner: SpinnerVisibilityService,public toastr: ToastrService,public configService: ConfigurationsService, public appService: ProductApplicationService, public router: Router, public modalService: NgxSmartModalService, public config: ConfigurationsService) { 
    this.FilterDetailsFrm = new FormGroup({
      application_status_id: new FormControl('', Validators.compose([]))
    });

  }

  ngOnInit() {
    this.onLoadApplicationstatuses();
    this.onLoadProductretentionRequests();
    
  }
  onLoadProductretentionRequests(filter_params={}) {
    
    this.appService.onProductApplicationLoading(filter_params,'getProductProductretentionRequests',1)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtProductApplicationData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  } onClickSubModulehelpGuidelines(){
    this.is_popupguidelines = true;
  }onLoadApplicationstatuses() {
    
    var data = {
      table_name: 'wb_statuses'
    };
    this.config.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
         this.applicationStatusData =  data;
        });
  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
     
    this.onLoadProductretentionRequests({});
  }onSelectProdutFilters(e) {
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.onLoadProductretentionRequests({application_status_id:application_status_id});

  }  onProductsesappsToolbarPreparing(e) {
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
    
    this.onLoadProductretentionRequests({});
  }
  onClickInitiateNewRetentionRequest(){
    this.app_route = ['./online-services/product-retention-apprequests'];
    this.prodretentionapp_details = {module_id: this.module_id, process_title: 'Product Retention Requests & Payments', sub_module_id: this.sub_module_id, section_id: '',status_id: 1,status_name: 'New'};
    this.appService.setProductApplicationDetail(this.prodretentionapp_details);
    this.router.navigate(this.app_route);
  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action,data.data);

  }
  
  singleApplicationActionColClick(data){
    
    this.funcActionsProcess(data.action,data);

  }
  
  funcActionsProcess(action_btn,data){


    if(action_btn === 'edit'){
      this.funcProductPreveditDetails(data);
    }
    
    else if(action_btn == 'query_response'){
      
      this.funcProductPreveditDetails(data);

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
    
  }funcPrintApplicationInvoice(app_data){
   
    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";

    this.funcGenerateRrp(report_url,"Retention Statement Invoice")
    
  } funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcPrintApplicationReceipts(app_data){
  this.utilityService.setApplicationDetail(app_data);
  this.app_route = ['./online-services/application-payments'];
  this.router.navigate(this.app_route);
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
  funcProductPreveditDetails(data) {
    //details
      
      //get the details 
      this.spinner.show();
      data.process_title = "Marketing Authorisation Annual Retention Request";
       this.appService.setProductApplicationDetail(data);
      this.app_route = ['./online-services/product-retention-apprequests'];
       this.router.navigate(this.app_route);
       this.spinner.hide();

} onLoadProductsCounterDetails() {

  this.utilityService.onLoadApplicationCounterDetails('wb_product_applications', this.sub_module_id)
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
                }

          }
        }
        
      });
}
funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
} 
}
