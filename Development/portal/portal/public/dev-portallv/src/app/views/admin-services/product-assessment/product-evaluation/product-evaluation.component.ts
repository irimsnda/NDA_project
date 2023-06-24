import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SharedassessmentClassComponent } from '../sharedassessment-class/sharedassessment-class.component';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from "devextreme/data/array_store";
@Component({
  selector: 'app-product-evaluation',
  templateUrl: './product-evaluation.component.html',
  styleUrls: ['./product-evaluation.component.css']
})
export class ProductEvaluationComponent extends SharedassessmentClassComponent  implements OnInit {
  isReadOnly:boolean= true;value:any;
  processData:any;
  isPreviewProductInformation:boolean=false;
  productGeneraldetailsfrm: FormGroup;
  productTypeData: any;
  initWizardPanel: number = 0;
  sectionsData: any;
  commonNamesData: any;
  ATCCodesData:any;
  classificationData: any;
  riskCategoriesData:any;
  zonesData: any;
  productData: any;
  assessmentProcedureData: any;
  registrantOptionsData: any;
  siUnitsData: any;
  packagingUnitsData: any;
  reasonForInclusionData: any;
  distributionCategoryData: any;
  storageConditionData: any;
  isReadOnlyTraderasLtr:boolean= false;
  productCategoryData: any;

  routeOfAdministrationData: any;
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

  applicationApplicantdetailsfrm: FormGroup;
  productIngredientsdetailsfrm: FormGroup;
  productPackagingdetailsfrm: FormGroup;
  manufacturingSiteFrm: FormGroup;
  manufacturerFrm:FormGroup;
  productmanufacturingSiteFrm: FormGroup;
  prodgmpAddinspectionFrm:FormGroup;
  productapimanufacturingSiteFrm: FormGroup;
  productNutrientsdetailsfrm: FormGroup;
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
  product_id: number;
  product_resp: any;
  productMdl: any = {};
  prodformData: any;

  intendedUseData: any;
  devicesTypeData: any;
  confirmDataParam: any;
  containerData: any;
  containerMaterialData: any;
  terms_conditions: any;

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

  product_type_id:number;
  atc_code_id:number;
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
  
