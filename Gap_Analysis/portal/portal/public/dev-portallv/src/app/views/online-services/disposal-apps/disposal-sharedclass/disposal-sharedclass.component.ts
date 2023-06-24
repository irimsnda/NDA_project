import {Pipe, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import { AppSettings } from 'src/app/app-settings';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
@Pipe({
  name: 'safeUrl'
})
@Component({
  selector: 'app-disposal-sharedclass',
  templateUrl: './disposal-sharedclass.component.html',
  styleUrls: ['./disposal-sharedclass.component.css']
})
export class DisposalSharedclassComponent implements OnInit {
  @ViewChild(DxDataGridComponent)

  dataGrid: DxDataGridComponent;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp:any;confirmDataParam:any;
  dispapplicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;

  mis_url:string = AppSettings.mis_url;
  printiframeUrl:any;
  isPrintReportVisible:boolean;

  printReportTitle:string;
  
  onApplicationSubmissionFrm:FormGroup;
  sectionsData: any;
  typesOfDisposalData:any;
  reasonsOfDisposalData:any;
  zoneData: any;
  disposalSiteoptionData: any;
  filesToUpload:any;
  isonunfitProductsUploadVisable:boolean;
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
  disposal_siteoption:boolean= false;
  unfitProductsUploadFrm:FormGroup;
  destructionMethodsData:any;
  report_excelurl:any;
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
  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public  sanitizer:DomSanitizer) {
          //form 
          this.report_excelurl = this.sanitize(this.mis_url+'reports/onDownloadunfitProductstemplate');
          
          this.application_details = this.appService.getApplicationDetail();

          if (!this.application_details) {
            this.router.navigate(['./../online-services/disposal-applicationsdashboard']);
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
          this.unfitProductsUploadFrm = this.formBuilder.group({
            file: null,
            description:null,
            application_code:null
          });
          this.dispapplicationGeneraldetailsfrm = new FormGroup({
            proposedmethod_of_disposal_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
            reason_of_destruction_id: new FormControl(this.section_id, Validators.compose([])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            reason_for_disposal: new FormControl('', Validators.compose([])),
            total_weight: new FormControl('', Validators.compose([Validators.required])),
            weights_units_id: new FormControl('', Validators.compose([Validators.required])),
            quantity: new FormControl('', Validators.compose([])),
            otherproposedmethod_of_disposal: new FormControl('', Validators.compose([])),
            product_particulars_description: new FormControl('', Validators.compose([Validators.required])),
            market_value: new FormControl('', Validators.compose([Validators.required])),
            currency_id: new FormControl('', Validators.compose([Validators.required])),
            
            section_id: new FormControl('', Validators.compose([Validators.required])),
            zone_id: new FormControl('', Validators.compose([])),
            module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
            application_code: new FormControl(this.application_code, Validators.compose([])),
            destructionsite_location: new FormControl('', Validators.compose([])),
            proposed_destructionsite: new FormControl('', Validators.compose([])),
            disposal_siteoption_id: new FormControl('', Validators.compose([])),
            proposed_destructiondate: new FormControl('', Validators.compose([])),
            superintendent_incharge: new FormControl('', Validators.compose([])),
            superintendent_registration_number: new FormControl('', Validators.compose([])),
            registration_body: new FormControl('', Validators.compose([])),
            premise_id: new FormControl('', Validators.compose([])),
            premises_name: new FormControl('', Validators.compose([])),
            
          });
          
          this.permitReceiverSenderFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            country_id: new FormControl('', Validators.compose([Validators.required])),
            region_id: new FormControl('', Validators.compose([Validators.required])),
            district_id: new FormControl('', Validators.compose([])),
            email_address: new FormControl('', Validators.compose([Validators.required])),
            postal_address: new FormControl('', Validators.compose([Validators.required])),
            telephone_no: new FormControl('', Validators.compose([])),
            mobile_no: new FormControl('', Validators.compose([])),
            physical_address: new FormControl('', Validators.compose([Validators.required])),
            tin_no: new FormControl('', Validators.compose([]))
          });
      
          this.documentUploadfrm = this.fb.group({
            file: null,
            document_requirement_id: [null, Validators.required],
            node_ref: null,
            id: null,
            description: [null]
          });
      
          this.permitProductsFrm = this.fb.group({
            brand_name: new FormControl('', Validators.compose([Validators.required])),
            product_description: new FormControl('', Validators.compose([])),
            quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
            currency_name: new FormControl('', Validators.compose([])),
            estimated_value: new FormControl('', Validators.compose([])),
            packaging_unit_id: new FormControl('', Validators.compose([])),
            common_name: new FormControl('', Validators.compose([])),
            product_strength: new FormControl('', Validators.compose([])),
            dosage_form: new FormControl('', Validators.compose([])),
            pack_size: new FormControl('', Validators.compose([])),
            batch_no: new FormControl('', Validators.compose([])),
            reason_for_disposal: new FormControl('', Validators.compose([])),
            product_id: new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([]))
          });
      
          this.productGeneraldetailsfrm = new FormGroup({
            section_id: new FormControl('', Validators.compose([])),
            common_name_id: new FormControl('', Validators.compose([Validators.required])),
            classification_id: new FormControl('', Validators.compose([Validators.required])),
            brand_name: new FormControl('', Validators.compose([Validators.required])),
            physical_description: new FormControl('', Validators.compose([Validators.required])),
            product_category_id: new FormControl('', Validators.compose([Validators.required]))
          });
      
          this.initqueryresponsefrm = new FormGroup({
            queries_remarks: new FormControl('', Validators.compose([Validators.required])),
            response_txt: new FormControl('', Validators.compose([Validators.required])),
            id: new FormControl('', Validators.compose([])),
            query_id: new FormControl('', Validators.compose([]))
          });
          
          this.onApplicationSubmissionFrm = new FormGroup({
            paying_currency_id: new FormControl('', Validators.compose([])),
            submission_comments:new FormControl('', Validators.compose([]))
          });
          if(this.sub_module_id == 13 || this.sub_module_id == 14 || this.sub_module_id == 15){
            this.enabled_newproductadd = true;
          }
          else{
            this.enabled_newproductadd = false;
          }
          
          if (this.status_id < 1) {
            this.status_name = "New"
          }
         
          this.onLoadGuidelines(this.sub_module_id, this.section_id);
        if(this.application_details.application_code){
          this.dispapplicationGeneraldetailsfrm.patchValue(this.application_details);
          
        }
        
          this.onLoadPermitProductsData(this.application_code);
         
          if (this.section_id == 4) {
            this.device_type_visible = true;
          }
          
          this.import_typecategory_visible = true;
        
          this.onAutoLoadParameters();
          this.funcReloadQueriesDetails();
        

  } ngOnInit() {
    
    
  }sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  onAutoLoadParameters(){
    this.onLoadCurrenciesData();

    this.onLoadWeightsData()
    this.onLoadconsigneeOptionsData();
    this.onLoadpayingCurrencyData();
    this.onloadApplicationTypes();

    this.onLoaddisposalSiteoptionData()
    this.onLoadZones();
    this.onLoadSections();
    this.onLoaddestructionMethodsData();
    this.onLoadreasonsOfDisposalData();
    this.onLoadconfirmDataParm();

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }  onDestructionSiteOptionSelect($event){
    if($event.selectedItem.id ==1){

      this.disposal_siteoption = false;
    }
    else{

      this.disposal_siteoption = true;

    }
}
  onRegisteredProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add New Products (Search existing Products before Adding)',
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
  
 
  onLoadClassifications() {
    var data = {
      table_name: 'par_classifications'
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
    this.app_route = ['./online-services/disposal-applicationsdashboard'];

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
  onLoaddestructionMethodsData() {
    var data = {
      table_name: 'par_destruction_methods',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.destructionMethodsData = data;
        });
  }
  
  onLoadreasonsOfDisposalData() {
    var data = {
      table_name: 'par_destruction_reasons',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonsOfDisposalData = data;
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
  
  onLoaddisposalSiteoptionData() {
    var data = {
      table_name: 'par_disposal_siteoptions'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.disposalSiteoptionData = data;
        });

  }
  onLoadapplicationCategoryData(section_id) {
    var data = {
      table_name: 'par_permit_category',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationCategoryData = data;
        });

  }
  //
  onLoadapplicationTypeCategoryData() {
    var data = {
      table_name: 'par_permit_typecategories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeCategoryData = data;
        });

  }
  //par_import_typecategories
  onLoadpermitReasonData() {
    var data = {
      table_name: 'par_permit_reasons'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitReasonData = data;
        });

  }
  onLoadportOfEntryExitData() {
    var data = {
      table_name: 'par_ports_information'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.portOfEntryExitData = data;
        });

  }
  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }
  }
  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }
  onLoadCurrenciesData() {
    var data = {
      table_name: 'par_currencies'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.currencyData = data;
        });

  }

  onLoadWeightsData() {
    var data = {
      table_name: 'par_weights_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.weightsUnitData = data;
        });

  }
  onLoadPackagingUnitsData() {
    var data = {
      table_name: 'par_packaging_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });

  }
  onLoadconsigneeOptionsData() {
    var data = {
      table_name: 'par_consignee_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.consigneeOptionsData = data;
        });

  }

  onSaveDisposalApplication() {
    const invalid = [];
    const controls = this.dispapplicationGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.dispapplicationGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.dispapplicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveDisposalApplication')
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
            this.wizard.model.navigationMode.goToStep(2);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }

  onsaveDisposalPermitProductdetails() {
      
    const invalid = [];
    const controls = this.permitProductsFrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id','')+' and save application', 'Alert');
            return;
        }
    }
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
            this.onLoadPermitProductsData(this.application_code);
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
        text: 'Add Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPermitProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Products(Template based)',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funUploadPermitProducts.bind(this)

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
   
   
    this.isPermitproductsAddPopupVisible = true;
    
  }
  funUploadPermitProducts() {
   
   
    this.isonunfitProductsUploadVisable = true;
    
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

            this.onLoadPermitProductsData(this.application_code);
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
  onDisposalApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/disposal-applicationsdashboard'];

    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_disposal_applications', this.app_route,this.onApplicationSubmissionFrm.value)
  }
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
  functDataGridToolbar(e, funcBtn, btn_title, is_hidden=false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled: is_hidden,
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
    this.functDataGridToolbar(e, this.nullFunc, '', true);
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
  onLoadproductCategoryData() {
    var data = {
      table_name: 'par_product_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productCategoryData = data;
        });
  }

  onLoaddevicesTypeData() {
    //
    var data = {
      table_name: 'par_device_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
  funAddNewPermitProducts(){
    this.isPermitproductsAddPopupVisible = true;
  }
  onCloseQueryMode(){

    this.isInitalQueryResponseFrmVisible = false;
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
  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });

  }
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
      this.dispapplicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.dispapplicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
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
      this.funcDeletePermitsProducts(data.data);
    }
  }
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
  onDownloadunfitProductstemplate(){
      
    let report_url = this.mis_url+'reports/onDownloadunfitProductstemplate';

    this.funcGenerateRrp(report_url,"DOWNLOAD FORM FOR UNFIT PHARMACEUTICAL PRODUCTS");
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}

public prepareUploadSave(): any {
  let input = new FormData();
  const files: Array<File> = this.filesToUpload;
 // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
  for(let i =0; i < files.length; i++){
      input.append("file", files[i], files[i]['name']);
  }
  input.append('description', this.unfitProductsUploadFrm.get('description').value);
 
  return input;
}

onunfitProductsUpload() {

  const uploadData = this.prepareUploadSave();
  this.spinner.show();
  this.dmsService.uploadApplicationDMSDocument(uploadData,  this.module_id, this.sub_module_id, '',this.application_code, '','onunfitProductsUpload')
    //.pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response.json();

        if (response_data.success) {
          
          this.isonunfitProductsUploadVisable = false;
          this.onLoadPermitProductsData(this.application_code);

          this.toastr.success(response_data.message, 'Response');

        }
        else {
          this.toastr.error(response_data.message, 'Response');

        }

      },
      error => {
        this.spinner.hide();
        this.toastr.success('Error occurred', 'Response');

      });
} 

}
