import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef, ViewChild } from '@angular/core';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AppSettings } from 'src/app/app-settings';

import { WizardComponent } from 'ng2-archwizard';
@Component({
  selector: 'app-largedocuments-upload',
  templateUrl: './largedocuments-upload.component.html',
  styleUrls: ['./largedocuments-upload.component.css']
})
export class LargedocumentsUploadComponent implements OnInit {
  @Input() application_code: number;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  upload_url:string;
  printiframeUrl:string;
  appDocumentsUploadData: any;
  document_requirement_id:string;
  appDocumentsUploadRequirement:any;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  node_ref:string;
  id:number;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  documentMenuItems = [
    {
      text: "Action(s)",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  documentVersionMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];
  dataGrid: DxDataGridComponent;
  isDocumentUploadPopupVisible: boolean = false;

  document_previewurl: any;

  isDocumentPreviewDownloadwin: boolean = false;
  loading: boolean = false;
  appDocumentUploadfrm:FormGroup;
  premDocumentsVersionsUploadData: any;
  isDocumentVersionPreviewDownloadwin: boolean = false;

  trader_id:number;
   mistrader_id:number;
   email_address:number;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public dmsService: DocumentManagementService, public utilityService: Utilities) { }
  ngOnInit() {
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

    this.appDocumentUploadfrm = this.formBuilder.group({
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    this.onLoadApplicationDocUploads();
	  this.onLoadAppDocRequirements();
	  
  }
  onLoadAppDocRequirements() {
    this.spinner.show();
    let document_type_id = 2;//remove the specific
    this.dmsService.onLoadDocRequirements(this.application_code, this.section_id, this.sub_module_id, '',this.status_id,'','')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadRequirement = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  onApplicationDocumentToolbar(e) {

    this.functDataGridToolbar(e);

  } funAddApplicationUploadDetails(data) {

    this.document_requirement_id = data.data.document_requirement_id;
    this.appDocumentUploadfrm.get('document_requirement_id').setValue(this.document_requirement_id);
    this.appDocumentUploadfrm.get('description').setValue('');

    this.isDocumentUploadPopupVisible = true;

  }

  functDataGridToolbar(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          text:'Reload Documents',
          type: 'success',
          onClick: this.onLoadApplicationDocUploads.bind(this)
        }
      });
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  appDocumentsActionColClick(e, data) {

    if (data.node_ref != '') {

      var action_btn = e.itemData;
      if (action_btn.action === 'download') {
        this.funcDocmentPreviewedit(data.data);
      }
      else if (action_btn.action == 'update') {
        this.funcDocumentUpdateDetails(data.data);
      }
      else if (action_btn.action == 'delete') {
        this.funcDocumentDeleteDetails(data.data);
      }
      else if (action_btn.action == 'version') {
        this.funcDocmentPreviewDocumentVerison(data.data);
      }
      else if (action_btn.action == 'versiondownload') {
        this.funcDocmentPreviewedit(data.data);
      }

    }
    else {

      this.toastr.success('Document yet to be uploaded', 'Response');

    }

  }

  funcDocmentPreviewedit(data) {
    this.spinner.show();

    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.id)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);

            this.isDocumentPreviewDownloadwin = true;

          }
          else {

            this.toastr.success(response_data.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }
  onLoadApplicationDocUploads() {
    let document_type_id = 2;
    this.spinner.show();
    let action_params = { document_type_id: document_type_id, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id};
    this.dmsService.onLoadApplicationDocploads(action_params,'getApplicationDocploads')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadData = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.appDocumentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.appDocumentUploadfrm.get('file').value);
    input.append('id', this.appDocumentUploadfrm.get('id').value);
    input.append('node_ref', this.appDocumentUploadfrm.get('node_ref').value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.appDocumentUploadfrm.get('file').setValue(file);
    }
  }
  onaplicationDocumentUpload() {
    this.spinner.show();
    
     this.document_requirement_id = this.appDocumentUploadfrm.get('document_requirement_id').value;
     this.node_ref = this.appDocumentUploadfrm.get('node_ref').value;
     this.id = this.appDocumentUploadfrm.get('id').value;

     this.upload_url = this.base_url+'documentmanagement/uploadLargeApplicationDocument?module_id='+this.module_id+"&sub_module_id="+this.sub_module_id+"&application_code="+this.application_code+"&document_requirement_id="+this.document_requirement_id+"&node_ref="+this.node_ref+"&id="+this.id;
    this.spinner.hide();
    window.open(this.upload_url, "_blank");
    this.isDocumentUploadPopupVisible = false;
  }
  funcGetSafeUrl(data){
  //  this.document_requirement_id
    this.upload_url = this.base_url+'documentmanagement/uploadLargeApplicationDocument?module_id='+this.module_id+"&sub_module_id="+this.sub_module_id+"&application_code="+this.application_code+"&document_requirement_id="+data.data.document_requirement_id+"&node_ref="+data.data.node_ref+"&trader_id="+this.trader_id+"&id="+data.id;
   // return this.configService.getSafeUrl(this.upload_url);
   return  this.configService.returnFixedHeightReportIframe(this.upload_url,150);
  }
  funcDocumentUpdateDetails(data) {
    this.appDocumentUploadfrm.patchValue(data);
    //load the personnel qualifiations 

    this.isDocumentUploadPopupVisible = true;

  } funcDocumentDeleteDetails(app_data) {
    let file_name = app_data.file_name;
    let initial_file_name = app_data.initial_file_name;
    let node_ref = app_data.node_ref;
    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected file with ' + file_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          //this.spinner.show();
          this.dmsService.onApplicationDocumentDelete(this.application_code, node_ref, record_id,'onApplicationDocumentDelete')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {

                  this.onLoadApplicationDocUploads();

                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
                this.loading = false;
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
  funcDocmentPreviewDocumentVerison(data) {
    this.spinner.show();
    this.dmsService.getApplicationDocumentPreviousVersions(this.application_code, data.node_ref)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.premDocumentsVersionsUploadData = response_data.data;

            this.isDocumentVersionPreviewDownloadwin = true;

          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }
}
