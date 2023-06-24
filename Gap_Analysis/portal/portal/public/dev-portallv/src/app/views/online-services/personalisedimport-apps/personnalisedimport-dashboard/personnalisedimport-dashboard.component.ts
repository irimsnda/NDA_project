import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalDialogService,SimpleModalComponent } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent, DxActionSheetModule } from 'devextreme-angular';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';


@Component({
  selector: 'app-personnalisedimport-dashboard',
  templateUrl: './personnalisedimport-dashboard.component.html',
  styleUrls: ['./personnalisedimport-dashboard.component.css']
})
export class PersonnalisedimportDashboardComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  is_popupguidelines:boolean;
  approved_applications: number = 0;
  pending_submission: number = 0;
  queried_applications: number = 0;
  rejected_applications: number = 0;
  submitted_application:number=0;
  release_underseal:number=0;
  dtImportExpApplicationData: any = [];
  expanded: boolean = false;
  app_route: any;
  module_id:number =25;
  app_response: any;
  processData: any;
  title: string;
  router_link: string;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  isPreviewApplicationDetails:boolean= false;
  frmPreviewAppDetails:FormGroup;
  section_id:number;
  applicationSelectionfrm: FormGroup;
  applicationRejectionData:any;
  isApplicationRejectionVisible:boolean= false;
  FilterDetailsFrm:FormGroup;
  productappTypeData:any;
  applicationStatusData:any;
  sectionsData:any;guidelines_title:string;
  sub_module_id: string;
  permit_type_id: 1;
  application_title:string;
  sectionItem:any;
    app_typeItem:any;
    application_details:any;
    sub_module_idsel:number;
    isPermitInitialisation:boolean;
    confirmDataParam:any;
    has_nonregisteredproducts:boolean =false;
    is_approvedVisaPermit:boolean =false;
    win_submitinvoicepayments:boolean;



    appsub_module_id:number;
    app_routing:any;
    appmodule_id:number;
    appsection_id:number;
    appstatus_id:number;
    appapplication_code:number;
    permitProductsData:any;
  onApplicationSubmissionFrm:FormGroup;
  has_approvedauthorisation:boolean=false;
  constructor(public utilityService:Utilities,private viewRef: ViewContainerRef, private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, private configService: ConfigurationsService, public appService: ImportexportService) { // this.onLoadApplicationCounterDetails();
    this.onLoadSections();
    this.onLoadconfirmDataParam();
    this.onLoadApplicationstatuses();
    //this.onLoadProductAppType();

    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });
    this.applicationSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl('', Validators.compose([])),
      has_approvedproduct_authosation: new FormControl('', Validators.compose([Validators.required]))
    });


    this.frmPreviewAppDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),reference_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
      sender_receiver: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    }); 
    
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
     submission_comments:new FormControl('', Validators.compose([]))
    });
}

  ngOnInit(){

   
  } onSelectionHasApprovedAuthorisation($event){
    let confirm_id = $event.selectedItem.id;
    if(confirm_id ==1){
      this.has_approvedauthorisation = true;
    }
    else{
      this.has_nonregisteredproducts = false;
      alert('Kindly submit the list of products for the One year Authorisation before you intiate an import permit Application.');
      this.isPermitInitialisation = false;
      this.app_route = ['./online-services/oneyearauthorisation-dashboard'];
      this.router.navigate(this.app_route);

    } 

  }
  
  onApplicationSelection() {
    this.sub_module_idsel = 87;
    const invalid = [];
    const controls = this.applicationSelectionfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id','')+' and Initiate Import permit application', 'Alert');
            return;
        }
    }
    if (this.applicationSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.applicationSelectionfrm.controls['section_id'];
    
    this.section_id = this.sectionItem.value;

    this.configService.getSectionUniformApplicationProces(this.sub_module_idsel, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.application_details = { module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_idsel, section_id: this.section_id,application_status_id: 1,status_name: 'New' };
            this.appService.setApplicationDetail(this.application_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  } 
  
  funcpopWidth(percentage_width) {
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

  reloadPermitApplicationsApplications(filter_params) {
    let app_route = 'getPersonalImportPermitsApplicationLoading';
    if(this.sub_module_id == '86'){
        app_route = 'getPersonalOneYearImportAuthorisationapplication'
    }
    this.appService.onPermitApplicationLoading('importexportapp/'+app_route,filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtImportExpApplicationData = resp_data.data;

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
      is_product_type:1
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onLoadconfirmDataParam() {
    var data = {
      table_name: 'par_confirmations'
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  
  onLoadProductAppType(sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      module_id: 4,
      sub_module_id:sub_module_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }
   
  funcRequestforPermitAlteration() {
    this.app_route = ['./online-services/importexport-approvedappsel'];
    this.router.navigate(this.app_route);
  }
  
  funcRequestforExportLicenseApplication() {
    this.app_route = ['./online-services/export-licensesappselection'];
    this.router.navigate(this.app_route);
  } funcRequestforPermitInspections() {
    this.app_route = ['./online-services/importexport-approvedappinspection'];
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

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  funcProductPreviewDetails(data){
      this.isPreviewApplicationDetails = true;
      this.frmPreviewAppDetails.patchValue(data);
      this.onLoadPermitProductsData(data.application_code);
    }
    onLoadPermitProductsData(application_code) {
      this.spinner.show();
      this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
        .subscribe(
          data => {
            if (data.success) {
  
              this.permitProductsData = data.data;
  
            }
            else {
              this.toastr.success(data.message, 'Alert');
            }
            this.spinner.hide();
          },
          error => {
            return false
          });
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

     // this.funcApplicationPreveditDetails(data);
    }
    else if(action_btn.action === 'preview'){
      this.funcProductPreviewDetails(data);
    }
    else if(action_btn.action == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    else if(action_btn.action == 'archive'){
      this.funcArchivePermitApplication(data);
    }else if(action_btn.action == 'delete_application'){
      this.funcDeletePermitApplication(data);
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

    else if(action_btn.action == 'reg_certificate' || action_btn.action == 'reg_certificate'){
      
      this.funcgenenerateImportExportPermit(data);

    }
    else if(action_btn.action == 'approval_permit' || action_btn.action == 'print_permit'){
      
      this.funcgenenerateImportExportPermit(data);

    }
    else if(action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails'){
      
      this.funcUploadPaymentDetails(data);

    }
  }
  funcUploadPaymentDetails(data){
    this.appsub_module_id = data.sub_module_id;
    this.appmodule_id = data.module_id;
    this.appsection_id = data.section_id;
    this.appapplication_code = data.application_code;
    if(this.appsub_module_id == 78 || this.appsub_module_id ==82){
         this.app_routing  = ['./online-services/importlicense-dashboard'];
    }else{
          this.app_routing  = ['./online-services/exportlicense-dashboard'];
    }
      data.onApplicationSubmissionFrm = this.onApplicationSubmissionFrm;
      data.app_routing = this.app_routing;
      
      this.utilityService.setApplicationDetail(data);
      this.app_route = ['./online-services/application-invoices'];
     
      this.router.navigate(this.app_route);

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

      let report_url = this.mis_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
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

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url,"Report")
    
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
  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    

  }
  
  funcDeletePermitApplication(data) {
    this.utilityService.funcApplicationDeleteCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    

  }
  onSelectProdutFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let section_id = this.FilterDetailsFrm.get('section_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadPermitApplicationsApplications({sub_module_id:sub_module_id,section_id:section_id,application_status_id:application_status_id});

  }
  onClearProdutFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPermitApplicationsApplications({});


  }
  onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);
    
}
}
