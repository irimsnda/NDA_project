import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';

@Component({
  selector: 'app-application-queries',
  templateUrl: './application-queries.component.html',
  styleUrls: ['./application-queries.component.css']
})
export class ApplicationQueriesComponent implements OnInit {
  isApplicationQueriessDetailsWin:boolean=false;
  applicationQueriesRequestsFrm:FormGroup;
  applicationQueriesRequestsData:any;
  app_resp:any;
  queriesChecklistCategoryData:any;
  variationCategoriesData:any;
  appDocumentsUploadRequirement:any;
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;

  @Input() query_ref_id: number;

  @Input() prodclass_category_id: number;
  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  appDocumentsUploadData: any;
  app_querydata_id:number;

  appDocumentUploadfrm:FormGroup;
  isDocumentUploadPopupVisible:boolean = false;
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
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef,  public config: ConfigurationsService, public spinner: SpinnerVisibilityService,public utilityService: Utilities,public toastr: ToastrService,public dmsService: DocumentManagementService,public formBuilder: FormBuilder,public configService: ConfigurationsService) { 
   
  }

  ngOnInit() {
    
    this.applicationQueriesRequestsFrm = new FormGroup({
      checklist_item_id: new FormControl('', Validators.compose([Validators.required])),
      
      query_details: new FormControl('', Validators.compose([Validators.required])),
      
      id: new FormControl('', Validators.compose([]))
    });

    this.appDocumentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      app_querydata_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
    this.onLoadqueriesChecklistCategoryData();
    this.onLoadApplicationQueriesData();


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
  } funAddApplicationUploadDetails(data) {
    if(this.app_querydata_id <1){
      this.toastr.error('Save Variation REquest DEtails before you Upload Document(s)', 'Alert');
      return;

    }
    
    let document_requirement_id = data.data.document_requirement_id;
    
    this.appDocumentUploadfrm.get('document_requirement_id').setValue(document_requirement_id);
    this.appDocumentUploadfrm.get('app_querydata_id').setValue(this.app_querydata_id);
    
    this.appDocumentUploadfrm.get('file').setValue('');
    this.appDocumentUploadfrm.get('description').setValue('');

    this.isDocumentUploadPopupVisible = true;

  }
  
  onApplicationQueriesDetailsToolbar(e) {
    this.functDataGridToolbar(e, this.funcApplicationqueriesDetails, 'Add Variation requests');
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
    },{
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Reload',
        type: 'refresh',
        icon: 'fa fa-refresh',
        onClick: this.onLoadApplicationQueriesData.bind(this)

      }

    });
  }
  funcApplicationqueriesDetails(){
    this.isApplicationQueriessDetailsWin = true;
    this.applicationQueriesRequestsFrm.reset();
   
    
  }
  funcEditQueryRequestDetails(data) {

    this.applicationQueriesRequestsFrm.patchValue(data.data);
    //load the personnel qualifiations
    this.isApplicationQueriessDetailsWin = true;
    
    this.app_querydata_id= data.data.id;
  }
  funcDeleteApplicationQueryRequestsDetails(site_data) {
    this.funcDeletehelper(site_data, 'checklistitems_queries', 'application_queries', 'Application Queries Request');
  }
  onApplicationDocumentToolbar(e) {

    this.functDataGridToolbarUpload(e);

  } functDataGridToolbarUpload(e) {
    e.toolbarOptions.items.unshift( {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Note: Maximum File Size per upload is 100 MB and Multiple Documents can be uploaded under the specified group(s)',
        type: 'danger',
        icon: 'fa fa-plus'
      }
    });
  }
  funcDeletehelper(record_data, table_name, reload_funccheck, delete_title) {
    let app_data = record_data.data;
    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected ' + app_data.name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.utilityService.onDeleteUniformAppDetails(record_id, table_name, this.application_code, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  if (reload_funccheck == 'application_queries') {

                    this.onLoadApplicationQueriesData();

                  }
                  
                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {

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
  onLoadApplicationQueriesData() {
    //onLoadClinicalTrialOtherdetails
    this.utilityService.getApplicationUniformDetails({ table_name: 'checklistitems_queries', application_code: this.application_code }, 'getapplicationQueriessrequests')
      .subscribe(
        data => {
          if (data.success) {
            this.applicationQueriesRequestsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onsaveApplicationQueriesRequests() {
    this.spinner.show();
    let table_name;
        table_name = 'wb_application_queriessdata';
        if (this.applicationQueriesRequestsFrm.invalid) {
      
             this.toastr.error('Fill all the Product Details', 'Alert');
             return;
           }
           
    this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.applicationQueriesRequestsFrm.value, 'onsaveApplicationQueriesrequests')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
           this.isApplicationQueriessDetailsWin = false;
            //reload
            this.onLoadApplicationQueriesData();
            
            this.app_querydata_id= this.app_resp.record_id;
            this.applicationQueriesRequestsFrm.get('id').setValue(this.app_resp.record_id);
            
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
 

  onLoadqueriesChecklistCategoryData() {
    //onLoadClinicalTrialOtherdetails
    this.utilityService.getApplicationUniformDetails({ table_name: 'checklistitems_queries', section_id: this.section_id , sub_module_id: this.sub_module_id}, 'getUnstructuredQueryChecklistItem')
      .subscribe(
        data => {
          if (data.success) {
            this.queriesChecklistCategoryData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadvariationCategoriesData(variation_type_id) {
    var data = {
      table_name: 'par_variations_categories',
      variation_type_id:variation_type_id,
      sub_module_id:this.sub_module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.variationCategoriesData = data;
        });

  }
  onTypeofVariationSelect($event){
    this.onLoadvariationCategoriesData($event.selectedItem.id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.appDocumentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.appDocumentUploadfrm.get('file').value);
    input.append('id', this.appDocumentUploadfrm.get('id').value);
    input.append('node_ref', this.appDocumentUploadfrm.get('node_ref').value);
    input.append('app_querydata_id', this.applicationQueriesRequestsFrm.get('id').value);
    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.appDocumentUploadfrm.get('file').setValue(file);
    }
  }
}
