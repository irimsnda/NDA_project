import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-controldrugs-permitlicense',
  templateUrl: './shared-controldrugs-permitlicense.component.html',
  styleUrls: ['./shared-controldrugs-permitlicense.component.css']
})
export class SharedControldrugsPermitlicenseComponent implements OnInit {
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id:number;
  trader_id:number;
  mistrader_id:number;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData:any;
  isPreviewApplicationProcessing:boolean= false;
  deviceTypeData:any;
  modeOfTransportData:any;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  product_resp:any;confirmDataParam:any;
  applicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  sectionsData: any;
  zoneData: any;
  
  mis_url:string = AppSettings.mis_url;
  printiframeUrl:any;
  isPrintReportVisible:boolean;

  printReportTitle:string;
 

  application_details: any;
  status_id: number;
  sub_module_id: number;
  process_title: string;;
  section_id: number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  status_name: string;
  module_id: number = 12;

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
  siUnitsData:any;
  classificationData:any;
  quantity: number = 100;
  unit_price: number;
  isnewproductAddWinVisible:boolean= false;
  enabled_newproductadd:boolean= false;
  showProductAddOption: boolean = false;
  is_regulatedproducts:boolean = false;
  proforma_currency_id:number;
  isInitalQueryResponseFrmVisible:boolean = false;
  initqueryresponsefrm:FormGroup;
  applicationPreckingQueriesData:any;
  query_sectioncheck:string;
  onApplicationSubmissionFrm:FormGroup;
  importexport_permittype_id:number;
  importExportPermitTypesData:number;

  controlledDrugsTypesData:any;
  controlDrugsSubstanceData:any;
  controlledDrugsBaseSaltData:any;
  gramsBaseSiUnitData:any;
  drugsPackagingTypeData:any;

  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
          //form 
          let user = this.authService.getUserDetails();

         this.trader_id = user.trader_id;
         this.mistrader_id = user.mistrader_id;
          this.application_details = this.appService.getApplicationDetail();

