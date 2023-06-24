import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';

@Component({
  selector: 'app-exportlicense-dashboard',
  templateUrl: './exportlicense-dashboard.component.html',
  styleUrls: ['./exportlicense-dashboard.component.css']
})
export class ExportlicenseDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  
  ngOnInit() {
    this.sub_module_id = '81';
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
    this.onLoadProductAppType(this.sub_module_id);
    this. onLoadApplicationCounterDetails(this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
this.application_title = 'Export License Dashboard';  
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
        text: 'Intiate Export License Application',
        tooltip: 'Initialisation of Export License Application.',
        type: 'default',
        icon: 'fa fa-pencil-square-o',
        onClick: this.funcRequestforExportLicenseApplication.bind(this)
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

}
