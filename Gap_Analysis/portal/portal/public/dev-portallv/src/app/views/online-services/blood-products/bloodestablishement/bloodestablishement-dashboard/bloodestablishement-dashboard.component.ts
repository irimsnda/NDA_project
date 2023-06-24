import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { DxDataGridComponent, DxActionSheetModule } from 'devextreme-angular';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { BloodproductssrvService } from 'src/app/services/bloodapps/bloodproductssrv.service';

@Component({
  selector: 'app-bloodestablishement-dashboard',
  templateUrl: './bloodestablishement-dashboard.component.html',
  styleUrls: ['./bloodestablishement-dashboard.component.css']
})
export class BloodestablishementDashboardComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  approved_applications: number = 0;
  pending_submission: number = 0;
  queried_applications: number = 0;
  rejected_applications: number = 0;
  dtBloodEstablishmentApplicationData: any = [];
  expanded: boolean = false;
  app_route: any;
  app_response: any;
  processData: any;
  title: string;
  router_link: string;
  base_url = AppSettings.base_url;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  isPreviewApplicationDetails:boolean= false;
  frmPreviewAppDetails:FormGroup;

  applicationRejectionData:any;
  isApplicationRejectionVisible:boolean= false;
  FilterDetailsFrm:FormGroup;
  productappTypeData:any;
  applicationStatusData:any;
  sectionsData:any;
    module_id:number = 15;
    application_details:any;
  constructor(public utilityService:Utilities,private viewRef: ViewContainerRef, private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, private configService: ConfigurationsService, private appService: BloodproductssrvService) {
    this.FilterDetailsFrm = new FormGroup({
        application_status_id: new FormControl('', Validators.compose([]))
  });

   }

  ngOnInit(){

    this.reloadPermitApplicationsApplications({});
    this.onLoadApplicationCounterDetails();
    this.onLoadSections();
    this.onLoadApplicationstatuses();
    this.onLoadProductAppType();

    

    this.frmPreviewAppDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      reason_for_disposal: new FormControl('', Validators.compose([Validators.required])),
      total_weight: new FormControl('', Validators.compose([Validators.required])),
      market_value: new FormControl('', Validators.compose([Validators.required])),
      
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
       
  }
  onLoadApplicationCounterDetails() {

    this.utilityService.onLoadApplicationCounterDetails('wb_bloodestablishment_applications')
      .subscribe(
        data => {
          if (data.success) {
            let records = data.data;
            // this.dtPremisesApplicationData = data.data;
            for (let rec of records) {

              if (rec.status_id == 1) {

                this.pending_submission = rec.application_counter;
              } if (rec.status_id == 6 || rec.status_id == 8 || rec.status_id == 17) {
                this.queried_applications += rec.application_counter;
              } if (rec.status_id == 10) {
                this.approved_applications = rec.application_counter;
              } if (rec.status_id == 11) {
                this.rejected_applications = rec.application_counter;
              }

            }
          }

        });

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  reloadPermitApplicationsApplications(filter_params) {

    this.appService.onPermitApplicationLoading('bloodproductsapps/getBloodEstabishmentApplicationsLoading',filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtBloodEstablishmentApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
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
  onLoadProductAppType() {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 15
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }
  funcApplicationSelectcion() {
   this.application_details =  {module_id: this.module_id,sub_module_id:41, process_title: 'Disposal Application', application_status_id: 1,status_name: 'New' };

    this.appService.setApplicationDetail( this.application_details);
    this.app_route = ['./online-services/bloodestablishment-applicationsrequest'];
    this.router.navigate(this.app_route);

  }
  BloodEstablishementsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'New Blood Establishment Application',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcApplicationSelectcion.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }

  groupChanged(e) {
    this.dataGrid.instance.clearGrouping();
    this.dataGrid.instance.columnOption(e.value, 'groupIndex', 0);

  }

  collapseAllClick(e) {
    this.expanded = !this.expanded;
    e.component.option({
      text: this.expanded ? 'Collapse All' : 'Expand All'
    });
  }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  funcProductPreviewDetails(data){
      this.isPreviewApplicationDetails = true;
      this.frmPreviewAppDetails.patchValue(data);

  }
  applicationActionColClick(e, data) {
    var action_btn = e.itemData;
   
   
    if(action_btn.action === 'edit'){
      this.funcApplicationPreveditDetails(data.data);
    }
    else if(action_btn.action === 'preview'){
      this.funcProductPreviewDetails(data.data);
    }
    else if(action_btn.action == 'print_applications'){
      this.funcPrintApplicationDetails(data.data);
    }
    else if(action_btn.action == 'archive'){
      this.funcArchivePermitApplication(data.data);
    }
    else if(action_btn.action == 'pre_rejection'){
      this.funcApplicationRejection(data.data);
    }
    else if(action_btn.action == 'query_response'){
      
      this.funcApplicationPreveditDetails(data.data);

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
  funcApplicationRejection(app_data){
    
    //this.spinner.show();
        this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_bloodestablishment_applications', 'application_status_id')
        .subscribe(
          data => {
            this.applicationRejectionData = data.data;
            this.spinner.hide();
            
            this.isApplicationRejectionVisible= true;
          });
  }
  funcPrintApplicationDetails(app_data){
    //print details

      let report_url = this.base_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");
     
  }
  funcPrintProductRegistrationCertificate(app_data){
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
  
  funcGenerateRrp(report_url,title){
    
      this.printiframeUrl =  this.configService.returnReportIframe(report_url);
      this.printReportTitle= title;
      this.isPrintReportVisible = true;

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
  
  funcApplicationPreveditDetails(app_data) {
       this.appService.setApplicationDetail(app_data);
    this.app_route = ['./online-services/disposal-applicationsrequest'];
      this.router.navigate(this.app_route);

  }
  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_bloodestablishment_applications', this.reloadPermitApplicationsApplications);
    

  }
  onSelectProdutFilters(e) {
   
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPermitApplicationsApplications({application_status_id:application_status_id});

  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPermitApplicationsApplications({});


  }
}
