import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';

@Component({
  selector: 'app-impexportamend-dashboard',
  templateUrl: './impexportamend-dashboard.component.html',
  styleUrls: ['./impexportamend-dashboard.component.css']
})
export class ImpexportamendDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  
  ngOnInit() {
    this.sub_module_id = '79,85';
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
    this.onLoadProductAppType(this.sub_module_id);
    this. onLoadApplicationCounterDetails(this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.application_title = 'Licenses Amendment Request Dashboard';  
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
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Initiate License Amendment Request',
        tooltip: 'Initialisation of License Amendment Application on the Approved Licenses Application.',
        type: 'default',
        icon: 'fa fa-pencil-square-o',
        onClick: this.funcRequestforLicenseApplication.bind(this)
      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }funcRequestforLicenseApplication() {
    this.isPermitInitialisation = true;
    this.app_route = ['./online-services/importexport-approvedappsel'];
    this.router.navigate(this.app_route);
  }
  /*
  funcRequestforLicenseApplication() {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Requirements for Import License?',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Import License authorizes imported regulated products to enter the Country after complying with all importation requirements:<br/>Import License for Registered products </br> Application of Import License on Approved Visa on Non-Registered and Authorised Products.'
      },
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Proceed with License Application',
        buttonClass: 'btn btn-success',
        onAction: () => new Promise((resolve: any, reject: any) => {
              this.spinner.show();
              this.app_route = ['./online-services/import-licensesappselection'];
              this.router.navigate(this.app_route);
        })
      }, {
        text: 'Initiate Visa Application',
        buttonClass: 'btn btn-warning',
        onAction: () => new Promise((resolve: any) => {
            this.app_route = ['./online-services/importexportapp-sel'];
            this.router.navigate(this.app_route);

        })
      }, {
        text: 'Close',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any) => {

          resolve();

        })
      }
      ]
    });

    
   

  }
  */
}
