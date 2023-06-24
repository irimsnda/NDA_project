import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clinical-trialdash',
  templateUrl: './clinical-trialdash.component.html',
  styleUrls: ['./clinical-trialdash.component.css']
})
export class ClinicalTrialdashComponent implements OnInit {
  productApplicationProcessingData:any;
  isPreviewApplicationsDetails:boolean= false;
  isPreviewApplicationProcessing:boolean= false;
  frmPreviewApplicationsDetails:FormGroup;

  applicationRejectionData:any;
  isApplicationRejectionVisible:boolean= false;

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  base_url = AppSettings.base_url;
  application_title:string;
  mis_url = AppSettings.mis_url;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  approved_products: number = 0;
  pending_submission: number = 0;
  queried_products: number = 0;
  rejected_products: number = 0;queried_applications:number = 0;
  submitted_application: number = 0;
  contextMenuItems: any = [
    { text: "New Clinical Trial Application", icon: 'add', click: 'onClick', action: 'new' },
    { text: "Clinical Trial Ammendment Application", icon: 'edit', action: 'alteration' }]

  dtClinicalTrialApplicationData: any;
  app_response: any;
  application_sel: any;
  app_route: any;
  application_details:any;
  module_id:number= 7;
  sub_module_id:number;
  router_link:any;
  title:string;
  clinicalapp_details:any;
  clincialtrialappTypeData:any;
  FilterDetailsFrm:any;
  applicationStatusData:any;
  constructor(private utilityService:Utilities,private viewRef: ViewContainerRef, private modalServ: ModalDialogService, private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, private configService: ConfigurationsService, private appService: ImportexportService) {
    
    this.FilterDetailsFrm = new FormGroup({
      sub_module_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });

    this.frmPreviewApplicationsDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      study_title: new FormControl('', Validators.compose([Validators.required])),
      protocol_no: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
   }

