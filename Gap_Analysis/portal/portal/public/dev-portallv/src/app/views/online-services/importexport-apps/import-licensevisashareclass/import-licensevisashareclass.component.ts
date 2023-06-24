import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';
@Component({
  selector: 'app-import-licensevisashareclass',
  templateUrl: './import-licensevisashareclass.component.html',
  styleUrls: ['./import-licensevisashareclass.component.css']
})
export class ImportLicensevisashareclassComponent implements OnInit {
  @ViewChild(DxDataGridComponent)

  dataGrid: DxDataGridComponent;

  dtAppGuidelinesData: any = {};

  sectionsData: any;
  applicationTypeData: any;
  dtAppsnProcessesData: any;
  dtImportExpApplicationData:any;
  applicationSelectionfrm: FormGroup;
  processData: any;
  title: string;
  router_link: string;
  app_route: any;
  applications_details: any;
  sectionItem: any;
  app_typeItem: any;
  section_id: number;
  sub_module_id: number;
  module_id: number = 4;
  checkApplicationSubmission: boolean = false;
  application_details: any;
  isPermitproductsPopupVisible:boolean = false;
  isDocumentUploadPopupVisible: boolean = false
  registeredProductsData:any ={};
  constructor(private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, public config: ConfigurationsService, private appService: ImportexportService,public httpClient: HttpClient,public authService: AuthService,private modalServ: ModalDialogService,public viewRef: ViewContainerRef,public utilityService: Utilities) {
    
    this.onLoadSections();
    this.onApplicationProcessGuidelines()
    this.applicationSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.applicationTypeData, Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
   

  }
  
  onApplicationSelection() {

    if (this.applicationSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.applicationSelectionfrm.controls['section_id'];
    this.app_typeItem = this.applicationSelectionfrm.controls['sub_module_id'];
    this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;

    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.application_details = { module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id,application_status_id: 1,status_name: 'New' };
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
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }

  onApplicationProcessGuidelines() {
    var data = {
      table_name: 'par_sections',
      module_id: 4
    };
    this.config.onApplicationProcessGuidelines(data)
      .subscribe(
        data => {
          if (data.success) {
            this.dtAppGuidelinesData = data.data;
          }

        });
  }

  onApplicationBackToDashboard(router_url) {
    this.app_route = ['./online-services/'+router_url];

    this.router.navigate(this.app_route);
  }
  submissionsTermscheckbox(e) {
    console.log(e.value);
    this.checkApplicationSubmission = e.value;

  }

  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

  }
  onRegisteredProductGridToolbar(e) {
    this.functDataGridToolbar(e, this.nonFUnction, '');

  }
  nonFUnction(){

  }
  funAddApplicationUploadDetails() {

    this.isDocumentUploadPopupVisible = true;

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
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
  funcViewRegisteredProducts(){

    this.OnReloadPermitProducts();

  }
  onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        hidden: true,
        options: {
          icon: 'refresh',hidden: true,
          onClick: this.OnReloadPermitProducts.bind(this)
        }
      });
  }
  
  OnReloadPermitProducts(){
    let section_id = this.applicationSelectionfrm.get('section_id');
    let me = this;
    this.spinner.show();
          this.appService.onPermitApplicationLoading('importexportapp/getAuthorisedProductsApplications',{})
          .subscribe(
            resp_data => {
              if (resp_data.success) {
    
                this.isPermitproductsPopupVisible = true;
                this.registeredProductsData = resp_data.data;
    
              }
              else {
                
                this.toastr.error(resp_data.message, 'Alert!');
    
              }
              this.spinner.hide();
            });
      }
      funcpopWidth(percentage_width) {
          return window.innerWidth * percentage_width/100;
      }
      reloadPermitApplicationsApplications() {
        let filter_params = {application_status_id: '10', permit_type_id: 1};
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
      
      funcInitiateLicenseApplication(data){
        let app_data = data.data;
        this.modalServ.openDialog(this.viewRef, {
          title: 'Do you want to Initiate Request for License Application?',
          childComponent: '',
          settings: {
            closeButtonClass: 'fa fa-close'
          },
          actionButtons: [{
            text: 'Yes',
            buttonClass: 'btn btn-danger',
            onAction: () => new Promise((resolve: any, reject: any) => {
              this.spinner.show();
              this.utilityService.getApplicationProcessInformation(app_data.application_code,'importexportapp/funcInitiateLicenseApplication')
            .subscribe(
              data => {
                this.title = app_data.application_type;
                if(data.success){
    
                  app_data.application_status_id = 1;
                  app_data.process_title = this.title;
                  this.appService.setApplicationDetail(data.app_data);
                  this.app_route = ['./online-services/importexport-application'];
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