          if (!this.application_details) {

           // this.router.navigate(['./../online-services/controlleddrugscertificate-dashboard']);
          //  return
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
            this.proforma_currency_id = this.application_details.proforma_currency_id;
            
            this.importexport_permittype_id = this.application_details.importexport_permittype_id;
            console.log(this.application_details.importexport_permittype_id);
      
          }
          if(this.sub_module_id == 60){

            this.applicationGeneraldetailsfrm = new FormGroup({
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              permit_reason_id: new FormControl('', Validators.compose([Validators.required])),
              port_id: new FormControl('', Validators.compose([Validators.required])), 
              mode_oftransport_id: new FormControl('', Validators.compose([Validators.required])),
              proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
              proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
              paying_currency_id: new FormControl('', Validators.compose([])),
              sender_receiver: new FormControl('', Validators.compose([Validators.required])),
              sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([])),
              premises_name: new FormControl('', Validators.compose([])),
              premise_id: new FormControl('', Validators.compose([])),
              module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
              application_code: new FormControl(this.application_code, Validators.compose([])),
              otherpermit_reason: new FormControl('', Validators.compose([])),
              approximate_dateof_arrival: new FormControl('', Validators.compose([])),
              reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
              has_registered_outlets: new FormControl('', Validators.compose([Validators.required])),
              eligible_importerscategory_id: new FormControl('', Validators.compose([])),
              eligible_importersdoctype_id: new FormControl('', Validators.compose([]))
              
            });
            
          }
          else if(this.sub_module_id == 71){
                this.applicationGeneraldetailsfrm = new FormGroup({
                  sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
                  ordered_by: new FormControl('', Validators.compose([Validators.required])),
                  qualification_license_no: new FormControl('', Validators.compose([Validators.required])),
                  qualifications: new FormControl('', Validators.compose([Validators.required])),
                   sender_receiver: new FormControl('', Validators.compose([Validators.required])),
                  sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
                  zone_id: new FormControl('', Validators.compose([])),
                  module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
                  application_code: new FormControl(this.application_code, Validators.compose([]))
                });

          }
          else{
            this.applicationGeneraldetailsfrm = new FormGroup({
              importexport_permittype_id: new FormControl(),
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              permit_reason_id: new FormControl('', Validators.compose([Validators.required])),
              port_id: new FormControl('', Validators.compose([Validators.required])), 
              mode_oftransport_id: new FormControl('', Validators.compose([Validators.required])),
              proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
              proforma_invoice_date: new FormControl('', Validators.compose([])),
              paying_currency_id: new FormControl('', Validators.compose([])),
              consignee_options_id: new FormControl('', Validators.compose([])),
              consignee_id: new FormControl('', Validators.compose([])),
              consignee_name: new FormControl('', Validators.compose([])),
              sender_receiver: new FormControl('', Validators.compose([Validators.required])),
              sender_receiver_id: new FormControl('', Validators.compose([Validators.required])),
              premises_name: new FormControl('', Validators.compose([])),
              premise_id: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([])),
              module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
              application_code: new FormControl(this.application_code, Validators.compose([])),
              proforma_currency_id: new FormControl('', Validators.compose([Validators.required])),
              otherpermit_reason: new FormControl('', Validators.compose([])),
              controlled_drugslicense_no: new FormControl('', Validators.compose([])),
              license_application_code: new FormControl('', Validators.compose([])),
              approximate_dateof_arrival: new FormControl('', Validators.compose([])),
              has_apppliedctrdrugs_license: new FormControl('', Validators.compose([])),
              reason_fornonregister_outlet: new FormControl('', Validators.compose([])),
              has_registered_outlets: new FormControl('', Validators.compose([])),
              eligible_importerscategory_id: new FormControl('', Validators.compose([])),
              eligible_importersdoctype_id: new FormControl('', Validators.compose([]))
            });
           
          }
         
          this.onApplicationSubmissionFrm = new FormGroup({
            paying_currency_id: new FormControl('', Validators.compose([])),
            submission_comments:new FormControl('', Validators.compose([]))
          });
          if(this.sub_module_id == 71 ){
            this.permitProductsFrm = this.fb.group({
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              unit_price: new FormControl('', Validators.compose([])),
              currency_id: new FormControl('', Validators.compose([])),
              quantity: new FormControl('', Validators.compose([Validators.required])),
              is_registered_product: new FormControl('', Validators.compose([])),
              id: new FormControl('', Validators.compose([])),
              product_id: new FormControl('', Validators.compose([])),
              dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
              product_strength: new FormControl('', Validators.compose([Validators.required])),
              product_registration_no: new FormControl('', Validators.compose([])),
              purpose_of_drugsuse: new FormControl('', Validators.compose([])),
              controlleddrugs_type_id: new FormControl('', Validators.compose([])),
              controlled_drugssubstances_id: new FormControl('', Validators.compose([])),
              controlleddrugs_basesalt_id: new FormControl('', Validators.compose([])),
              gramsbasesiunit_id: new FormControl('', Validators.compose([])),
              drugs_content: new FormControl('', Validators.compose([])),
              strength_asgrams: new FormControl('', Validators.compose([])),
              controlleddrug_base: new FormControl('', Validators.compose([])),
              pack_unit: new FormControl('', Validators.compose([])),
              unitpack_unit_id: new FormControl('', Validators.compose([])),
              drugspackaging_type_id: new FormControl('', Validators.compose([])),
              conversion_unit: new FormControl('', Validators.compose([])),
              
            });
          }
          else{

            this.permitProductsFrm = this.fb.group({
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              unit_price: new FormControl('', Validators.compose([])),
              currency_id: new FormControl('', Validators.compose([])),
              quantity: new FormControl('', Validators.compose([Validators.required])),
              is_registered_product: new FormControl('', Validators.compose([Validators.required])),
              id: new FormControl('', Validators.compose([])),
              product_id: new FormControl('', Validators.compose([])),
              dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
              product_strength: new FormControl('', Validators.compose([Validators.required])),
              product_registration_no: new FormControl('', Validators.compose([])),
              purpose_of_drugsuse: new FormControl('', Validators.compose([Validators.required])),
              controlleddrugs_type_id: new FormControl('', Validators.compose([Validators.required])),
              controlled_drugssubstances_id: new FormControl('', Validators.compose([Validators.required])),
              controlleddrugs_basesalt_id: new FormControl('', Validators.compose([])),
              gramsbasesiunit_id: new FormControl('', Validators.compose([Validators.required])),
              drugs_content: new FormControl('', Validators.compose([Validators.required])),
              strength_asgrams: new FormControl('', Validators.compose([Validators.required])),
              controlleddrug_base: new FormControl('', Validators.compose([Validators.required])),
              pack_unit: new FormControl('', Validators.compose([Validators.required])),
              unitpack_unit_id: new FormControl('', Validators.compose([Validators.required])),
              
              drugspackaging_type_id: new FormControl('', Validators.compose([Validators.required])),
              conversion_unit: new FormControl('', Validators.compose([])),
              
            });
            

          }
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
          
          this.funcOnloadApplicationParams();

          
          if (this.status_id < 1) {
            this.status_name = "New"
          }
          
          this.onLoadGuidelines(this.sub_module_id, this.section_id);

          if (this.application_details) {
            this.applicationGeneraldetailsfrm.patchValue(this.application_details);
          }
      
          this.onLoadPermitProductsData(this.application_code);
          
         
          if(this.sub_module_id == 61){
               
          }  
  }
  ngOnInit() {

  } 
  submissionsTermscheckbox(e) {
    this.termscheckbox = e.value;
  }
  onLoadcontrolledDrugsTypesData() {
    var data = {
      table_name: 'par_controlleddrugs_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledDrugsTypesData = data;
        });
  }
  onLoadcontrolledDrugsBaseSaltData() {
    var data = {
      table_name: 'par_controlleddrugs_basesalts',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledDrugsBaseSaltData = data;
        });
  }
  onLoadgramsBaseSiUnitData() {
    var data = {
      table_name: 'par_gramsbasesiunits_configs',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gramsBaseSiUnitData = data;
        });
  }
  onLoaddrugsPackagingTypeData() {
    var data = {
      table_name: 'par_drugspackaging_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.drugsPackagingTypeData = data;
        });
  }
  onLoadimportexport_permittypes(sub_module_id) {
    this.spinner.show();
    var data = {
      table_name: 'par_importexport_permittypes',
      sub_module_id:sub_module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.importExportPermitTypesData = data;
          this.spinner.hide();
        });
  }
  
  onSaveControlledDrugsImptPermitApplication() {
    const controls = this.applicationGeneraldetailsfrm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
              this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
                return;
            }
        }
    if (this.applicationGeneraldetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'importexportapp/saveControlledDrugsImptPermitApplication')
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
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  } onLoadpermitReasonData() {
    var data = {
      table_name: 'par_permit_reasons'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitReasonData = data;
        });

  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_importexport_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  onLoadPermitProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
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
  funcOnloadApplicationParams(){
          this.onLoadCurrenciesData();
          this.onLoadpayingCurrencyData();
          this.onLoadportOfEntryExitData();
          this.onLoadmodeOfTransportData();

          this.onLoadapplicationCategoryData(this.section_id);
          this.onloadApplicationTypes();
          this.onLoadPackagingUnitsData(this.section_id)
          this.onLoadsiUnitsData(this.section_id);

          this.funcReloadQueriesDetails();

          this.onLoadgramsBaseSiUnitData();
          this.onLoadpermitReasonData() ;
          this.onLoadimportexport_permittypes(this.sub_module_id) ;
          this.onLoadcontrolledDrugsBaseSaltData();
          this.onLoaddrugsPackagingTypeData() ;
          this.onLoadconfirmDataParm();
          this.onLoadcontrolledDrugsTypesData();
  }  onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
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

  } onLoadapplicationCategoryData(section_id) {
    var data = {
      table_name: 'par_permit_category'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationCategoryData = data;
        });

  }onLoadportOfEntryExitData() {
    var data = {
      table_name: 'par_ports_information'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.portOfEntryExitData = data;
        });

  }
  onLoadmodeOfTransportData() {
    var data = {
      table_name: 'par_modesof_transport'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.modeOfTransportData = data;
        });

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

  onLoadPackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });

  }
  onLoadsiUnitsData(section_id) {
    var data = {
      table_name: 'par_si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
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
    if( this.sub_module_id ==60){

      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    else if(this.sub_module_id == 61){

      this.app_route = ['./online-services/controlleddrugsimplicense-dashboard'];

    }else{
      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
   
    this.router.navigate(this.app_route);
  }
  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    
    if( this.sub_module_id ==60){

      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    else if(this.sub_module_id == 61){

      this.app_route = ['./online-services/controlleddrugsimplicense-dashboard'];

    }else{
      this.app_route = ['./online-services/controlleddrugscertificate-dashboard'];

    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_importexport_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    
  }
  funcValidatePermitProductDetails(validation_title, nextStep) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code,validation_title,'wb_permits_products')
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
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_importexport_applications')
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
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_importexport_applications')
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

  } funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height/100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

printAppREquestforAdditionalInformation(){
  let report_url = this.mis_url+'reports/printRequestForAdditionalInformation?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&table_name=wb_importexport_applications";
  this.funcGenerateRrp(report_url,"print Query Letter");
  }  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

    
  }
}
