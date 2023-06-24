

import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { BloodproductssrvService } from 'src/app/services/bloodapps/bloodproductssrv.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-bloodestablishment-applicationsrequest',
  templateUrl: './bloodestablishment-applicationsrequest.component.html',
  styleUrls: ['./bloodestablishment-applicationsrequest.component.css']
})
export class BloodestablishmentApplicationsrequestComponent implements OnInit {
  //ImportexportService
  //dms 
  @ViewChild(DxDataGridComponent)

  dataGrid: DxDataGridComponent;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp:any;confirmDataParam:any;
  bloodEstablishmentGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  sectionsData: any;
  zoneData: any;
  documentMenuItems = [
    {
      text: "Document(s) Action",
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
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];
 
  appDocumentsUploadData: any = {};
  appDocumentsUploadRequirement: any = {};
  appDocumentsVersionsUploadData: any = {};


  application_details: any;
  status_id: number;
  sub_module_id: number = 41;
  process_title: string;;
  section_id: number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  status_name: string;

  module_id: number = 15;

  app_route: any;
  applicationTypeData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;

  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  isPermitproductsPopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  countries: any;
  regions: any;
  districts: any;

  senderReceiverData: any ={};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any;
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm:FormGroup;

  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;

  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  documentsVersionsUploadData: any;
  documentsUploadData: any;
  documentsUploadRequirementData: any;

  permitProductsData: any;
  registeredProductsData: any = {};
  commonNamesData:any;
  productCategoryData: any;
  devicesTypeData: any;
  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  isPermitproductsAddPopupVisible: boolean = false;
  currencyData: any;
  weightsUnitData: any;
  packagingUnitsData: any;
  classificationData:any;
  quantity: number = 100;
  unit_price: number;
  isnewproductAddWinVisible:boolean= false;
  enabled_newproductadd:boolean= false;
  showProductAddOption: boolean = false;
  is_regulatedproducts:boolean = false;

  isInitalQueryResponseFrmVisible:boolean = false;
  initqueryresponsefrm:FormGroup;
  applicationPreckingQueriesData:any;
  query_sectioncheck:string;  
   permitProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Edit Record", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  constructor(public utilityService:Utilities,public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: BloodproductssrvService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
          //form 
        this.bloodEstablishmentGeneraldetailsfrm = new FormGroup({
          section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
          sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
          name_of_establishment: new FormControl('', Validators.compose([Validators.required])),
          establishment_description: new FormControl('', Validators.compose([Validators.required])),
          zone_id: new FormControl('', Validators.compose([])),
          module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
          application_code: new FormControl(this.application_code, Validators.compose([])),
          
        });

  } ngOnInit() {
    this.application_details = this.appService.getApplicationDetail();

    if (!this.application_details) {
      this.router.navigate(['./../online-services/bloodestablishement-dashboard']);
      return
    }
    else {

      this.sub_module_id = this.application_details.sub_module_id;
      this.process_title = this.application_details.process_title;
      this.section_id = this.application_details.section_id;

      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;

      this.status_name = this.application_details.status_name;
      this.status_id = this.application_details.application_status_id;
      this.application_code = this.application_details.application_code;


    }
    
    this.documentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    
    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
    
    
   
    //this.onLoadpayingCurrencyData();
    this.onloadApplicationTypes();

    this.onLoadZones();
    this.onLoadSections();
    
    this.onLoadconfirmDataParm();
    this.onLoadCommonNames(this.section_id);
    if (this.status_id < 1) {
      this.status_name = "New"
    }
   

    this.onLoadGuidelines(this.sub_module_id, this.section_id);
    if(this.application_details.application_code){
      this.bloodEstablishmentGeneraldetailsfrm.patchValue(this.application_details);
      
    }
        
    
    this.onLoadPermitsDocRequirements(this.application_code, this.section_id, this.sub_module_id);

    if (this.section_id == 4) {
      this.device_type_visible = true;
    }
    
    this.import_typecategory_visible = true;
  
    
    this.funcReloadQueriesDetails();
  
    
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onRegisteredProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add New Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddNewPermitProducts.bind(this)
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
 
  onProductTypesCboSelect($event) {
    this.section_id = $event.selectedItem.id;
    this.onLoadproductCategoryData(this.section_id)
    this.onLoaddevicesTypeData(this.section_id)

    

  }
  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_disposal_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  
 
  onLoadClassifications(section_id) {
    var data = {
      table_name: 'par_classifications',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }
  
  onIsREguatedProdulctsSelect($event){
      if($event.selectedItem.id == 1){
          this.is_regulatedproducts = false;

      }
      else{ 

        this.is_regulatedproducts = true;
      }
  }
  onLoadCommonNames(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNamesData = data;
        });
  }

