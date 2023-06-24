import { Component, OnInit} from '@angular/core';
import { SharedControldrugsDashboardComponent } from '../shared-controldrugs-dashboard/shared-controldrugs-dashboard.component';
@Component({
  selector: 'app-controlleddrugspermits-dashboard',
  templateUrl: './controlleddrugspermits-dashboard.component.html',
  styleUrls: ['./controlleddrugspermits-dashboard.component.css']
})
export class ControlleddrugspermitsDashboardComponent extends SharedControldrugsDashboardComponent implements OnInit {

  ngOnInit(){
    

      
  } 
  onClickSubModuleAppSelection(sub_module_id,sub_module_name){

   if(sub_module_id == 60){
    this.app_details = {section_id:14, module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
        this.appService.setApplicationDetail(this.app_details);

        this.app_route = ['./online-services/controlleddrugs-license-application'];

        this.router.navigate(this.app_route);
      
    }else{

      this.app_details = {section_id:14,module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
      this.appService.setApplicationDetail(this.app_details);

     this.app_route = ['./online-services/controlleddrugs-importpermit-application'];
        
      this.router.navigate(this.app_route);
    }

  }onLoadProductAppType(module_id, sub_module_id) {
    
    var data = {
      table_name: 'sub_modules',
      module_id: module_id,
      sub_module_id:sub_module_id,
      is_orderlocal_supply: 0
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }

  onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);
    
}
  onClearPermitsFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0, sub_module_id: this.sub_module_id});


  }
  
  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    

  }
  onSelectPermitFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let importexport_permittype_id = this.FilterDetailsFrm.get('importexport_permittype_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0,sub_module_id:sub_module_id,importexport_permittype_id:importexport_permittype_id,application_status_id:application_status_id});

  }
  onSelectSubPermitFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let importexport_permittype_id = this.FilterDetailsFrm.get('importexport_permittype_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
    this.onLoadimportexport_permittypes(sub_module_id);
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0,sub_module_id:sub_module_id,importexport_permittype_id:importexport_permittype_id,application_status_id:application_status_id});

  } onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          type: 'success',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  
  refreshDataGrid() {
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0});

  }
  
  reloadPermitApplicationsApplications(filter_params) {

    this.appService.onPermitApplicationLoading('importexportapp/getControlledImportPermitsApplicationLoading',filter_params)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.islicensesSearchWinVisible = true;
            this.dtImportExpApplicationData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
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
    else if(action_btn.action == 'archive'){
      this.funcArchivePermitApplication(data);
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

    }else if(action_btn.action == 'initiate_license_application' || action_btn.action == 'initiate_license_application'){
      
      this.funcInitiateLicenseApplication(data);

    }
  }
  
  funcInitiateLicenseApplication(app_data){
        
   
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to Initiate Request for Import License Application?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/funcControlledDrugsInitiateLicenseApplication')
        .subscribe(
          data => {
            this.title = app_data.application_type;
            if(data.success){

              app_data.application_status_id = 1;
              app_data.process_title = this.title;
              this.appService.setApplicationDetail(data.app_data);
              this.app_route = ['./online-services/controlleddrugs-importpermit-application'];
              this.router.navigate(this.app_route);
            }
            else{
              this.toastr.error(data.message, 'Alert!');


            }
              
              this.spinner.hide();
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
}
