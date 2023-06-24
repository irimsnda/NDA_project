import { Component, OnInit, ViewContainerRef, ViewChild,Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';

import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from "devextreme/data/array_store";
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';

@Component({
  selector: '',
  templateUrl: './shared-productregistrationclass.component.html',
  styleUrls: ['./shared-productregistrationclass.component.css']
})
export class SharedProductregistrationclassComponent implements OnInit {

  @ViewChild(ArchwizardModule)
  @ViewChild("divQueryDiv", {read: ElementRef}) private divQueryDiv: ElementRef;

  params_where:any;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  simpleProducts: string[];
    editableProducts: string[];
    manufacturingRoleDataSource: any;
    appuploaded_document_id:number;
  is_readonly:boolean= false;
  check_sharedclassloaded:boolean = false;
  isDocumentPreviewDownloadwin:boolean=false;
   document_previewurl:any;
  productTypeData: any;
  initWizardPanel: number = 0;
  query_title:any;
  sectionsData: any;
  commonNamesData: any;
  ATCCodesData:any;
  classificationData: any;
  riskCategoriesData:any;
  zonesData: any;  config_data: any;
  productData: any;
  assessmentProcedureData: any;
  registrantOptionsData: any;
  siUnitsData: any;
  packagingUnitsData: any;
  reasonForInclusionData: any;
  distributionCategoryData: any;
  storageConditionData: any;
  isReadOnlyTraderasLtr:boolean= false;
  readOnlyOrigin:boolean;
  productCategoryData: any;
  has_otherregistration_selection: boolean;
  routeOfAdministrationData: any;
  targetSpeciesData: any;
  vetmedicinesRegistrationtypeData:any;
  durationDescData: any;
  productSubCategoryData: any;
  productSpecialCategoryData: any;
  intendedEndUserData: any;

  ingredientTypeData: any;
  nutrientsCategoryData: any;
  nutientsData: any;

  dosageFormsData: any;
  productFormData: any;
  methodOfUseData: any;
  tabaccoFlavourData: any;
  productAppliedData: any;
  pestCideData: any;
  whoHazardClassData:any;
  formulationData: any;
  table_name: string;
  atcData: any;
  ingredientsData: any;
  specificationData: any;
  filterDatatable: any;
  model: any = {};
  isCompleted: boolean = false;
  isRegistrantDetailsWinshow: boolean = false;
  section_id: number;
  common_name_id: number;
  productapp_details: any;

  productsNutrientsData: any;
  //details forms definationn
  productGeneraldetailsfrm: FormGroup;
  renAltproductGeneraldetailsfrm: FormGroup;

  applicationApplicantdetailsfrm: FormGroup;
  productIngredientsdetailsfrm: FormGroup;
  productPackagingdetailsfrm: FormGroup;
  manufacturingSiteFrm: FormGroup;
  manufacturerFrm:FormGroup;
  productmanufacturingSiteFrm: FormGroup;
  prodgmpAddinspectionFrm:FormGroup;
  productapimanufacturingSiteFrm: FormGroup;
  productNutrientsdetailsfrm: FormGroup;
  addproductGenericNamesFrm:FormGroup;

  isApplicationSubmitwin:boolean = false;
  withdrawalproductGeneraldetailsfrm: FormGroup;
  //
  trader_id: number;
  trader_name: string;
  strict: any;
  loading: boolean;
  loadingIndicator: any;
  reorderable: any;
  response: string;
  reference_no: string;
  tracking_no: string;
  group_tracking_no:string;
  group_application_code:number;
  group_application_id:number;
  product_id: number;
  product_resp: any;
  productMdl: any = {};
  prodformData: any;

  intendedUseData: any;
  devicesTypeData: any;
  confirmDataParam: any;
  confirmDataParamAll:any;
  containerData: any;
  containerMaterialData: any;
  terms_conditions: any;
  addproductGenericNamesModal:boolean = false;
  
  module_id: number;
  sub_module_id: number;
  country_id: number;
  registrant_option_id: number;
  trader_aslocalagent: number;
  registrant_optionDisabled: boolean = false;
  localagent_optionDisabled: boolean = false;
  region_id: number;
  //data trows
  productManufacturersData: any;
  apiManufacturersData: any;
  productgmpInspectionData: any;
  tradergmpInspectionData: any = {};
  traderAccountsDetailsData: any;

  manufacturersSiteData: any;
  manufacturersData:any = {};
  manufacturingRoleData: any;

  drugsingredientsData: any;
  drugsPackagingData: any;

  process_title: string;
  //header definations
  status_name: string = 'New';
  status_id: number = 1;
  manufacturer_type_id: number;
  countries: any;
  countriesData:any;
  regions: any;
  districts: any;
  app_route: any;
  trader_title: string;
  is_local_agent: number;

  checkProductsSubmission: boolean = false;
  sealTypeData: any;
  containerTypeData: any;
  closureMaterialData: any;
  application_code: number;

  isRegisteredProductsWinshow: boolean = false;
  registeredProductsData: any;


  tra_product_id: number;
  local_agent_id: number;
  reg_product_id: number;
  is_local: number;

  //modals checks 
  isproductManufacturerModalShow: boolean = false;
  isnewmanufacturerModalShow:boolean=false;
  isnewmanufactureringSiteDetailsModalShow: boolean = false;
  isproductmanSiteDetailsModalShow: boolean = false;
  isgmpinspectionModalShow:boolean = false;
  isgmpAddinspectionModalShow:boolean = false;
  gmpProductLineData:any;
  isproductManufactureringSiteModalShow:boolean=false;
  isRegisteredPremisesModalShow:boolean=false;
  isapimanSiteDetailsModalShow:boolean= false;
  manufacturer_id:number;
  registeredPremisesData:any ={};
  auto:any;
  isReadOnly:boolean = false;
  tbisReadOnly:boolean = false;
  applicationInitialQueriesData:any;
  applicationPreckingQueriesData:any;
  initqueryresponsefrm:FormGroup;
  
  isInitalQueryDataWinVisible:boolean = false;
  businessTypesData: any;
  isInitalQueryFrmVisible:boolean = false;

  isInitalQueryResponseFrmVisible:boolean = false;

  //sections 
  query_sectioncheck:string;
  action_url:string;
  payingCurrencyData:any;
  fastTrackOptionsData:any;

  product_origin_id:number;
  //atc_code_id:number;
  productIngredientsModal:boolean;
  gmdnCategoryData:any;
  query_id:number;
  prodclass_category_id:number;
  query_ref_id:number;
  gmdnCodeData:any;

  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  
  addRegionDetailsWin: boolean;
  addRegionDetailsFrm:FormGroup;

  addDistrictsDetailsWin: boolean = false;
  addDistrictsDetailsFrm:FormGroup;
  paying_currency_id:string;
  onApplicationSubmissionFrm:FormGroup;
  form_fielddata:any;
  has_beeninspected:boolean=false;
   sampleDetailsFrm: FormGroup;
   activePharmaceuticalDetailsFrm: FormGroup;
  isSampleDetailsWinshow:boolean;
  isActivePharmaceuticalWinshow:boolean;
  sampleSubmissionData:any;
  ActivePharmaceuticalData:any;
  appsubmissions_type_id:any;
  productAppSubmissionDetailsfrm:FormGroup;
  groupedProductApplicationData:any;
  assessmentprocedure_type_id:number;
  hasAssessmentProcedure:boolean;
  assessmentTypesData:any;
  isInitiateAddProductGroupAppWin:boolean;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public modalDialogue: ModalDialogService, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ProductApplicationService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public utilityService: Utilities,public httpClient: HttpClient, public dmsService:DocumentManagementService) {

   // if(!this.check_sharedclassloaded){


          this.productAppSubmissionDetailsfrm = new FormGroup({
            section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
            sub_module_id: new FormControl(7, Validators.compose([])),
            regulated_producttype_id: new FormControl('', Validators.compose([])),
            appsubmissions_type_id: new FormControl('', Validators.compose([Validators.required])),
            prodclass_category_id: new FormControl('', Validators.compose([Validators.required])),
            product_origin_id: new FormControl('', Validators.compose([Validators.required])),
            group_application_code: new FormControl('', Validators.compose([])),
            group_tracking_no: new FormControl('', Validators.compose([])),
            group_application_id:new FormControl('', Validators.compose([])),
            local_agent_name: new FormControl('', Validators.compose([])),
            reason_for_groupedsubmission: new FormControl('', Validators.compose([])),
            trader_aslocal_agent: new FormControl('', Validators.compose([])),
            local_agent_id: new FormControl('', Validators.compose([]))

          });
          
          this.productGeneraldetailsfrm = new FormGroup({
            section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            module_id: new FormControl(this.module_id, Validators.compose([])),
            group_application_code: new FormControl(this.module_id, Validators.compose([]))
          });
          this.applicationApplicantdetailsfrm = new FormGroup({
            local_agent_id: new FormControl('', Validators.compose([Validators.required])),
            local_agent_name: new FormControl('', Validators.compose([Validators.required])),

            applicant_name: new FormControl('', Validators.compose([Validators.required])),

            applicant_id: new FormControl('', Validators.compose([Validators.required])),

          });
          this.applicationApplicantdetailsfrm.patchValue({ applicant_name: this.trader_name, applicant_id: this.trader_id });
          let me = this;

          //get the user details 
          let user_details = this.authService.getUserDetails();
          this.country_id = user_details.country_id;
          this.trader_id = user_details.trader_id;
          this.trader_name = user_details.company_name;
          this.is_local = user_details.is_local;

          if (this.country_id == 36) {
            this.trader_aslocalagent = 1;
          }
          this.productapp_details = this.appService.getProductApplicationDetail();

          if (!this.productapp_details) {
           // this.router.navigate(['./../online-services/productreg-dashboard']);
           // return;
          }
          else {
            this.section_id = this.productapp_details.section_id;
            this.sub_module_id = this.productapp_details.sub_module_id;

            this.module_id = this.productapp_details.module_id;
            this.process_title = this.productapp_details.process_title;
            this.product_id = this.productapp_details.product_id;
            this.tracking_no = this.productapp_details.tracking_no;
            //group applications 
            this.group_tracking_no = this.productapp_details.group_tracking_no;
            this.group_application_id = this.productapp_details.group_application_id;
            this.group_application_code = this.productapp_details.group_application_code;

            this.status_name = this.productapp_details.status_name;
            this.status_id = this.productapp_details.status_id;

            this.product_id = this.productapp_details.product_id;
            this.application_code = this.productapp_details.application_code;
            
            this.query_ref_id = this.productapp_details.query_ref_id;
            this.prodclass_category_id = this.productapp_details.prodclass_category_id;
            this.form_fielddata = this.productapp_details.form_fields;
 
            for (let form_field of this.form_fielddata) {
              let field_name = form_field['field_name'];
              if(form_field['is_mandatory'] ==1){
                me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', Validators.required));

              }else{
                me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', []));

              }
              
            }
          }
          this.sampleDetailsFrm = new FormGroup({
            batch_no: new FormControl('', Validators.compose([Validators.required])),
           
             manufacturing_date: new FormControl('', Validators.compose([Validators.required])),
            
            expiry_date: new FormControl('', Validators.compose([])),
            storage_condition: new FormControl('', Validators.compose([])),
            pack_size: new FormControl('', Validators.compose([])),
            pack_unit_id: new FormControl('', Validators.compose([])),
            mode_of_delivery: new FormControl('', Validators.compose([])),
            sample_tracking_no: new FormControl('', Validators.compose([])),
            quantity: new FormControl('', Validators.compose([])),
            quantity_unit_id: new FormControl('', Validators.compose([])),
           
            id: new FormControl('', Validators.compose([]))
      
        });
            this.activePharmaceuticalDetailsFrm = new FormGroup({           
            prod_name: new FormControl('', Validators.compose([Validators.required])),
            strength: new FormControl('', Validators.compose([])),
            dosage_form_id: new FormControl('', Validators.compose([])),
            mah_no: new FormControl('', Validators.compose([])),
            manufacturer_id:new FormControl('', Validators.compose([])),
            indication: new FormControl('', Validators.compose([])),
           active_ingredient_id:new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([]))
      
        });
          if(this.sub_module_id == 7){
            this.is_readonly = false;
            this.isReadOnly = false;
          }
          else{
            this.is_readonly = false;
            this.isReadOnly = false;
          }
          if (this.status_id == 6 || this.status_id == 17 || this.status_id == 7) {
            this.initWizardPanel = 1;
          }
        //  this.onLoadGeneralProductsFormfields();
          
          this.onApplicationSubmissionFrm = new FormGroup({
            paying_currency_id: new FormControl('', Validators.compose([])),
            is_fast_track: new FormControl('', Validators.compose([])),
            submission_comments:new FormControl('', Validators.compose([]))
          });

          this.addRegionDetailsFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            country_id: new FormControl('', Validators.compose([Validators.required])),
            tablename: new FormControl('', Validators.compose([Validators.required]))

          });
          this.addDistrictsDetailsFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            region_id: new FormControl('', Validators.compose([Validators.required])),
            tablename: new FormControl('', Validators.compose([Validators.required]))

          });
          this.productapimanufacturingSiteFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            physical_address: new FormControl('', Validators.compose([])),
            manufacturer_id: new FormControl('', Validators.compose([Validators.required])),

            active_ingredient_id: new FormControl('', Validators.compose([Validators.required])),

          });
          this.productmanufacturingSiteFrm = new FormGroup({
              manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
              manufacturing_site_name: new FormControl('', Validators.compose([])),
              physical_address: new FormControl('', Validators.compose([])),
              manufacturer_id: new FormControl('', Validators.compose([Validators.required])),
              manufacturer_role_id: new FormControl('', Validators.compose([])),
              manufacturing_activities: new FormControl('', Validators.compose([])),

              man_site_id: new FormControl('', Validators.compose([]))
              
          });

         
          if(this.sub_module_id == 17){
          this.productGeneraldetailsfrm.addControl('withdrawal_type_id',new FormControl('', Validators.required));
          }

          if(this.sub_module_id === 7 || this.sub_module_id === 8  || this.sub_module_id === 9){
          this.onApplicationSubmissionFrm.addControl('paying_currency_id',new FormControl('', Validators.required));
          this.onApplicationSubmissionFrm.addControl('is_fast_track',new FormControl('', Validators.required));
          }
          if(this.status_id == 8){
          this.query_title = "EVALUATION QUERY DOCUMENTS UPLOADS";
          }
          else{
          this.query_title = "QUERY DOCUMENTS UPLOADS";
          }
          //product ingreidnets 

          if(this.prodclass_category_id == 5 || this.prodclass_category_id == 9 || 
            this.prodclass_category_id == 13 
            || this.prodclass_category_id == 14){
            this.productIngredientsdetailsfrm = new FormGroup({
              ingredient_type_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
              proportion: new FormControl(this.sub_module_id, Validators.compose([])),
              inclusion_reason_id: new FormControl('', Validators.compose([])),
              //atc_code: new FormControl('', Validators.compose([])),
              //atc_code_description: new FormControl('', Validators.compose([])),
              purpose_of_use: new FormControl('', Validators.compose([])),
              inci_name: new FormControl('', Validators.compose([])),
              cas_number: new FormControl('', Validators.compose([])),
              ingredient_function: new FormControl('', Validators.compose([])),
              
              ingredient_id: new FormControl('', Validators.compose([Validators.required])),
              id: new FormControl('', Validators.compose([])),
            });
          }else if(this.prodclass_category_id == 2 ||
            this.prodclass_category_id == 10){
            this.productIngredientsdetailsfrm = new FormGroup({
              proportion: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              ingredientssi_unit_id: new FormControl('', Validators.compose([])),
              atc_code: new FormControl('', Validators.compose([])),
              atc_code_description: new FormControl('', Validators.compose([])),purpose_of_use: new FormControl('', Validators.compose([])),
              inci_name: new FormControl('', Validators.compose([])),
              cas_number: new FormControl('', Validators.compose([])),
              ingredient_function: new FormControl('', Validators.compose([])),
              ingredient_type_id: new FormControl(this.section_id, Validators.compose([])),
              inclusion_reason_id: new FormControl('', Validators.compose([Validators.required])),
              ingredient_id: new FormControl('', Validators.compose([Validators.required])),
              id: new FormControl('', Validators.compose([])),

          });

          }
          else{
            this.productIngredientsdetailsfrm = new FormGroup({
              specification_type_id: new FormControl(this.section_id, Validators.compose([])),
              strength: new FormControl(this.sub_module_id, Validators.compose([])),
              ingredientssi_unit_id: new FormControl('', Validators.compose([])),
              inclusion_reason_id: new FormControl('', Validators.compose([])),
              atc_code: new FormControl('', Validators.compose([])),purpose_of_use: new FormControl('', Validators.compose([])),
              cas_number: new FormControl('', Validators.compose([])),
              ingredient_function: new FormControl('', Validators.compose([])),
              
              ingredient_type_id: new FormControl(this.section_id, Validators.compose([])),
              inci_name: new FormControl('', Validators.compose([])),
              proportion: new FormControl(this.sub_module_id, Validators.compose([])),
              atc_code_description: new FormControl('', Validators.compose([])),
              ingredient_id: new FormControl('', Validators.compose([Validators.required])),
              id: new FormControl('', Validators.compose([])),
            });
          
          }
          if(this.prodclass_category_id == 5 || this.prodclass_category_id == 9 || 
            this.prodclass_category_id == 13 
            || this.prodclass_category_id == 14){
            this.productPackagingdetailsfrm = new FormGroup({
              container_id: new FormControl('', Validators.compose([Validators.required])),
              container_material_id: new FormControl('', Validators.compose([Validators.required])),
              retail_packaging_size: new FormControl('', Validators.compose([])),
              container_type_id: new FormControl('', Validators.compose([])),

              packaging_units_id: new FormControl('', Validators.compose([])),
              seal_type_id: new FormControl('', Validators.compose([])),
              closure_material_id: new FormControl('', Validators.compose([])),
              
              id: new FormControl('', Validators.compose([])),

          });
          }else{
            this.productPackagingdetailsfrm = new FormGroup({
              container_id: new FormControl('', Validators.compose([Validators.required])),
              container_material_id: new FormControl('', Validators.compose([Validators.required])),
              retail_packaging_size: new FormControl('', Validators.compose([])),
              retail_packaging_size1: new FormControl('', Validators.compose([])),
              retail_packaging_size2: new FormControl('', Validators.compose([])),
              retail_packaging_size3: new FormControl('', Validators.compose([])),
              retail_packaging_size4: new FormControl('', Validators.compose([])),
              retail_packaging_size5: new FormControl('', Validators.compose([])),
              unit_pack: new FormControl('', Validators.compose([])),
              id: new FormControl('', Validators.compose([])),
              packaging_units_id: new FormControl('', Validators.compose([])),
              seal_type_id: new FormControl('', Validators.compose([])),
              closure_material_id: new FormControl('', Validators.compose([])),

              container_type_id: new FormControl('', Validators.compose([Validators.required])),
            });

          }

          //definaation 
          
          this.productNutrientsdetailsfrm = new FormGroup({
            nutrients_category_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
            nutrients_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
            proportion: new FormControl('', Validators.compose([Validators.required])),
            units_id: new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([])),

          });

          this.addproductGenericNamesFrm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            therapeutic_code: new FormControl('', Validators.compose([])),
            description: new FormControl('', Validators.compose([])),
            section_id: new FormControl('', Validators.compose([Validators.required])),
            tablename: new FormControl('', Validators.compose([Validators.required]))

          });
          if (this.productapp_details) {
            if (this.productapp_details.product_id > 0) {
              //reload the other stores
              this.productGeneraldetailsfrm.patchValue(this.productapp_details);
              //lod the other details 
              //this.autoLoadProductsOtherDetails(this.productapp_details.product_id);
              this.product_origin_id =this.productapp_details.product_origin_id;
              if (this.is_local == 1) {
                this.isReadOnlyTraderasLtr = true;
              
              }
              else {
                this.isReadOnlyTraderasLtr = false;
                
              }
  
            }else{
  
                  if (this.is_local == 1) {
                    this.isReadOnlyTraderasLtr = true;
                    this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id,trader_aslocal_agent: 1 })
                    //deiable field
                  }
                  else {
                      this.isReadOnlyTraderasLtr = false;
                      this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 2 })
                  }
              
            }
  
          }
          
          this.onLoaddurationDescData();
          this.initqueryresponsefrm = new FormGroup({
            queries_remarks: new FormControl('', Validators.compose([Validators.required])),
            response_txt: new FormControl('', Validators.compose([Validators.required])),
            id: new FormControl('', Validators.compose([])),
            query_id: new FormControl('', Validators.compose([]))

          });
          this.funcReloadQueriesDetails();
          this.check_sharedclassloaded = true;
  //  }
   
  }
  ngOnInit() {

  }
 
  private async onLoadGeneralProductsFormfields1(){ 
    let me = this;
   
    
    var data_submit = {
      table_name: 'wb_formfields_definations',
      module_id: this.module_id,
      prodclass_category_id: this.prodclass_category_id,
      section_id: this.section_id
    };
    data_submit.table_name = btoa(data_submit.table_name);

    this.config_data = {
      params: data_submit,
      headers: { 'Accept': 'application/json' }
    };
    const data = await this.httpClient.get(AppSettings.base_url + 'configurations/getCommonMisParams', this.config_data).toPromise();
   let response_data = JSON.stringify(data)
    for (let form_field of response_data) {
      let field_name = form_field['field_name'];
      if(form_field['is_mandatory'] ==1){
        me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', Validators.required));

      }else{
        me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', []));

      }
      
    }
  }
  onLoadGeneralProductsFormfields() {
    let me = this;
   
    var data = {
      table_name: 'wb_formfields_definations',
      module_id: this.module_id,
      prodclass_category_id: this.prodclass_category_id,
      section_id: this.section_id
    };
    this.config.onLoadAsynchConfigurationData(data)
      .subscribe(
        data => {
          
          for (let form_field of data) {
            let field_name = form_field['field_name'];
            if(form_field['is_mandatory'] ==1){
              me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', Validators.required));

            }else{
              me.productGeneraldetailsfrm.addControl(field_name,new FormControl('', []));

            }
            
          }
        });

  }
  OnAddNewManufacturerReionDetails(){
    let country_id = this.manufacturerFrm.get('country_id').value;
    this.addRegionDetailsFrm.reset();
    if(country_id >0){
      this.addRegionDetailsFrm.get('country_id').setValue(country_id);
     
      this.addRegionDetailsWin = true;
    }
    else{
      this.toastr.error('Select Country before you add a new Region', 'Alert');
    }

  }
  
  OnAddNewManufactureDistrictDetails(){
    let region_id = this.manufacturerFrm.get('region_id').value;
    
    this.addDistrictsDetailsFrm.reset();
    if(region_id >0){
      this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
     
      this.addDistrictsDetailsWin = true;
    }
    else{
      this.toastr.error('Select Region before you add a new District', 'Alert');
    }

  }
  OnAddNewSiteDistrictDetails(){
    let region_id = this.manufacturingSiteFrm.get('region_id').value;
    
    this.addDistrictsDetailsFrm.reset();
    if(region_id>0){
      this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
     
      this.addDistrictsDetailsWin = true;
    }
    else{
      this.toastr.error('Select Region before you add a new District', 'Alert');
    }

  }
  OnAddNewSiteReionDetails(){
    let country_id = this.manufacturingSiteFrm.get('country_id').value;
    
    this.addRegionDetailsFrm.reset();
    if(country_id >0){
      this.addRegionDetailsFrm.get('country_id').setValue(country_id);
     
      this.addRegionDetailsWin = true;
    }
    else{
      this.toastr.error('Select Country before you add a new REgion', 'Alert');
    }

  }