  constructor(public utilityService:Utilities,public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public modalServ: ModalDialogService,public viewRef: ViewContainerRef, public appService: ProductApplicationService) {
    super(utilityService,spinner, configService, router, formBuilder, config,  toastr,  authService,httpClient, modalServ, viewRef)
    
    if(this.section_id == 2){
      if(this.prodclass_category_id == 2){
          this.productGeneraldetailsfrm = new FormGroup({
                      section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
                      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
                      common_name_id: new FormControl('', Validators.compose([])),
                      classification_id: new FormControl('', Validators.compose([Validators.required])),
                      brand_name: new FormControl('', Validators.compose([Validators.required])),
                      assessment_procedure_id: new FormControl('', Validators.compose([Validators.required])),
                      zone_id: new FormControl('', Validators.compose([Validators.required])),
                      shelflifeafteropeningduration_desc: new FormControl('', Validators.compose([])),
                      physical_description: new FormControl('', Validators.compose([Validators.required])),
                      distribution_category_id: new FormControl('', Validators.compose([Validators.required])),
                      storage_condition_id: new FormControl('', Validators.compose([])),
                      product_form_id: new FormControl('', Validators.compose([Validators.required])),
                      shelf_life: new FormControl(this.product_id, Validators.compose([Validators.required])),
                      shelf_lifeafter_opening: new FormControl(this.product_id, Validators.compose([])),
                      product_id: new FormControl(this.product_id, Validators.compose([])),
                      shelflifeduration_desc:new FormControl('', Validators.compose([Validators.required])),
                      local_agent_id: new FormControl('', Validators.compose([Validators.required])),
                      local_agent_name: new FormControl('', Validators.compose([Validators.required])),
                      trader_aslocal_agent: new FormControl('', Validators.compose([])),
                      product_type_id: new FormControl('', Validators.compose([Validators.required])),
                      reg_product_id: new FormControl('', Validators.compose([])),
                      tra_product_id: new FormControl('', Validators.compose([])),
                      instructions_of_use: new FormControl('', Validators.compose([])),
                      product_category_id: new FormControl('', Validators.compose([Validators.required])),
                      intended_use: new FormControl('', Validators.compose([Validators.required])),
                      productrisk_category_id: new FormControl('', Validators.compose([])),
                      prodclass_category_id: new FormControl(this.prodclass_category_id, Validators.compose([Validators.required])),

            });

      }
      else{
          this.productGeneraldetailsfrm = new FormGroup({
              section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              common_name_id: new FormControl('', Validators.compose([])),
              classification_id: new FormControl('', Validators.compose([Validators.required])),
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              assessment_procedure_id: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([Validators.required])),
              atc_code_id: new FormControl('', Validators.compose([])),
              atc_code_description: new FormControl('', Validators.compose([])),
              contraindication: new FormControl('', Validators.compose([Validators.required])),
              shelflifeafteropeningduration_desc: new FormControl('', Validators.compose([Validators.required])),
              physical_description: new FormControl('', Validators.compose([Validators.required])),
              distribution_category_id: new FormControl('', Validators.compose([Validators.required])),
              storage_condition_id: new FormControl('', Validators.compose([Validators.required])),
              dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
              route_of_administration_id: new FormControl('', Validators.compose([Validators.required])),
              shelf_life: new FormControl(this.product_id, Validators.compose([])),
              shelf_lifeafter_opening: new FormControl(this.product_id, Validators.compose([])),
              product_category_id: new FormControl('', Validators.compose([Validators.required])),
              product_id: new FormControl(this.product_id, Validators.compose([])),
              shelflifeduration_desc:new FormControl('', Validators.compose([])),
              local_agent_id: new FormControl('', Validators.compose([Validators.required])),
              local_agent_name: new FormControl('', Validators.compose([Validators.required])),
              trader_aslocal_agent: new FormControl('', Validators.compose([])),
              product_type_id: new FormControl('', Validators.compose([Validators.required])),
              atc_code: new FormControl('', Validators.compose([])),
              reg_product_id: new FormControl('', Validators.compose([])),
              tra_product_id: new FormControl('', Validators.compose([])),
              instructions_of_use: new FormControl('', Validators.compose([])),
              prodclass_category_id: new FormControl(this.prodclass_category_id, Validators.compose([Validators.required])),
            
            });
      }
    }
    else{
      this.productGeneraldetailsfrm = new FormGroup({
              section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
              sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
              common_name_id: new FormControl('', Validators.compose([Validators.required])),
              brand_name: new FormControl('', Validators.compose([Validators.required])),
              zone_id: new FormControl('', Validators.compose([Validators.required])),
              intended_enduser_id: new FormControl('', Validators.compose([Validators.required])),
              intended_use: new FormControl('', Validators.compose([Validators.required])),
              physical_description: new FormControl('', Validators.compose([Validators.required])),
              gmdn_code: new FormControl('', Validators.compose([])),
              classification_id: new FormControl('', Validators.compose([Validators.required])),
              gmdn_term: new FormControl('', Validators.compose([])),
              gmdn_category: new FormControl('', Validators.compose([])),
              device_type_id: new FormControl('', Validators.compose([])),
              shelf_life: new FormControl('', Validators.compose([])),
              shelflifeduration_desc:new FormControl('', Validators.compose([])),
              product_id: new FormControl('', Validators.compose([])),
              local_agent_id: new FormControl('', Validators.compose([Validators.required])),
              local_agent_name: new FormControl('', Validators.compose([Validators.required])),
              trader_aslocal_agent: new FormControl('', Validators.compose([])),
              product_type_id: new FormControl('', Validators.compose([Validators.required])),
              reg_product_id: new FormControl('', Validators.compose([])),
              tra_product_id: new FormControl('', Validators.compose([])),
              medical_systemmodel_series: new FormControl('', Validators.compose([])),//Validators.required
              medical_family: new FormControl('', Validators.compose([])),//Validators.required
              prodclass_category_id: new FormControl(this.prodclass_category_id, Validators.compose([])),//Validators.required
              reason_for_classification_id: new FormControl('', Validators.compose([])),//Validators.required
              has_medical_family: new FormControl('', Validators.compose([Validators.required])),
              has_medical_systemmodel_series: new FormControl('', Validators.compose([Validators.required])),
              
              has_reagents_accessories: new FormControl('', Validators.compose([Validators.required])),
              reagents_accessories: new FormControl('', Validators.compose([]))
              
            });
            
    }
    this.productIngredientsdetailsfrm = new FormGroup({
      proportion: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      ingredientssi_unit_id: new FormControl('', Validators.compose([Validators.required])),
      inclusion_reason_id: new FormControl('', Validators.compose([Validators.required])),
      ingredient_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),

    });

    this.productPackagingdetailsfrm = new FormGroup({
      container_id: new FormControl('', Validators.compose([Validators.required])),
      container_material_id: new FormControl('', Validators.compose([Validators.required])),
      retail_packaging_size: new FormControl('', Validators.compose([Validators.required])),
      container_type_id: new FormControl('', Validators.compose([Validators.required])),

      packaging_units_id: new FormControl('', Validators.compose([Validators.required])),
      seal_type_id: new FormControl('', Validators.compose([Validators.required])),
      closure_material_id: new FormControl('', Validators.compose([Validators.required])),

      id: new FormControl('', Validators.compose([])),

    });
    //definaation 
    
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),

      district_id: new FormControl('', Validators.compose([])),

      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))
    });

    this.manufacturingSiteFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),

      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),
      tin_no: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),

    });

    this.productmanufacturingSiteFrm = new FormGroup({
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_id: new FormControl('', Validators.compose([Validators.required])),
      man_site_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_role_id: new FormControl('', Validators.compose([Validators.required])),
      
    });
    
    this.prodgmpAddinspectionFrm = new FormGroup({
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      gmp_productline_id: new FormControl('', Validators.compose([Validators.required])),
      reg_site_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_id: new FormControl('', Validators.compose([Validators.required]))

    });
    this.productapimanufacturingSiteFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([Validators.required])),

      active_ingredient_id: new FormControl('', Validators.compose([Validators.required])),

    });
    this.autoLoadedParameters(this.section_id)
   }

  ngOnInit() {
  }
  autoLoadedParameters(section_id) {
    this.onLoadSections();
    this.onLoadZones();
    this.onLoadconfirmDataParm();
    this.onLoadAssessmentProcedure();
    this.onLoadCommonNames(section_id);
    this.onLoadgmdnCategoryData(section_id);
    this.onLoadClassifications(section_id);
    this.onLoadriskCategoriesData(section_id);
    this.onLoadSiUnits(section_id);
    this.onLoadpackagingUnitsData(section_id);

    this.onLoadmethodOfUseData(section_id);
    this.onLoadProductForm(section_id);
    this.onLoadstorageCondition(section_id);
    this.onLoadproductCategoryData(section_id);
    this.onLoaddistributionCategory(section_id);
    this.onLoadingredientsData(section_id);
    this.onLoadspecificationData(section_id);
    this.onLoadreasonForInclusionData(section_id);
   
    this.onLoadintendedUseData(section_id);

    this.onLoadclosureMaterialData(section_id)
    this.onLoadsealTypeData(section_id);
    this.onLoadrouteOfAdministration(section_id);
    this.onLoaddosageForms(section_id);
  
    this.onLoadProductType();
    this.onLoaddevicesTypeData(section_id)

    this.onLoadintendedEndUserData(section_id);
    this.onLoadfastTrackOptionsData();
    this.onLoadpayingCurrencyData();
  } onLoadAssessmentProcedure() {
    var data = {
      table_name: 'par_assessment_procedures',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.assessmentProcedureData = data;
        });
  }  onLoadintendedEndUserData(section_id) {
    var data = {
      table_name: 'par_intended_enduser',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.intendedEndUserData = data;
        });
  } onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }onLoadpayingCurrencyData() {
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
  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadProductsIngredients(product_id);
    this.OnLoadProductsPackagingMaterials(product_id);
    this.OnLoadproductManufacturersData(product_id);
    this.OnLoadapiManufacturersData(product_id)
   
    this.OnLoadProductsGMPInspectionDetails(product_id)

  } OnLoadProductsIngredients(product_id) {

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
  onApplicationPreviewDetails(){
      this.isPreviewProductInformation = true;
      this.appService.getProductApplicationInformation(this.application_code,'getProductApplicationInformation')
      .subscribe(
        data => {
          this.processData = data.data;
          this.spinner.hide();
          if(data.success){
              this.productGeneraldetailsfrm.patchValue(this.processData);
              this.autoLoadProductsOtherDetails(this.processData.product_id) 
          
          }
          else{
            this.toastr.error(this.processData.message, 'Alert!');

          }
        
        });
  }
  //parameters 
  
  onLoadclosureMaterialData(section_id) {
    var data = {
      table_name: 'par_closure_materials',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.closureMaterialData = data;
        });
  }
  onLoadsealTypeData(section_id) {
    var data = {
      table_name: 'par_seal_types',
      section_id: section_id
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
      table_name: 'par_distribution_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCategoryData = data;
        });
  }
  onLoadstorageCondition(section_id) {
    var data = {
      table_name: 'par_storage_conditions',
      section_id: section_id
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
      table_name: 'par_dosage_forms',
      section_id: section_id
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
      table_name: 'par_inclusions_reasons',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForInclusionData = data;
        });
  }

  
  onLoadintendedUseData(section_id) {
    var data = {
      table_name: 'par_intendedend_use',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.intendedUseData = data;
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

  onLoadmethodOfUseData(section_id) {
    var data = {
      table_name: 'par_methodof_use',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.methodOfUseData = data;
        });
  }
 
  onLoadrouteOfAdministration(section_id) {
    var data = {
      table_name: 'par_route_of_administration',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdministrationData = data;
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
    var data = {
      table_name: 'par_classifications',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
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
      table_name: 'par_product_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeData = data;
        });
  }
}