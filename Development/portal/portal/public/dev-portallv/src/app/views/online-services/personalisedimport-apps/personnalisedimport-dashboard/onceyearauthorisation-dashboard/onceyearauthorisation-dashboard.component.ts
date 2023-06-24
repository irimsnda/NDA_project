import { Component, OnInit } from '@angular/core';
import { PersonnalisedimportDashboardComponent } from '../personnalisedimport-dashboard.component';

@Component({
  selector: 'app-onceyearauthorisation-dashboard',
  templateUrl: './onceyearauthorisation-dashboard.component.html',
  styleUrls: ['./onceyearauthorisation-dashboard.component.css']
})
export class OnceyearauthorisationDashboardComponent extends PersonnalisedimportDashboardComponent implements OnInit {
  app_data:any={};
ngOnInit() {
    this.sub_module_id = '86';
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
    this.onLoadProductAppType(this.sub_module_id);
    this. onLoadApplicationCounterDetails(this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.application_title = 'Products One Year Authorisation';  
  }
  onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Help & Guidelines',
        type: 'normal', stylingMode: 'outlined',
        icon: 'fa fa-question-circle',
        width:150,
        onClick: this.onClickSubModulehelpGuidelines.bind(this)
      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Initiate Application for Products Authorisation',
        tooltip: 'Initialisation of Application for Products Authorisation.',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcApplicationSelectcion.bind(this)
      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  funcApplicationSelectcion() {
    this.isPermitInitialisation = true;
  
            this.app_data.application_status_id = 1;
            this.app_data.process_title = 'Products One Year Authorisation';
            this.app_data.sub_module_id = this.sub_module_id;
            this.app_data.module_id = this.module_id;
          
            this.appService.setApplicationDetail(this.app_data);
    this.app_route = ['./online-services/oneyearauthorisation-application'];
    this.router.navigate(this.app_route);
  }
}
