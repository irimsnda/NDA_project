import { Component, OnInit } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';

@Component({
  selector: 'app-ctrregistry-dashboard',
  templateUrl: './ctrregistry-dashboard.component.html',
  styleUrls: ['./ctrregistry-dashboard.component.css']
})
export class CtrregistryDashboardComponent extends  CtrregistrySharedclassComponent {
  isInitalQueryResponseFrmVisible:boolean;
  applicationPreckingQueriesData:any;
 dataset:any;
  ngOnInit() {
    this.reloadClinicalApplications();

    this.appService.setApplicationDetail(this.dataset);

  }
  reloadClinicalApplications() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalRegistryDetails',{})
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtClinicalTrialRegistryData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        });
  }onClinicalTrialToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.reloadClinicalApplications.bind(this)
      }
    });
  }
  onExportClinicalTriaRegistry(d){


  } 
  
  
  onEditClinicalTriaRegistry(app_data,is_readonly=false){
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalRegistryAppData',{application_code:app_data.application_code})
    .subscribe(
      resp_data => {
        if (resp_data.success) {
          resp_data.data.is_readonly =is_readonly;
          this.appService.setApplicationDetail( resp_data.data);
          this.app_route = ['./clinicaltrial-registry/clinicaltrialreg-registration'];
          this.router.navigate(this.app_route);
        }
        else {
          this.toastr.error(resp_data.message, 'Alert!');

        }
        this.spinner.hide();
      });

  
    
  }

  onAppQueryPreparing(e) {
    
    e.toolbarOptions.items.unshift();

  }

  closeQueryResponseWin(){
    this.isInitalQueryResponseFrmVisible = false;
  }
  funcgetPreckingQueriesData(application_code){
    this.utilityService.getApplicationPreQueriesDetails(application_code,'wb_product_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.isInitalQueryResponseFrmVisible = true;
        this.spinner.hide();
      });
  }
  onPreviewClinicalTriaQueries(app_data){
    
    this.funcgetPreckingQueriesData(app_data.application_code);

  }funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
}
