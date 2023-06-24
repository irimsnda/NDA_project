import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';

@Component({
  selector: 'app-application-variation-details',
  templateUrl: './application-variation-details.component.html',
  styleUrls: ['./application-variation-details.component.css']
})
export class ApplicationVariationDetailsComponent implements OnInit {
  isApplicationVariationsDetailsWin:boolean=false;
  applicationVariationRequestsFrm:FormGroup;
  applicationVariationRequestsData:any;
  app_resp:any;
  typeofVariationData:any;
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
  portalapp_variationsdata_id:number;

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
    
    this.applicationVariationRequestsFrm = new FormGroup({
      variation_type_id: new FormControl('', Validators.compose([Validators.required])),
     // variation_category_id: new FormControl('', Validators.compose([Validators.required])),
      present_details: new FormControl('', Validators.compose([])),
      proposed_variation: new FormControl('', Validators.compose([Validators.required])),
      variation_background_information: new FormControl('', Validators.compose([Validators.required])),

      id: new FormControl('', Validators.compose([]))
    });

    this.appDocumentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      portalapp_variationsdata_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
    this.onLoadtypeofVariationData();
    this.onLoadApplicationVariationData();


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
    if(this.portalapp_variationsdata_id <1){
      this.toastr.error('Save Variation REquest DEtails before you Upload Document(s)', 'Alert');
      return;

    }
    
    let document_requirement_id = data.data.document_requirement_id;
    
    this.appDocumentUploadfrm.get('document_requirement_id').setValue(document_requirement_id);
    this.appDocumentUploadfrm.get('portalapp_variationsdata_id').setValue(this.portalapp_variationsdata_id);
    
    this.appDocumentUploadfrm.get('file').setValue('');
    this.appDocumentUploadfrm.get('description').setValue('');

    this.isDocumentUploadPopupVisible = true;

  }
  
  onApplicationVariationsDetailsToolbar(e) {
    this.functDataGridToolbar(e, this.funcApplicationariationsDetails, 'Add Variation requests');
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
        onClick: this.onLoadApplicationVariationData.bind(this)

      }

    });
  }
  funcApplicationariationsDetails(){
    this.isApplicationVariationsDetailsWin = true;
    this.applicationVariationRequestsFrm.reset();
    this.onLoadAppDocRequirements();
    
    this.onLoadApplicationDocUploads();
  }
  funcEditVariationRequestDetails(data) {

    this.applicationVariationRequestsFrm.patchValue(data.data);
    //load the personnel qualifiations
    this.isApplicationVariationsDetailsWin = true;
    
    this.portalapp_variationsdata_id= data.data.id;
    this.onLoadAppDocRequirements();
    this.onLoadApplicationDocUploads();
  }
  funcDeleteApplicationVariationRequestsDetails(site_data) {
    this.funcDeletehelper(site_data, 'wb_application_variationsdata', 'application_variation', 'Application variation Request');
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
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onLoadApplicationDocUploads.bind(this)
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
                  if (reload_funccheck == 'application_variation') {

                    this.onLoadApplicationVariationData();

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
  onLoadApplicationVariationData() {
    //onLoadClinicalTrialOtherdetails
    this.utilityService.getApplicationUniformDetails({ table_name: 'wb_application_variationsdata', application_code: this.application_code }, 'getapplicationVariationsrequests')
      .subscribe(
        data => {
          if (data.success) {
            this.applicationVariationRequestsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onsaveApplicationVariationRequests() {
    this.spinner.show();
    let table_name;
        table_name = 'wb_application_variationsdata';
        if (this.applicationVariationRequestsFrm.invalid) {
      
             this.toastr.error('Fill all the Product Details', 'Alert');
             return;
           }
           
    this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.applicationVariationRequestsFrm.value, 'onsaveApplicationVariationsrequests')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
           // this.isApplicationVariationsDetailsWin = false;
            //reload
            this.onLoadApplicationVariationData();
            
            this.portalapp_variationsdata_id= this.app_resp.record_id;
            this.applicationVariationRequestsFrm.get('id').setValue(this.app_resp.record_id);
            
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
  onsaveApplicationVariationRequests12() {
    console.log(this.applicationVariationRequestsFrm.value);
    this.spinner.show();
    const uploadData = this.prepareSave();
    this.dmsService.uploadApplicationDMSDocument(uploadData, this.module_id, this.sub_module_id, this.section_id,  this.application_code, '','onsaveApplicationVariationsrequests')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response.json();
          if (response_data.success){
this.portalapp_variationsdata_id= response_data.record_id;
            this.isApplicationVariationsDetailsWin = false;

            //reload
            this.onLoadApplicationVariationData();
            this.toastr.success(response_data.message, 'Response');

          }
          else {
            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });

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
          if (response_data.success) {
            this.isDocumentUploadPopupVisible = false;
            this.onLoadApplicationDocUploads();

            this.toastr.success(response_data.message, 'Response');
          }
          else {

            this.toastr.success(response_data.message, 'Response');

          }

        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });
  } 
  onLoadApplicationDocUploads() {
    let document_type_id = 2;
    let action_params = { document_type_id: document_type_id, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,status_id:this.status_id,query_ref_id:this.query_ref_id,prodclass_category_id:this.prodclass_category_id,portalapp_variationsdata_id:this.portalapp_variationsdata_id};
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

        },
        error => {
          return false
        });
  }
  onLoadtypeofVariationData() {
    var data = {
      table_name: 'par_typeof_variations',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.typeofVariationData = data;
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
    input.append('portalapp_variationsdata_id', this.applicationVariationRequestsFrm.get('id').value);
    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.appDocumentUploadfrm.get('file').setValue(file);
    }
  }
  appDocumentsActionColClick(e, data) {

    if (data.node_ref != '') {

      var action_btn = e.itemData;
      if (action_btn.action === 'download') {
        this.funcDocmentPreviewedit(data.data);
      }
     
      else if (action_btn.action == 'delete') {
        this.funcDocumentDeleteDetails(data.data);
      }
      

    }
    else {

      this.toastr.success('Document yet to be uploaded', 'Response');

    }

  }
  funcDocumentDeleteDetails(app_data) {
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
                this.spinner.hide();
                return false;
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
         return false;
        });
  }
}