funcgetInitialQueriesData(){
    
  this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_product_applications', 'application_status_id', 'utilities/getApplicationPreQueriesDetails')
  .subscribe(
    data => {
      this.applicationInitialQueriesData = data.data;
      this.spinner.hide();
    });

}
onSaveRegiondetails(){
  this.spinner.show();
  this.addRegionDetailsFrm.get('tablename').setValue('par_regions');
  this.utilityService.onsaveApplicationUniformDetails('', this.addRegionDetailsFrm.value, 'onSaveUniformConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadRegions(this.country_id);
       
        this.addRegionDetailsWin = false;
        this.toastr.success(this.product_resp.message, 'Response');

      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

} 
onSaveaddDistrictDetails(){
  this.spinner.show();
  this.addDistrictsDetailsFrm.get('tablename').setValue('par_districts');
  this.utilityService.onsaveApplicationUniformDetails('', this.addDistrictsDetailsFrm.value, 'onSaveUniformConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadDistricts(this.region_id);
       
        this.addDistrictsDetailsWin = false;
        this.toastr.success(this.product_resp.message, 'Response');

      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

} 



funcgetPreckingQueriesData(){
    
  this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_product_applications', 'application_status_id','utilities/getApplicationQueriesData')
  .subscribe(
    data => {
      this.applicationPreckingQueriesData = data.data;
      this.spinner.hide();
    });
}


  onLoaddurationDescData() {
    var data = {
      table_name: 'par_timespan_defination',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.durationDescData = data;
        });

  }onShowInitalQueriesWin(){
    
    this.isInitalQueryDataWinVisible = true;
  
  }
  onShowPrecheckingQueriesWin(){
  
  
  } funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    this.appuploaded_document_id = data.data.appuploaded_document_id;
    this.query_id =  data.data.query_id;
    this.isInitalQueryResponseFrmVisible = true;
    if(this.status_id == 13){
      this.isReadOnly = true;
    }
    else{
      this.isReadOnly = false;
    }
  
  }
  funcDownloadUploadedDoc(){
    if(this.appuploaded_document_id >0){
      this.dmsService.getApplicationDocumentDownloadurl(this.application_code, '', this.appuploaded_document_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin  = true;
          }
          else {
            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });
    }
    else{
      this.toastr.error('No Query Letter that has been Uploaded, preview the query for detail.', 'Alert');
    }
  }
  funcDownloadQueryLetter(data){
    this.appuploaded_document_id = data.data.appuploaded_document_id;
    this.funcDownloadUploadedDoc();
  }

  closeQueryResponseWin(){
    this.isInitalQueryResponseFrmVisible = false;
    this.funcReloadQueriesDetails();
  }
  funcReloadQueriesDetails(){
    this.funcgetPreckingQueriesData();

  }
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      this.toastr.error('Fill in query response to proceed!!', 'Alert');
      return;
    }
    this.action_url  = 'onSavePrecheckingqueryresponse';
    
    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value,this.action_url)
      .subscribe(
        response => {
          this.product_resp = response.json();
          if (this.product_resp.success) {
            this.toastr.success(this.product_resp.message, 'Response');
            this.funcReloadQueriesDetails()
            this.query_id = this.product_resp.record_id;
            this.initqueryresponsefrm.get('query_id').setValue(this.query_id)

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  }
  onProductDashboard() {
       //check for unsaved changes 
      this.router.navigate(['../online-services/productreg-dashboard']);

  }
 

  
  //on save the details
  onSavedrugProductApplication() {

    const invalid = [];
    const controls = this.productGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.productGeneraldetailsfrm.invalid) {
      return;
    }
    let registrant_details = this.applicationApplicantdetailsfrm.value;//applicant values

    if (this.country_id == 36) {

    }

    this.productGeneraldetailsfrm.get('group_application_code').setValue(this.group_application_code);
    
    this.spinner.show();
    this.appService.onSaveProductApplication(this.productGeneraldetailsfrm.value, registrant_details, 'onSaveProductApplication')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.product_id = this.product_resp.product_id;
            this.application_code = this.product_resp.application_code;
  
            this.productGeneraldetailsfrm.patchValue({ product_id: this.product_id })
            this.toastr.success(this.product_resp.message, 'Response');

            this.wizard.model.navigationMode.goToStep(1);

            this.onLoadProductApplciations();
            
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          
          this.spinner.hide();
        });
  }
  onSaveGroupedApplicationdetails() {

    const invalid = [];
    const controls = this.productAppSubmissionDetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.productAppSubmissionDetailsfrm.invalid) {
      return;
    }
    let registrant_details = this.applicationApplicantdetailsfrm.value;//applicant values

    if (this.country_id == 36) {

    }
  
    this.spinner.show();
    this.appService.onSaveProductApplication(this.productAppSubmissionDetailsfrm.value, registrant_details, 'onSaveGroupedApplicationdetails')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.group_tracking_no = this.product_resp.group_tracking_no;
            this.product_id = this.product_resp.product_id;
            this.group_application_code = this.product_resp.group_application_code;
            this.group_application_id = this.product_resp.group_application_id;

            this.productAppSubmissionDetailsfrm.patchValue({group_application_id: this.group_application_id, group_application_code: this.group_application_code});

            this.onLoadProductApplciations();
            this.toastr.success(this.product_resp.message, 'Response');

            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          
          this.spinner.hide();
        });
  }
