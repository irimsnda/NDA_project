import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-controldrugs-dashboard',
  templateUrl: './shared-controldrugs-dashboard.component.html',
  styleUrls: ['./shared-controldrugs-dashboard.component.css']
})
export class SharedControldrugsDashboardComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  module_id:number = 12;
  app_details:any;
  guidelines_title:any;
  is_popupguidelines:boolean;
  approved_applications: number = 0;
  pending_submission: number = 0;
  queried_applications: number = 0;
  rejected_applications: number = 0;
  submitted_application:number= 0;
  release_underseal:number=0;
  
  dtImportExpApplicationData: any = [];
  islicensesSearchWinVisible: boolean =false;
  expanded: boolean = false;
  app_route: any;
  app_response: any;
  processData: any;
  title: string;
  router_link: string;
  sub_module_id: number;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
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
  application_title:string;
  productappTypeData:any;
  applicationStatusData:any;
  sectionsData:any;
  importExportPermitTypesData:any;
  application_code:number;
    isInvoiceGenerationWin:boolean;
  constructor(public utilityService:Utilities,public viewRef: ViewContainerRef, public modalServ: ModalDialogService, public spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, public configService: ConfigurationsService, public appService: ImportexportService) { 

    this.onLoadSections();
    this.onLoadApplicationstatuses();
  
    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      importexport_permittype_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });
    
    this.frmPreviewAppDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
      sender_receiver: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  ngOnInit(){

   

  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

  onLoadApplicationCounterDetails(sub_module_id) {

    this.utilityService.onLoadApplicationCounterDetails('wb_importexport_applications',sub_module_id)
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
              } if (rec.status_id == 10 || rec.status_id == 33 || rec.status_id == 26) {
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
  funcApplicationSelectcion() {

    this.app_route = ['./online-services/controldrugspermits-sel'];
    this.router.navigate(this.app_route);

  }
  
 
  onClickSubModulehelpGuidelines(){
    this.is_popupguidelines = true;
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

  funcProductPreviewDetails(data){
      this.isPreviewApplicationDetails = true;
      this.frmPreviewAppDetails.patchValue(data);

  }
  applicationActionColClick(e,data){
  
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn,data.data);

  }
  
  singleApplicationActionColClick(data){
    
    this.funcActionsProcess(data,data);

  }
 
  funcActionsProcess(action_btn, data) {
   
    if(action_btn.action === 'edit'){
      this.funcApplicationPreveditDetails(data);
    }
    else if(action_btn.action === 'preview'){
      this.funcProductPreviewDetails(data);
    }
    else if(action_btn.action == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    
    else if(action_btn.action == 'pre_rejection'){
      this.funcApplicationRejection(data);
    }
    else if(action_btn.action == 'query_response'){
      
      this.funcApplicationPreveditDetails(data);

    }
    else if(action_btn.action == 'processing_details'){
      
      this.onLoadApplicationProcessingData(data);

    }
    else if(action_btn.action == 'print_invoice'){
      
      this.funcPrintApplicationInvoice(data);

    } 
    else if(action_btn.action == 'print_receipt'){
      
      this.funcPrintApplicationReceipts(data);

    }
    else if(action_btn.action == 'print_rejectionletter'){
      
      this.funcPrintLetterofRejection(data);

    }
    else if(action_btn.action == 'approval_permit' || action_btn.action == 'print_permit'){
      
      this.funcgenenerateImportExportPermit(data);

    }
  }
  funcApplicationRejection(app_data){
    
    //this.spinner.show();
        this.utilityService.getApplicationPreRejectionDetails(app_data.application_code,'wb_importexport_applications', 'application_status_id')
        .subscribe(
          data => {
            this.applicationRejectionData = data.data;
            this.spinner.hide();
            
            this.isApplicationRejectionVisible= true;
          });
  }
  funcPrintApplicationDetails(app_data){
    //print details

      let report_url = this.mis_url+'reports/generateOnlineControlDrugsPermitsApplicationRpt?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Report");
     
  }
  funcgenenerateImportExportPermit(app_data){
    let report_url = this.mis_url+'reports/genenerateImportExportPermit?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url,"Report")
    
  }
  
  funcPrintApplicationReceipts(app_data){
      this.utilityService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/application-payments'];
     
      this.router.navigate(this.app_route);

    
  }
  funcPrintApplicationInvoice(app_data){
    this.application_code = app_data.application_code;

    this.isInvoiceGenerationWin = true;
    return;
    
  }
  funcPrintLetterofRejection(app_data){
      //print details

      let report_url = this.mis_url+'reports/generateImportExportRejectionLetter?application_code='+app_data.application_code;
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
    this.router_link = app_data.router_link;
    if(this.router_link == ''){
      this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
      return;
    }
   
    if (app_data.application_status_id == 1) {
      this.title = app_data.process_title;
      
      this.appService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/' + this.router_link];
     
      this.router.navigate(this.app_route);
    }
    else if (app_data.application_status_id == 2) {
      this.title = app_data.process_title;
      this.router_link = app_data.router_link;
      this.appService.setApplicationDetail(app_data);
      //this.app_route = ['./online-services/premises-reg-preview'];
      this.router.navigate(this.app_route);
    }
    else{
     
      this.title = app_data.process_title;
      this.router_link = app_data.router_link;
      this.appService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/' + this.router_link];
      this.router.navigate(this.app_route);

    }
  }
  onLoadimportexport_permittypes(sub_module_id) {
    this.spinner.show();
    var data = {
      table_name: 'par_importexport_permittypes',
      sub_module_id:sub_module_id
    };
    
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.importExportPermitTypesData = data;
          this.spinner.hide();
        });
  }
  
}
