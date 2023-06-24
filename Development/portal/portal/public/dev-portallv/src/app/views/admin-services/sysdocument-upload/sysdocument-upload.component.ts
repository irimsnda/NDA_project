import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef, ChangeDetectionStrategy,ChangeDetectorRef, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-sysdocument-upload',
  templateUrl: './sysdocument-upload.component.html',
  styleUrls: ['./sysdocument-upload.component.css']
})
export class SysdocumentUploadComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: any;
  @Input() module_id: number;
  @Input() workflow_stage: number;
  @Input() document_type_id: number;
  
  @Input() query_ref_id: number;
  @Input() prodclass_category_id: number;
  appDocumentsUploadData: any;
  appDocumentsUploadRequirement:any;
  appProcessDocumentsUploadData:any;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  documentMenuItems = [
    {
      text: "Action(s)",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        //{ text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
       // { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
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
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public dmsService: DocumentManagementService, public utilityService: Utilities,private cd: ChangeDetectorRef) { }
  ngOnInit() {

    this.appDocumentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    this.onLoadApplicationDocUploads();
	  this.onLoadAppDocRequirements();
	  
  }ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes.section_id.currentValue)
    this.onLoadAppDocRequirements();
	  this.onLoadApplicationDocUploads();
    
   }
  onLoadAppDocRequirements() {
   
    let document_type_id = 2;//remove the specific
    this.dmsService.onLoadDocRequirements(this.application_code, this.section_id, this.sub_module_id, '',this.status_id, this.query_ref_id,this.prodclass_category_id)
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadRequirement = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
  refresh() {
    this.cd.detectChanges();
  }
  onApplicationDocumentToolbar(e) {

    this.functDataGridToolbar(e);

  } functDataGridToolbar(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onLoadApplicationDocUploads.bind(this)
        }
      });
  } funAddApplicationUploadDetails(data) {

    let document_requirement_id = data.data.document_requirement_id;
   
    this.appDocumentUploadfrm.get('document_requirement_id').setValue(document_requirement_id);
    this.appDocumentUploadfrm.get('file').setValue('');
    this.appDocumentUploadfrm.get('description').setValue('');

    this.isDocumentUploadPopupVisible = true;

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
    if(data.node_ref == ''){
      this.toastr.success('Upload Document for you to download', 'Response');
      return;
    }
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
    let action_params = { document_type_id: '', application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id,query_ref_id:this.query_ref_id,prodclass_category_id:this.prodclass_category_id, workflow_stage:this.workflow_stage}
    this.dmsService.onLoadApplicationDocploads(action_params,'getProcessApplicationDocploads')
      .subscribe(
        data => {
          if (data.success) {
            this.appProcessDocumentsUploadData = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

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
    const uploadData = this.prepareSave();
    this.dmsService.uploadApplicationDMSDocument(uploadData, this.module_id, this.sub_module_id, this.section_id,  this.application_code, '','uploadApplicationDMSDocument')
      //.pipe(first())
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response.json();
           console.log(response_data);
          if (response_data.success) {
            this.isDocumentUploadPopupVisible = false;
            this.onLoadApplicationDocUploads();

            this.toastr.success(response_data.message, 'Response');
          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });
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
