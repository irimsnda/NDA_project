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
  selector: 'app-publicapp-documents',
  templateUrl: './publicapp-documents.component.html',
  styleUrls: ['./publicapp-documents.component.css']
})
export class PublicappDocumentsComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: any;
  @Input() module_id: number;
  @Input() document_type_id: number;
  @Input() premise_type_id: number;

  
  @Input() query_ref_id: number;
  @Input() prodclass_category_id: number;
  appDocumentsUploadData: any;
  appDocumentsUploadRequirement:any;
  filesToUpload: Array<File> = [];
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  documentMenuItems = [
    {
      text: "Action(s)",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        
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
	  
  }ngOnChanges(changes: SimpleChanges): void {
 
	  this.onLoadApplicationDocUploads();
    
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
  }
 
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  
  funDownloadApplicationDocument(data) {
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
  onLoadApplicationDocUploads(){
    let document_type_id = 2;
    let action_params = { document_type_id: document_type_id, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id,query_ref_id:this.query_ref_id,prodclass_category_id:this.prodclass_category_id};
    this.dmsService.onLoadApplicationDocploads(action_params,'getUploadedApplicationDoc')
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadData = data.data;
            
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }

}