onLoadProductApplciations(filter_params={group_application_code: this.group_application_code}) {
    
    this.appService.onProductApplicationLoading({group_application_code: this.group_application_code},'getGroupedProductApplicationsSub',1)
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.groupedProductApplicationData =  resp_data.data;
            
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
  
  onSavedrugRenAltProductApplication() {
  
    if(this.product_id >0){
       this.wizard.model.navigationMode.goToStep(1);
    //  return;

    }
    
    if (this.productGeneraldetailsfrm.invalid) {
      
   //   this.toastr.error('Fill all the Product Details', 'Alert');
    //  return;
    }
    this.spinner.show();
    this.appService.onSaveProductApplication(this.productGeneraldetailsfrm.value, {}, 'onSaveRenAltProductApplication')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
         
          if (this.product_resp.success) {
              this.tracking_no = this.product_resp.tracking_no;
            this.product_id = this.product_resp.product_id;
            this.application_code = this.product_resp.application_code;

            this.toastr.success(this.product_resp.message, 'Response');

            this.autoLoadProductsOtherDetails(this.product_id);
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });
  }
  onSavedrugWithdrawalProductApplication() {
    if(this.product_id >0){
      this.wizard.model.navigationMode.goToStep(1);
      return;

    }
    if (this.productGeneraldetailsfrm.invalid) {
     //comment the retrurn return;
    }
    this.productGeneraldetailsfrm.value
    //  this.spinner.show();
    
    this.appService.onSaveProductApplication(this.productGeneraldetailsfrm.value, {}, 'onSaveWithdrawalProductApplication')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.product_id = this.product_resp.product_id;
            this.application_code = this.product_resp.application_code;

            this.toastr.success(this.product_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });
  }

  onSaveProductIngredients() {
    let appproduct_id = this.product_id;
    this.spinner.show();
    this.appService.onSaveProductOtherDetails('wb_product_ingredients', this.productIngredientsdetailsfrm.value, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadProductsIngredients(appproduct_id);
           
            this.productIngredientsModal = false;
            this.toastr.success(this.product_resp.message, 'Response');

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onManufacturingSiteHasInspection($event){
    if($event.value ==1){
      this.has_beeninspected = true;
    }
    else{
      this.has_beeninspected = false;
  
    }
  } 
  
  onSaveProductNutrients() {
    this.spinner.show();
    this.appService.onSaveProductOtherDetails('wb_product_nutrients', this.productNutrientsdetailsfrm.value, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadProductsNutrients(this.product_id);
            this.modalService.getModal('productNutrientsModal').close();

            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }

  onsaveProdManufacturingSite() {
    this.spinner.show();
    let manufacturer_id = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
    let man_site_id = this.productmanufacturingSiteFrm.get('man_site_id').value;
    let manufacturer_role_id = this.productmanufacturingSiteFrm.get('manufacturer_role_id').value;
    this.appService.onSaveProductOtherDetails('wb_product_manufacturers', { manufacturer_id: manufacturer_id, manufacturer_role_id: manufacturer_role_id, product_id: this.product_id, manufacturer_type_id: this.manufacturer_type_id,man_site_id:man_site_id }, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadproductManufacturersData(this.product_id);
            this.isproductmanSiteDetailsModalShow = false;
            this.isproductManufacturerModalShow = false;
            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onsaveAPIManufacturingSite() {
    this.spinner.show();
    let manufacturer_id = this.productapimanufacturingSiteFrm.get('manufacturer_id').value;
    let active_ingredient_id = this.productapimanufacturingSiteFrm.get('active_ingredient_id').value;
    this.appService.onSaveProductOtherDetails('wb_product_manufacturers', { manufacturer_id: manufacturer_id, active_ingredient_id: active_ingredient_id, product_id: this.product_id, manufacturer_type_id: this.manufacturer_type_id }, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadapiManufacturersData(this.product_id);
            this.isproductmanSiteDetailsModalShow = false;
            this.isapimanSiteDetailsModalShow = false;
            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }

  onAddManufacturingSite() {
    this.spinner.show();
    let manufacturer_name = this.manufacturingSiteFrm.get('name').value;
    let physical_address = this.manufacturingSiteFrm.get('physical_address').value;
   

    this.appService.onAddManufacturingSite('par_man_sites', this.manufacturingSiteFrm.value)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadproductManufacturersData(this.product_id);
            this.isnewmanufactureringSiteDetailsModalShow = false;
            this.isproductManufactureringSiteModalShow = false;
            if (this.manufacturer_type_id == 1) {
              this.isproductmanSiteDetailsModalShow = true;

              this.productmanufacturingSiteFrm.get('man_site_id').setValue(this.product_resp.record_id)
              this.productmanufacturingSiteFrm.get('manufacturing_site_name').setValue(manufacturer_name)
              this.productmanufacturingSiteFrm.get('physical_address').setValue(physical_address)

            }
            else {
              this.isapimanSiteDetailsModalShow = true;
              this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(this.product_resp.record_id)
              this.productapimanufacturingSiteFrm.get('name').setValue(manufacturer_name)
              this.productapimanufacturingSiteFrm.get('physical_address').setValue(physical_address)
            }
            this.spinner.hide();
            this.toastr.success(this.product_resp.message, 'Response');

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name').value;
    this.appService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.isnewmanufacturerModalShow = false;
            this.isproductManufacturerModalShow = false;
    
            let manufacturer_id =this.product_resp.record_id;
            //load Manufactureing Sites 
            if (this.manufacturer_type_id == 1) {
              this.isproductmanSiteDetailsModalShow = true;
              this.productmanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
              this.productmanufacturingSiteFrm.get('manufacturer_name').setValue(manufacturer_name)
             

            }
            else {
              
              this.isapimanSiteDetailsModalShow = true;
              this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
              this.productapimanufacturingSiteFrm.get('name').setValue(manufacturer_name)
            
            }

            this.toastr.success(this.product_resp.message, 'Response');

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  
  onSaveProductPackaging() {
    this.spinner.show();
    this.appService.onSaveProductOtherDetails('wb_product_packaging', this.productPackagingdetailsfrm.value, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.OnLoadProductsPackagingMaterials(this.product_id);
            this.modalService.getModal('productPackagingModal').close();

            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onProductDataEntryNext() {
    //get the details
    if (this.tracking_no != '') {

      return true;
    }
    else {
      this.toastr.success('Save Product Application!!', 'Alert');
      return;
    }

  }
  autoLoadedParameters(section_id) {
    this.onLoadSections();
    this.onLoadZones();
    this.onLoadconfirmDataParm();
    this.onLoadconfirmDataParmAll();
    this.onLoadRegistrantOptions();
    this.onLoadCommonNames(section_id);
    this.onLoadgmdnCategoryData(section_id);
    this.onLoadClassifications(section_id);
    this.onLoadriskCategoriesData(section_id);
    this.onLoadSiUnits(section_id);
    this.onLoadpackagingUnitsData(section_id);

    this.onLoadmethodOfUseData(section_id);
    this.onLoadtabaccoFlavourData(section_id);
    this.onLoadformulationData(section_id);
    this.onLoadproductAppliedData(section_id);
    this.onLoadpestCideData(section_id);
    this.onLoadwhoHazardClassData(section_id);

    this.onLoadProductForm(section_id);
    this.onLoadstorageCondition(section_id);
    this.onLoadproductCategoryData(section_id);
    this.onLoaddistributionCategory(section_id);
    this.onLoadingredientsData(section_id);
    this.onLoadspecificationData(section_id);
    this.onLoadreasonForInclusionData(section_id);
    this.onLoadcontainerMaterialData(section_id)
    this.onLoadcontainerData(section_id);
    this.onLoadintendedUseData(section_id);
    this.onLoadmanufacturingRoleData(section_id);
    this.onLoadcontainerTypeDataData(section_id)

    this.onLoadclosureMaterialData(section_id)
    this.onLoadsealTypeData(section_id);
    this.onLoadrouteOfAdministration(section_id);
    this.onLoadtargetSpecies(section_id);
    this.onLoadvetmedicinesRegistrationtypeData();

    this.onLoaddosageForms(section_id);
  
    this.onLoadCountries();
    this.onLoadingredientTypeData(section_id);
    this.onLoadingredientData(section_id);
    this.onLoadingredientCategoryData(section_id);
    this.onLoadingredientCategoryData(section_id);
    this.onLoadingredientData(section_id);
    this.onLoadProductType();
    this.onLoaddevicesTypeData(section_id)

    this.onLoadproductSpecialCategory(section_id)
    this.onLoadintendedEndUserData(section_id);
    this.onLoadfastTrackOptionsData();
    this.onLoadpayingCurrencyData();
  }
  onLoadingredientTypeData(section_id) {
    var data = {
      table_name: 'par_ingredients_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ingredientTypeData = data;
        });
  }
  onLoadingredientCategoryData(section_id) {
    var data = {
      table_name: 'par_nutrients_category',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.nutrientsCategoryData = data;
        });
  }
  onLoadingredientData(section_id) {
    var data = {
      table_name: 'par_nutrients',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.nutientsData = data;
        });
  }
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadProductsIngredients(product_id);
    this.OnLoadProductsPackagingMaterials(product_id);
    this.OnLoadproductManufacturersData(product_id);
    this.OnLoadapiManufacturersData(product_id)
    this.OnLoadProductsNutrients(product_id);
    this.OnLoadProductsGMPInspectionDetails(product_id)

  }

  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadCountries(is_local = 0) {
    let data = {
      table_name: 'par_countries',
      // id: 36
    };
    if(is_local == 1){
      let data = {
        table_name: 'par_countries',
        is_local: 1
      };
    }

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.countries = data;
          this.countriesData = data;
        },
        error => {
          return false;
        });
  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.regions = data;
        },
        error => {
          return false
        });
  }

  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }

  onLoadRegistrantOptions() {
    var data = {
      table_name: 'par_registrant_options',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registrantOptionsData = data;
        });
  }
  onLoadcontainerTypeDataData(section_id) {
    var data = {
      table_name: 'par_containers_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerTypeData = data;
        });
  }

  onLoadclosureMaterialData(section_id) {
    var data = {
      table_name: 'par_closure_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.closureMaterialData = data;
        });
  }
  onLoadsealTypeData(section_id) {
    var data = {
      table_name: 'par_seal_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sealTypeData = data;
        });
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
    onLoadconfirmDataParmAll() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParamAll = data;
        });
  }

  onLoadZones() {
    var data = {
      table_name: 'par_zones',
      is_hq: 1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zonesData = data;
        });
  }

  onLoaddistributionCategory(section_id) {
    var data = {
      table_name: 'par_distribution_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCategoryData = data;
        });
  }
  onLoadstorageCondition(section_id) {
    var data = {
      table_name: 'par_storage_conditions'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.storageConditionData = data;
        });
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

  onLoadProductForm(section_id) {
    var data = {
      table_name: 'par_product_forms',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productFormData = data;
        });
  }
  onLoadingredientsData(section_id) {
    var data = {
      table_name: 'par_ingredients_details',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ingredientsData = data;
        });
  }
  onLoaddosageForms(section_id) {
    var data = {
      table_name: 'par_dosage_forms'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
         // this.dosageFormsData = data;
          this.dosageFormsData = new DataSource({
            paginate: true,
            pageSize: 200,
            store: {
              type: "array",
                data: data,
                key: "id"
            }
        });
        });
  }
  onLoadspecificationData(section_id) {
    var data = {
      table_name: 'par_specification_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.specificationData = data;
        });
  }

  onLoadreasonForInclusionData(section_id) {
    var data = {
      table_name: 'par_inclusions_reasons'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForInclusionData = data;
        });
  }

  onLoadcontainerData(section_id) {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerData = data;
        });
  }
  onLoadintendedUseData(section_id) {
    var data = {
      table_name: 'par_intendedend_use',
      section_id:section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.intendedUseData = data;
        });
  }
  // this.onLoaddevicesTypeData(section_id)

  onLoaddevicesTypeData(section_id) {
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

  onLoadcontainerMaterialData(section_id) {
    var data = {
      table_name: 'par_containers_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerMaterialData = data;
        });
  }
  onLoadmethodOfUseData(section_id) {
    var data = {
      table_name: 'par_methodof_use'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.methodOfUseData = data;
        });
  }
    onLoadtabaccoFlavourData(section_id) {
    var data = {
      table_name: 'par_tobacco_flavours',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.tabaccoFlavourData = data;
        });
  }

  onLoadwhoHazardClassData(section_id) {
    var data = {
      table_name: 'par_who_hazardclass'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.whoHazardClassData = data;
        });
  }
    onLoadpestCideData(section_id) {
    var data = {
      table_name: 'par_pesticide_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.pestCideData = data;
        });
  }
    onLoadproductAppliedData(section_id) {
    var data = {
      table_name: 'par_product_applicationareas'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productAppliedData = data;
        });
  }
    onLoadformulationData(section_id) {
    var data = {
      table_name: 'par_formulation_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.formulationData = data;
        });
  }
  onLoadmanufacturingRoleData(section_id) {

    var data = {
      table_name: 'par_manufacturing_roles',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.manufacturingRoleData = data;
         this.manufacturingRoleDataSource = new ArrayStore({
              data: data,
              key: "id"
          });
          
        });

  }
  onLoadrouteOfAdministration(section_id) {
    var data = {
      table_name: 'par_route_of_administration'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdministrationData = data;
        });
  }
    onLoadtargetSpecies(section_id) {
    var data = {
      table_name: 'par_target_species'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.targetSpeciesData = data;
        });
  }
  onLoadvetmedicinesRegistrationtypeData() {
    var data = {
      table_name: 'par_vetmedicines_registrationtypes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.vetmedicinesRegistrationtypeData = data;
        });
  }

  
  onLoadSiUnits(section_id) {
    var data = {
      table_name: 'par_si_units',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });
  }
  onLoadpackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });
  }

  onLoadReasonFoInclusion(section_id) {
    var data = {
      table_name: 'par_inclusions_reasons',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForInclusionData = data;
        });
  }onLoadgmdnCategoryData(section_id) {
    var data = {
      table_name: 'par_gmdn_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmdnCategoryData = data;
        });
  }
  
  onLoadCommonNames(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };
    this.confirmDataParam = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
  
 
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
          this.commonNamesData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
        });
       
  }
 

  onLoadClassifications(section_id) {
      
      this.params_where = {
        table_name: 'par_classifications',
        //section_id: section_id,
        prodclass_category_id:this.prodclass_category_id
      };

   

    this.config.onLoadConfigurationData(this.params_where)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  } onLoadriskCategoriesData(section_id) {
    var data = {
      table_name: 'par_productrisk_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.riskCategoriesData = data;
        });
  }


  
  onLoadProductType() {
    var data = {
      table_name: 'par_product_origins'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeData = data;
        });
  }


  onLoadSelectOptions(dataMdl, data) {
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          dataMdl = data;
        });
  }

  //modal 
  funcAddProductIngredients() {
    this.productIngredientsModal = true;
    this.modalService.getModal('productIngredientsModal').open();
    this.productIngredientsdetailsfrm.reset();
  }
  funcEditIngredientsDetails(data) {
    this.productIngredientsdetailsfrm.patchValue(data.data);
    this.productIngredientsModal = true;
  }
  funcEditPackagingDetails(data) {
    this.productPackagingdetailsfrm.patchValue(data.data);
    this.modalService.getModal('productPackagingModal').open();
  }
  funcAddProductPackagingDetails() {
    this.modalService.getModal('productPackagingModal').open();
    this.productPackagingdetailsfrm.reset();

  }
  funcSelectManufacturer(data) {
    if (this.manufacturer_type_id == 1) {
      this.manufacturer_id = data.data.manufacturer_id;
      this.productmanufacturingSiteFrm.patchValue(data.data);
      this.isproductmanSiteDetailsModalShow = true;
    }
    else {
      this.productapimanufacturingSiteFrm.patchValue(data.data);
      this.isapimanSiteDetailsModalShow = true;

    }
    this.isproductManufacturerModalShow = false;
  }//productgmpInspectionData
  funcSelectManufacturingSite(data) {

    this.productmanufacturingSiteFrm.patchValue(data.data);
      this.isproductmanSiteDetailsModalShow = true;
    this.isproductManufactureringSiteModalShow = false;
  }
  funcSelectGmpInspection(data) {
    //gmp_site_id
    this.prodgmpAddinspectionFrm.patchValue(data.data);
    this.isgmpAddinspectionModalShow = true;
    let manufacturing_site_id = data.data.manufacturing_site_id;
  
    this.onLoadgmpProductLineData(manufacturing_site_id);

  }

  funSelectRegisteredPremisessApp(data){
    let data_set = data.data;

    let manufacturer_id  = this.productmanufacturingSiteFrm.get('manufacturer_id').value;

    this.appService.onAddManufacturingSite('par_man_sites', {manufacturer_id:manufacturer_id,premise_registered_id:data_set.registered_id,name:data_set.premises_name,region_id:data_set.region_id,country_id:data_set.country_id,district_id:data_set.district_id,physical_address:data_set.physical_address,postal_address:data_set.postal_address, email_address:data.email})
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadproductManufacturersData(this.product_id);
          this.isnewmanufactureringSiteDetailsModalShow = false;
          this.isproductManufactureringSiteModalShow = false;
          this.isRegisteredPremisesModalShow = false;
          if (this.manufacturer_type_id == 1) {
            this.isproductmanSiteDetailsModalShow = true;

            this.productmanufacturingSiteFrm.get('man_site_id').setValue(this.product_resp.record_id)
            this.productmanufacturingSiteFrm.get('manufacturing_site_name').setValue(data_set.premises_name)
            this.productmanufacturingSiteFrm.get('physical_address').setValue(data_set.physical_address)

          }
          else {
            this.isapimanSiteDetailsModalShow = true;
            this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(this.product_resp.record_id)
            this.productapimanufacturingSiteFrm.get('name').setValue(data_set.premises_name)
            this.productapimanufacturingSiteFrm.get('physical_address').setValue(data_set.physical_address)

          }

          this.toastr.success(this.product_resp.message, 'Response');

        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });

  }
  funcAddAPIManufacturerDetails(){
    this.isapimanSiteDetailsModalShow = true;
    this.productapimanufacturingSiteFrm.reset();

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
 
  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }
  onSaveprodgmpAddinspection(){

    this.spinner.show();
    this.appService.onSaveProductOtherDetails('wb_product_gmpinspectiondetails', this.prodgmpAddinspectionFrm.value, this.product_id)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.isgmpinspectionModalShow = false;
            this.isgmpAddinspectionModalShow = false;
            this.OnLoadProductsGMPInspectionDetails(this.product_id)
            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  
 
  onSearchProductManufacturer() {
    //the details 
    this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
    if(this.product_origin_id == 1){
        
    }
    this.isproductManufacturerModalShow = true;
    this.onGetProductManufacturerDetails();


  }
  funcAddProductManufacturerDetails(){
      //the details 
      this.isproductmanSiteDetailsModalShow = true;
      this.onGetProductManufacturerDetails();
      this.productmanufacturingSiteFrm.reset();


  }
  onSearchProductManufacturerSite() {
    //the details 
    let manufacturer_id  = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
    if(manufacturer_id >0){
      this.manufacturer_type_id = 1
      this.isproductManufactureringSiteModalShow = true;
      
      this.funcAddManufactureringDetails();
    }
    else{
      this.toastr.error('Select manufacturer details 1st before the Manufacturing Site', 'Alert');
    }
    
  }
  onSearchProductManufacturingSite() {
    this.isproductManufacturerModalShow = true;
    this.isproductmanSiteDetailsModalShow = false;
  }
  onSearchAPIManufacturer() {
    this.isproductManufacturerModalShow = true;
    this.onGetProductManufacturerDetails();
    this.manufacturer_type_id = 2;
  }


  onGetProductManufacturerDetails() {

        let me = this;
        this.manufacturer_type_id = 1;
        this.manufacturersData.store = new CustomStore({
          load: function (loadOptions: any) {
            console.log(loadOptions)
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;//searchValue
              var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
              });
            
              this.configData = {
                headers: headers,
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
              };
              return me.httpClient.get(AppSettings.base_url + 'productregistration/getManufacturersInformation',this.configData)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });
  }
  
  funcAddManufactureringDetails() {

        let me = this;
        this.manufacturer_type_id = 1;
        
      var manufacturer_id = me.productmanufacturingSiteFrm.get('manufacturer_id').value;
     
      this.appService.getProductsOtherDetails({ manufacturer_id:manufacturer_id }, 'getManufacturingSiteInformation')
      .subscribe(
        data => {
          if (data.success) {
            this.manufacturersSiteData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }

        },
        error => {
          return false
        });

  }

  funcViewRegisteredPremises(){
        let me = this;
        this.registeredPremisesData.store = new CustomStore({
          load: function (loadOptions: any) {
            console.log(loadOptions)
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;//searchValue
              var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
              });
              //you can filter by specific premises

              this.configData = {
                headers: headers,
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter}
              };

              return me.httpClient.get(AppSettings.base_url + 'premisesregistration/getTradersRegisteredPremises',this.configData)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });

  }
  
  loadAddProdGmpInspectionDetails() {
        let me = this;
        this.tradergmpInspectionData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,product_id:me.product_id, application_code:me.application_code}
              };
              return me.httpClient.get(AppSettings.base_url + 'productregistration/getGmpInspectionsdetails',this.configData)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });

      this.tradergmpInspectionData.store.load();

  }
  funcAddProdGmpInspectionDetails() {
   
    this.isgmpinspectionModalShow = true;
    this.loadAddProdGmpInspectionDetails();
  }

 
  funcAddProductLocalRepresentativeDetails() {
    this.modalService.getModal('productLocalRepresenativeModal').open();

  }
  funcAddManufacturerSite() {
    this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
    this.isnewmanufacturerModalShow = true;
    this.isproductManufacturerModalShow = true;
    this.manufacturerFrm.reset();
    
  }
  funcAddManufactureringSite() {
      let product_origin_id = this.product_origin_id;
      this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
      this.isnewmanufactureringSiteDetailsModalShow = true;
        this.isproductManufacturerModalShow = false;

       this.manufacturingSiteFrm.reset();

       let manufacturer_id = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
       this.manufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id);

       if(this.product_origin_id == 2){

          this.onLoadCountries(1);
    }
  }
  finishFunction() {

  }
  onTraderasLocalAgentChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasLtr = true;
        this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id });
    }else{
      this.isReadOnlyTraderasLtr = false;

      this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 2 })
    }
   

  }


  onProductOriginChangeChange($event) {
      this.product_origin_id = $event.value;
      this.readOnlyOrigin = true;

  }
  onSelectRegistrantOptions($event) {

    this.registrant_option_id = $event.selectedItem.id;
    if (this.registrant_option_id == 1) {
      this.registrant_optionDisabled = true;

    }
    else {
      this.registrant_optionDisabled = false;
      this.applicationApplicantdetailsfrm.patchValue({ applicant_name: 'Search Product Registrant' })

    }

  }
  onMovePreviousWizard(previous_step) {
    this.wizard.model.navigationMode.goToStep(previous_step);

  }
  funcNextQueryResponse(){
    let nextStep = 1;
    if(this.query_sectioncheck == 'generalinfo_panel'){
      nextStep = 1

    }
    else if(this.query_sectioncheck == 'productsdetailed_panel'){
      nextStep = 2

    }
    else if(this.query_sectioncheck ==  'document_panel'){
      nextStep = 3
    }

    this.wizard.model.navigationMode.goToStep(nextStep);
  }
  onMoveNextWizard(nextStep) {
    //validate details 
    if (nextStep == 2 + this.initWizardPanel) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 3 + this.initWizardPanel) {
      //validate the datasets 

      this.spinner.show();
      this.appService.onValidateProductOtherdetails(this.product_id, this.section_id)
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
    else{
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
  }
  
  onAppQueryPreparing(e) {
    
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.funcReloadQueriesDetails.bind(this)
        }
      });

  }
  onProdIngredientsPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductIngredients, 'Product Ingredients');
  }
  onProdPackagingPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductPackagingDetails, 'Product Packaging');
  }
 
  onProdApiManufacturingPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddAPIManufacturerDetails, 'Product API Manufacturers');
  }
  onProdInspectionDetailsPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddProdGmpInspectionDetails, 'GMP Inspection Details');
  }
 
  onManufacturingSitePreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddManufactureringSite, 'Manufacturering Site');
  }
  onManufacturerPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  onProdManufacturingPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddProductManufacturerDetails, 'Product Manufacturers');

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled: this.tbisReadOnly,
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
  //load 
  OnLoadProductsIngredients(product_id) {
    this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsIngredients')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.drugsingredientsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }


  OnLoadProductsPackagingMaterials(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsDrugsPackaging')
      //.pipe(first())
      .subscribe(
        data => {
          this.drugsPackagingData = data.data;
        },
        error => {
          return false
        });
  }
  OnLoadproductManufacturersData(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id, manufacturer_type_id: 1 }, 'getproductManufactureringData')
      //.pipe(first())
      .subscribe(
        data => {
          this.productManufacturersData = data.data;
        },
        error => {
          return false
        });
  }


  OnLoadapiManufacturersData(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id, manufacturer_type_id: 2 }, 'getAPIproductManufactureringData')
      //.pipe(first())
      .subscribe(
        data => {
          this.apiManufacturersData = data.data;
        },
        error => {
          return false
        });
  }

  funcDeleteIngredientsDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let appproduct_id = data.data.product_id;
    let table_name = 'wb_product_ingredients';
    this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_ingredients', 'Product Ingredients');

  }
  funcDeleteManufacturingDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let appproduct_id = data.data.product_id;
    let table_name = 'wb_product_manufacturers';
    this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_manufacturer', 'Product Manufacturer');

  }
  funcDeleteGMPManufacturingDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let appproduct_id = data.data.product_id;
    let table_name = 'wb_product_gmpinspectiondetails';
    this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'gmp_inspection', 'Product GMP Inspection Manufacturer');

  }


  funcDeletePackDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let appproduct_id = data.data.product_id;
    let table_name = 'wb_product_packaging';
    this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_packaging', 'Product Packaging');

  }
  funcDeleteDetailhelper(record_id, appproduct_id, table_name, reload_type, title) {
    this.modalDialogue.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete ' + title + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
            this.appService.onDeleteProductsDetails(record_id, table_name, appproduct_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if (reload_type == 'product_ingredients') {
                      this.OnLoadProductsIngredients(appproduct_id);

                    }
                    else if (reload_type == 'product_packaging') {
                      this.OnLoadProductsPackagingMaterials(appproduct_id);

                    }
                    else if (reload_type == 'product_manufacturer') {
                      this.OnLoadapiManufacturersData(appproduct_id);
                      this.OnLoadproductManufacturersData(appproduct_id);
                    }
                    else if (reload_type == 'gmp_inspection') {
                      this.OnLoadProductsGMPInspectionDetails(appproduct_id);
                    }
                    this.spinner.hide();
                    this.toastr.success(resp.message, 'Response');
                  }
                  else {
                    this.toastr.error(resp.message, 'Alert');
                  }
                },
                error => {
                  return false
                });
            resolve();
          })
        },
        {
          text: 'no',
          buttonClass: 'btn btn-default',
          onAction: () => new Promise((resolve: any) => {

            resolve();

          })
        }
      ]
    });
  }
  newProductTermscheckbox(e) {

    this.checkProductsSubmission = e.value;

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
  onProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/productreg-dashboard'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_product_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    this.isApplicationSubmitwin = false;

  } 
  
  OnLoadProductsNutrients(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsNutrients')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.productsNutrientsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
  OnLoadProductsGMPInspectionDetails(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsGMPInspectionDetails')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.productgmpInspectionData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
  onLoadgmpProductLineData(manufacturing_site_id) {

    this.appService.getProductsOtherDetails({ manufacturing_site_id: manufacturing_site_id }, 'getgmpProductLineDatadetails')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.gmpProductLineData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
  onProdNutrientssPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductNutrients, 'Product Nutrients');
  }
  funcAddProductNutrients() {
    this.modalService.getModal('productNutrientsModal').open();
    this.productNutrientsdetailsfrm.reset();
  }
  funcEditNutrientsDetails(data) {
    this.productNutrientsdetailsfrm.patchValue(data.data);
    this.modalService.getModal('productNutrientsModal').open();
  }
  funcDeleteNutrientsDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let appproduct_id = data.data.product_id;
    let table_name = 'wb_product_nutrients';
    this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_nutrients', 'Product Nutrients');

  }
  onLoadproductCategory(section_id) {
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
  onLoadproductSpecialCategory(section_id) {
    var data = {
      table_name: 'par_productspecial_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSpecialCategoryData = data;
        });
  }
  
  
  onLoadintendedEndUserData(section_id) {
    var data = {
      table_name: 'par_intended_enduser',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.intendedEndUserData = data;
        });
  }

  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }
  onLoadproductSubCategory(product_category_id) {
    var data = {
      table_name: 'par_subproduct_categories',
      product_category_id: product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSubCategoryData = data;
        });
  }
  
  printProductQueryLetter(){
    let report_url = this.mis_url+'reports/printProductQueryLetter?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&product_id="+this.product_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"print Query Letter");
  }
  onDrugsProductsApplicationPrint(){

    let report_url = this.base_url+'reports/generateProductApplicationReport?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&product_id="+this.product_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Product Application Details")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcValidateApplicationVariationDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code, 'wb_application_variationsdata')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }
         
          this.spinner.hide();
        });

  }
  funcValidateApplicationWithdrawalDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code, 'wb_application_withdrawaldetails')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }
          this.wizard.model.navigationMode.goToStep(nextStep);

          this.spinner.hide();
        });

  }

  funcValidateDocumentsUpload(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_product_applications', this.prodclass_category_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
                this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }

          this.spinner.hide();
        });

  }
  funcValidateApplicationLabels(nextStep) {
    let document_type_id = 6;
    this.utilityService.funcValidateApplicationLabels(this.application_code, document_type_id, 'wb_product_applications')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response.success) {
            this.wizard.model.navigationMode.goToStep(nextStep);
          } else {
            this.toastr.error(response.message, 'Alert');
          }

          this.spinner.hide();
        });

  }
  onSearchRegisteredProductApplication() {
    this.appService.getProductsOtherDetails({ section_id: this.section_id }, 'onSearchRegisteredProductApplication')
      .subscribe(
        data => {
          if (data.success) {
            this.registeredProductsData = data.data;
            this.isRegisteredProductsWinshow = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onClickApplicationSubmitWin(){
    
    this.isApplicationSubmitwin = true;
}funcValidateApplicationQueryresponse( nextStep) {

  this.spinner.show();
  this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_product_applications')
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
funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
funcpopheight(percentage_width) {
  return window.innerHeight * percentage_width/100;
}

onFUncCloseQueryWindow(){
  this.isInitalQueryResponseFrmVisible = false;
}
onAddNewCommonNameDetails(){
  this.addproductGenericNamesFrm.reset();
  this.addproductGenericNamesModal = true;
 console.log('tests');
}

onSaveNewGenericName(){
  this.addproductGenericNamesFrm.get('tablename').setValue('par_common_names')
  this.addproductGenericNamesFrm.get('section_id').setValue(this.section_id);
  this.utilityService.onsaveApplicationUniformDetails('', this.addproductGenericNamesFrm.value, 'onsaveProductConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadCommonNames(this.section_id);
       
        this.addproductGenericNamesModal = false;
        this.productGeneraldetailsfrm.get('common_name_id').setValue(this.product_resp.record_id)
        this.toastr.success(this.product_resp.message, 'Response');

      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

}  

onSavesampleDetails() {
this.spinner.show();
let table_name;
    table_name = 'wb_sample_information';

this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.sampleDetailsFrm.value, 'onSavesampleDetails')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadSampleSubmissionData();
        this.isSampleDetailsWinshow = false;

        this.toastr.success(this.product_resp.message, 'Response');
      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

}

onSaveActivePharmaceuticalDetails() {
this.spinner.show();
let table_name;
    table_name = 'wb_active_information';

this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.activePharmaceuticalDetailsFrm.value, 'onSaveActivePharmaceuticalDetails')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadActivePharmaceuticalData();
        this.isActivePharmaceuticalWinshow = false;

        this.toastr.success(this.product_resp.message, 'Response');
      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

}
onLoadSampleSubmissionData(product=null) {

  this.appService.getProductsOtherDetails({ application_code: this.application_code }, 'getSampleSubmissionDetails')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.sampleSubmissionData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
}

onLoadActivePharmaceuticalData(product=null){
    this.appService.getProductsOtherDetails({ application_code: this.application_code }, 'getSampleSubmissionDetails')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.ActivePharmaceuticalData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });

}
onsampleSubmissionPreparing(e) {
  e.toolbarOptions.items.unshift({
    location: 'before',
    widget: 'dxButton',
    options: {
      text: 'Enter Sample Details',
      type: 'default',
      icon: 'fa fa-plus',
      onClick: this.funcAddSampleSubmissionDetails.bind(this)

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
onActivePharmaceuticalPreparing(e) {
  e.toolbarOptions.items.unshift({
    location: 'before',
    widget: 'dxButton',
    options: {
      text: 'Enter Active Substances',
      type: 'default',
      icon: 'fa fa-plus',
      onClick: this.funcAddActivePharmaceuticalDetails.bind(this)

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
funcAddSampleSubmissionDetails(){
  this.isSampleDetailsWinshow = true;

}
funcAddActivePharmaceuticalDetails(){
  this.isActivePharmaceuticalWinshow = true;
}

funcEditSampleDetails(data) {
this.sampleDetailsFrm.patchValue(data.data);
this.isSampleDetailsWinshow = true;
}

funcEditActiveDetails(data) {
this.activePharmaceuticalDetailsFrm.patchValue(data.data);
this.isActivePharmaceuticalWinshow = true;
}


onAssessmentTypesCboSelect($event) {
   
  if($event.selectedItem){
    this.assessmentprocedure_type_id = $event.selectedItem.id;
    this.onLoadfastTrackOptionsData();

    this.onLoadAssessmentProcedure(this.assessmentprocedure_type_id);
    this.productGeneraldetailsfrm.addControl('assessment_procedure_id',new FormControl('', Validators.required));
    
  }else{
    this.onLoadfastTrackOptionsData();
  }
  
}
onLoadAssessmentProcedureTypes() {
  var data = {
    table_name: 'par_assessmentprocedure_types',
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.assessmentTypesData = data;
      });
}
onLoadAssessmentProcedure(assessmentprocedure_type_id) {
      var data = {
        table_name: 'par_assessment_procedures',
        assessmentprocedure_type_id:assessmentprocedure_type_id
      };
      this.config.onLoadConfigurationData(data)
        .subscribe(
          data => {
            this.assessmentProcedureData = data;
          });
}
onFUncCloseGroupApplicatinWindow(){
  this.isInitiateAddProductGroupAppWin = false;

}
onManufacturingCountryChange($event) {
   
  if($event.selectedItem){
    let is_locally_manufatured = $event.selectedItem.is_local;
    let country_region_id = $event.selectedItem.country_region_id;
    
    if(is_locally_manufatured ==1){
      this.productGeneraldetailsfrm.get('product_origin_id').setValue(1);
    }else{
      this.productGeneraldetailsfrm.get('product_origin_id').setValue(2);
    }
    this.readOnlyOrigin = true;
    if(this.section_id == 1 && country_region_id == 1){
        this.has_otherregistration_selection = true;
    }else{
      this.has_otherregistration_selection = false;
    }
  }
}
}
