import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';
@Component({
  selector: 'app-importgeneralicense-dashboard',
  templateUrl: './importgeneralicense-dashboard.component.html',
  styleUrls: ['./importgeneralicense-dashboard.component.css']
})
export class ImportgeneralicenseDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  ngOnInit() {
    this.sub_module_id = '99';
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
    this.onLoadProductAppType(this.sub_module_id);
    this. onLoadApplicationCounterDetails(this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.application_title = 'General Import License Dashboard';  
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
        text: 'Initiate Import License Application',
        tooltip: 'Initialisation of Import/Export License Application ',
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
    
   // this.app_route = ['./online-services/importexportapp-sel'];
    //this.router.navigate(this.app_route);
  }
}