  onLoadPermitsDocRequirements(application_code, section_id, sub_module_id) {
    let document_type_id = 2;
    this.dmsService.onLoadDocRequirements(application_code, section_id, sub_module_id, '',this.status_id, '','')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.documentsUploadRequirementData = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
  onLoadGuidelines(sub_module_id, section_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id, section_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onApplicationDashboard() {
    this.app_route = ['./online-services/bloodestablishement-dashboard'];

    this.router.navigate(this.app_route);
  }
  onSectionsCboSelect($event) {
    //this.onBusinessTypesLoad($event.value)
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

  onLoadZones() {
    var data = {
      table_name: 'par_zones',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }

  onloadApplicationTypes() {
    var data = {
      table_name: 'sub_modules',
      module_id: this.module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });

  }

  onSaveBloodEstablishmentApplication() {
    if (this.bloodEstablishmentGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.bloodEstablishmentGeneraldetailsfrm.value, this.tracking_no, 'bloodproductsapps/saveBloodEstabishmentApplications')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.tracking_no = this.app_resp.tracking_no;
            this.application_id = this.app_resp.application_id;
            this.application_code = this.app_resp.application_code;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onsaveDisposalPermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'saveDisposalPermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
           // this.onLoadPermitProductsData(this.application_code);
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onPermitProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Permit Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPermitProducts.bind(this)

      }
    },  {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  } funAddPermitProducts() {
   
    this.OnReloadPermitProducts();
    this.isPermitproductsPopupVisible = true;
    
  }
  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    let brand_name = this.permitProductsFrm.get('brand_name').value;
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'saveDisposalPermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

          //  this.onLoadPermitProductsData(this.application_code);
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;
           // record_id
           

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  

  onPermitsApplicationPrint() {


  }
  submissionsTermscheckbox(e) {
   
    this.termscheckbox = e.value;

  }

  onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/disposal-applicationsdashboard'];

    this.utilityService.onPermitsApplicationSubmit(this.viewRef,this.application_code, this.tracking_no,'wb_disposal_applications',this.app_route);
  }

 /*
  onLoadPermitProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getDisposalPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  onLoadregulatedProductsPermitData() {
    this.spinner.show();

    this.appService.getPermitsOtherDetails({},'getregulatedProductsPermitData')
      .subscribe(
        data => {
          if (data.success) {

            this.regulatedProductsPermitData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  
 */
  OnReloadPermitProducts(){

      let me = this;
        this.registeredProductsData.store = new CustomStore({
          load: function (loadOptions: any) {
           
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;//searchValue
              var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
              });
              this.configData = {
                headers: headers,
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, section_id:me.section_id}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getAllRegisteredNonRedProducts',this.configData)
                        .toPromise()
                        .then((data: any) => {
                            return {
                                data: data.data,
                                totalCount: data.totalCount
                            }
                        })
                        .catch(error => {
                           throw 'Data Loading Error' 
                        });
          }
      });
  }

  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

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
  onPremisesPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.nullFunc, '');
  }
  nullFunc() {

  }
  
  funcSelectRegisteredProduct(data) {
    
    this.isPermitproductsAddPopupVisible = true;
    this.permitProductsFrm.get('product_id').setValue(data.data.product_id);
    this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
   
  }
  onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
  
  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.documentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.documentUploadfrm.get('file').value);
    input.append('id', this.documentUploadfrm.get('id').value);
    input.append('node_ref', this.documentUploadfrm.get('node_ref').value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.documentUploadfrm.get('file').setValue(file);
    }
  }

 /*
  funcValidatePermitProductDetails(validation_title, nextStep) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code,validation_title,'wb_disposal_products')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
*/
  funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_disposal_applications')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  
  funcValidatePermitDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_disposal_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
         
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        
        this.spinner.hide();
      });
    

  }
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  }
  onLoadproductCategoryData(section_id) {
    var data = {
      table_name: 'par_product_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productCategoryData = data;
        });
  }

  onLoaddevicesTypeData(section_id) {
    //
    var data = {
      table_name: 'par_device_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
  funAddNewPermitProducts(){
    this.isnewproductAddWinVisible = true;
  }
 
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
   
    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, 'onSavePrecheckingqueryresponse')
      .subscribe(
        response => {
          this.app_resp = response.json();
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
            this.funcReloadQueriesDetails();
            
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalQueryResponseFrmVisible = true;
  
  }
 
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
      this.bloodEstablishmentGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.bloodEstablishmentGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;

  }  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
    this.isPermitproductsAddPopupVisible = true;

  }


  permitProductsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPermitsProductPreviewedit(data.data);
    }
    else if (action_btn.action == 'delete_record') {
      //this.funcDeletePermitsProducts(data.data);
    }
  }
  /*
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected Permit Product with ' + app_data.brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, 'wb_disposal_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {

                  this.onLoadPermitProductsData(this.application_code);
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
  */
}