  ngOnInit() {

   
  }
  reloadClinicalApplications(filter_params) {
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalApplicationsDetails',filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.dtClinicalTrialApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  onLoadclincialtrialappType(sub_module_id) {

    var data = {
      table_name: 'sub_modules',
      module_id: 7,
      sub_module_id:sub_module_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.clincialtrialappTypeData =  data;
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
  onSelectAppsFilters() {
    
    let sub_module_id = this.sub_module_id;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    this.reloadClinicalApplications({sub_module_id:sub_module_id,application_status_id:application_status_id});

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onClearApplicationFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadClinicalApplications({sub_module_id:this.sub_module_id});
    

  }

  handleItemClickEvent(e) {

    this.application_sel = e.itemData;
    if (this.application_sel.action == 'new') {
      this.app_route = ['./online-services/newclinical-trials'];
      this.application_details = { module_id: this.module_id, process_title: 'Clinical Trial Application', sub_module_id: 10, section_id: 5 };
    
    }
    else {
      this.app_route = ['./online-services/clinical-trialsammendment'];
      this.application_details = { module_id: this.module_id, process_title: 'Clinical Trial Ammendments', sub_module_id: 11, section_id: 5 };
    
    }
    this.appService.setApplicationDetail(this.application_details);

    this.router.navigate(this.app_route);
    
  }
  onClinicalTrialToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  funcProductPreviewDetails(data){
    this.isPreviewApplicationsDetails = true;
    this.frmPreviewApplicationsDetails.patchValue(data);

}
singleApplicationActionColClick(data){
    
  this.funcActionsProcess(data.action,data);

}

  applicationActionColClick(e, data) {
    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action, data.data);
  }
  funcActionsProcess(action, data){
       
    if (action === 'edit') {
      this.funcApplicationPreveditDetails(data);
    }
    else if (action == 'print_applications') {
      //this.funcPremisePreviewDetails(data.data);
    }
    else if(action === 'preview'){
      this.funcProductPreviewDetails(data);
    }
    else if(action == 'print_applications'){
      this.funcPrintApplicationDetails(data);
    }
    else if(action == 'archive'){
      this.funcApplicationArchiveApplication(data);
    }
    else if(action == 'pre_rejection'){
      this.funcApplicationRejection(data);
    }
    else if(action == 'query_response'){
      
      this.funcApplicationPreveditDetails(data);

    }
    else if(action == 'reg_certificate'){
      
      this.funcPrintRegistrationCertificate(data);

    }
    else if(action == 'processing_details'){
      
      this.onLoadApplicationProcessingData(data);

    }
    else if(action == 'print_invoice'){
      
      this.funcPrintApplicationInvoice(data);

    }
    else if(action == 'print_rejectionletter'){
      
      this.funcPrintLetterofRejection(data);

    }

  }
  
  funcPrintLetterofRejection(app_data){
      //print details
      let report_url = this.mis_url+'reports/generateClinicalTrialLetterOfRejection?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");

  }
  funcPrintRegistrationCertificate(app_data){

    let report_url = this.mis_url+'reports/generateClinicalTrialCertificate?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_clinical_trial_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcApplicationArchiveApplication(data){

    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_clinical_trial_applications', this.reloadClinicalApplications)
    
 
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
  funcPrintApplicationInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"sub_module_id="+app_data.sub_module_id;
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  funcPrintApplicationDetails(app_data){
    //print details

      let report_url = this.base_url+'reports/generateClinicalTrialApplicationRpt?application_code='+app_data.application_code;
      this.funcGenerateRrp(report_url,"Application Details");
     
  }
  funcGenerateRrp(report_url,title){
    
      this.printiframeUrl =  this.configService.returnReportIframe(report_url);
      this.printReportTitle= title;
      this.isPrintReportVisible = true;

  }
  funcApplicationPreveditDetails(app_data){
    
    this.title = app_data.process_title;
      this.router_link = app_data.router_link;
      this.appService.setApplicationDetail(app_data);
      this.app_route = ['./online-services/' + this.router_link];
      this.router.navigate(this.app_route);

  }
  funcArchivePermitApplication(data) {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to submit the application to archive, Note the application will not be accessible from the active premises application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          //this.spinner.show();
          this.appService.onPermitApplicationArchive(data.application_id, data.tracking_no)
            .subscribe(
              response => {

                this.app_response = response.json();
                //the details 
                this.spinner.hide();

                if (this.app_response.success) {
                  this.toastr.success(this.app_response.message, 'Response');
                  //this.reloadPermitApplicationsApplications();
                } else {
                  this.toastr.error(this.app_response.message, 'Alert');
                }
              },
              error => {
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
  }
  onLoadProductsCounterDetails() {

    this.utilityService.onLoadApplicationCounterDetails('wb_clinical_trial_applications',this.sub_module_id)
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
                  }
                  if(rec.status_id == 3 || rec.status_id ==3){
                    this.submitted_application = rec.application_counter;
                  }
            }
          }
          
        });
  }
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

    if(sub_module_id == 10){

      this.app_route = ['./online-services/newclinical-trials'];
      this.clinicalapp_details = {application_status_id:1,status_name:'New', module_id: this.module_id, process_title: 'Clinical Trial Application', sub_module_id: sub_module_id, section_id: 5 };
      this.router.navigate(this.app_route);

    }else if(sub_module_id ==69){
      this.app_route = ['./online-services/preclinical-trialssubmissions'];
      this.clinicalapp_details = {application_status_id:1,status_name:'New', module_id: this.module_id, process_title: 'Pre-submission Clinical Trial Application', sub_module_id: sub_module_id, section_id: 5 };
      this.router.navigate(this.app_route);
      
    }else{

      this.clinicalapp_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id,section_id: 5 };
      this.app_route = ['./online-services/registered-clinicaltrialselection'];

    }
    this.appService.setApplicationDetail(this.clinicalapp_details);

    this.router.navigate(this.app_route);
  }
  onViewRegisteredGMPApps(registration_status,validity_status,process_title){

    this.clinicalapp_details = {registration_status: registration_status, process_title: process_title, validity_status: validity_status};
    this.appService.setApplicationDetail(this.clinicalapp_details);

    this.app_route = ['./online-services/registered-clinicaltrialapplications'];

    this.router.navigate(this.app_route);

}
onViewRegisteredClinicalTrialsApps(){

  
} onCellPrepared(e) {
  this.utilityService.onCellPrepared(e);
  
}
}
