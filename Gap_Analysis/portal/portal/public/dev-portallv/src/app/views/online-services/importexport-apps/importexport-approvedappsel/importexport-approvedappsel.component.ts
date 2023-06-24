import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-importexport-approvedappsel',
  templateUrl: './importexport-approvedappsel.component.html',
  styleUrls: ['./importexport-approvedappsel.component.css']
})
export class ImportexportApprovedappselComponent implements OnInit {
  title:string;
  app_route:any;dtImportExpApplicationData: any = [];
  
  constructor(public toastr: ToastrService,public utilityService: Utilities,public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public spinner: SpinnerVisibilityService,private configService: ConfigurationsService, private appService: ImportexportService,private router: Router ) { }

  ngOnInit() {
    this.reloadPermitApplicationsApplications() 
  }
  funcSelectapprovedPermitforammend(data){
    //functiona call to set the application status 
    let app_data = data.data;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to Initiate Request for License Ammendment?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/initiateRequestforPermitAmmendment')
        .subscribe(
          data => {
            this.title = app_data.process_title;
              app_data.application_status_id = 40;
              this.appService.setApplicationDetail(app_data);
              this.app_route = ['./online-services/importexportlic-ammendrequest'];
              this.router.navigate(this.app_route);
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
   onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        hidden: true,
        options: {
          icon: 'refresh',hidden: true,
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  refreshDataGrid() {

  }
  reloadPermitApplicationsApplications() {
    let filter_params = {application_status_id: '10'};
    this.appService.onPermitApplicationLoading('importexportapp/getImportExpPermitsApplicationLoading',filter_params)
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
  
}
