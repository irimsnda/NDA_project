import { Component, OnInit } from '@angular/core';
import { SharedControldrugsDashboardComponent } from '../../shared-controldrugs-dashboard/shared-controldrugs-dashboard.component';

@Component({
  selector: 'app-order-suppydangerous-dash',
  templateUrl: './order-suppydangerous-dash.component.html',
  styleUrls: ['./order-suppydangerous-dash.component.css']
})
export class OrderSuppydangerousDashComponent extends SharedControldrugsDashboardComponent implements OnInit {
  
  ngOnInit() {

    this.reloadPermitApplicationsApplications({is_orderlocal_supply:1});
   
    this.onLoadProductAppType(12);

  }
  onLoadProductAppType(module_id) {
    
    var data = {
      table_name: 'sub_modules',
      module_id: module_id,
      is_orderlocal_supply: 1
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
         this.productappTypeData =  data;
        });
  }onClickSubModuleAppSelection(sub_module_id,sub_module_name){

       this.app_details = {module_id: this.module_id, process_title: sub_module_name, sub_module_id: sub_module_id};
         this.appService.setApplicationDetail(this.app_details);
 
         this.app_route = ['./online-services/order-suppydangerous-drugs-request'];
 
         this.router.navigate(this.app_route);
     
 
   }

   
  onClearPermitsFilters(){
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
     
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:1});


  }
  
  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef,data,'wb_importexport_applications', this.reloadPermitApplicationsApplications);
    
  }
  onSelectPermitFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let importexport_permittype_id = this.FilterDetailsFrm.get('importexport_permittype_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
     
    
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:1,sub_module_id:sub_module_id,importexport_permittype_id:importexport_permittype_id,application_status_id:application_status_id});

  }
  onSelectSubPermitFilters(e) {
    let sub_module_id = this.FilterDetailsFrm.get('sub_module_id').value;
    let importexport_permittype_id = this.FilterDetailsFrm.get('importexport_permittype_id').value;
    let application_status_id = this.FilterDetailsFrm.get('application_status_id').value;
    this.onLoadimportexport_permittypes(sub_module_id);
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:1,sub_module_id:sub_module_id,importexport_permittype_id:importexport_permittype_id,application_status_id:application_status_id});

  }
  
  refreshDataGrid() {
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:1});

  }
  onImportappsToolbarPreparing(e) {
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

    }
  }
}
