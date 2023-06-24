import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

import DataSource from 'devextreme/data/data_source';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { ToastrService } from 'ngx-toastr';
import { PublicService } from 'src/app/services/public/public.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preview-assessmentmedicines',
  templateUrl: './preview-assessmentmedicines.component.html',
  styleUrls: ['./preview-assessmentmedicines.component.css']
})
export class PreviewAssessmentmedicinesComponent implements OnInit {
  isReadOnly:boolean=true;
  sub_module_id:number;
  field_hidden:boolean=false;
  reg_product_id:number;
  tra_product_id:number;
  productGeneraldetailsfrm:FormGroup;
  sectionsData: any;
  commonNamesData: any;
  ATCCodesData:any;
  classificationData: any;
  riskCategoriesData:any;
  zonesData: any;
  productData: any;
  assessmentProcedureData: any;
  prodclass_category_id:number;
  ingredientsData:any;
  confirmDataParam:any;
  dosageFormsData:any;
  routeOfAdministrationData:any;
   productFormData:any; productCategoryData:any; storageConditionData:any; 
   drugsingredientsData:any; drugsPackagingData:any; productManufacturersData:any; apiManufacturersData:any;
   distributionCategoryData:any; productTypeData:any;
   durationDescData:any;
   application_details:any;
   product_id:number;
   tracking_no:string;
   section_id:number;
   app_route:any;
   query_ref_id:number;
   module_id:number;
   status_id:number =1;
   application_code:number;
   
  constructor(public appService:ProductApplicationService, public config: ConfigurationsService,public toastr: ToastrService,public publicService: PublicService,public router: Router) { 
    this.productGeneraldetailsfrm = new FormGroup({
      section_id: new FormControl('', Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      common_name_id: new FormControl('', Validators.compose([])),
      classification_id: new FormControl('', Validators.compose([Validators.required])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      assessment_procedure_id: new FormControl('', Validators.compose([Validators.required])),
      prodassessment_countries_ids: new FormControl('', Validators.compose([Validators.required])),
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
      shelf_life: new FormControl('', Validators.compose([])),
      shelf_lifeafter_opening: new FormControl('', Validators.compose([])),
      product_category_id: new FormControl('', Validators.compose([Validators.required])),
      product_id: new FormControl('', Validators.compose([])),
      shelflifeduration_desc:new FormControl('', Validators.compose([])),
      local_agent_id: new FormControl('', Validators.compose([Validators.required])),
      local_agent_name: new FormControl('', Validators.compose([Validators.required])),
      trader_aslocal_agent: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([Validators.required])),
      atc_code: new FormControl('', Validators.compose([])),
      reg_product_id: new FormControl('', Validators.compose([])),
      tra_product_id: new FormControl('', Validators.compose([])),
      instructions_of_use: new FormControl('', Validators.compose([])),
      prodclass_category_id: new FormControl('', Validators.compose([Validators.required])),
     
    });
    this.application_details = this.publicService.getApplicationDetail();
    
    if(this.application_details){
      console.log(this.application_details);
      this.productGeneraldetailsfrm.patchValue(this.application_details);
      this.section_id = this.application_details.section_id;
      this.product_id = this.application_details.product_id;
      this.module_id = this.application_details.module_id;
      this.sub_module_id = this.application_details.sub_module_id;
      this.application_code = this.application_details.application_code;
      this.prodclass_category_id = this.application_details.prodclass_category_id;

      this.tracking_no = this.application_details.tracking_no;
      this.OnLoadProductsIngredients(this.product_id)
      this.OnLoadProductsPackagingMaterials(this.product_id)
      this.OnLoadproductManufacturersData(this.product_id)
      this.OnLoadapiManufacturersData(this.product_id);

    }
    else{
      this.app_route = ['./online-admin/admin-dashboard'];

    this.router.navigate(this.app_route);
    }
    this.autoLoadedParameters(this.section_id);
  }

  ngOnInit() {
    

  }
  onProductExportDetails(){
    
  }
  onProductAssessmentDashboard() {
    this.app_route = ['./online-admin/admin-dashboard'];

    this.router.navigate(this.app_route);
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
  autoLoadedParameters(section_id) {
   
    this.onLoadconfirmDataParm();
    this.onLoadAssessmentProcedure();
  
    this.onLoadCommonNames(section_id);
    this.onLoadClassifications(section_id);
    this.onLoadriskCategoriesData(section_id);
  
    this.onLoadProductForm(section_id);
    this.onLoadstorageCondition(section_id);
    this.onLoadproductCategoryData(section_id);
    this.onLoaddistributionCategory(section_id);
    this.onLoadingredientsData(section_id);
   
    this.onLoadrouteOfAdministration(section_id);
    this.onLoaddosageForms(section_id);
  
    this.onLoadProductType();
  
  }
  onLoadAssessmentProcedure() {
    var data = {
      table_name: 'par_assessment_procedures',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.assessmentProcedureData = data;
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
  onLoaddistributionCategory(section_id) {
    var data = {
      table_name: 'par_distribution_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCategoryData  = data;
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
          this.storageConditionData  = data;
        });
  } onLoaddurationDescData() {
    var data = {
      table_name: 'par_timespan_defination',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.durationDescData = data;
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
          this.productCategoryData  = data;
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
          this.productFormData  = data;
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
          this.dosageFormsData  = new DataSource({
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
  onClinicalDashboard() {
    this.app_route = ['./public/clinical-trials'];

    this.router.navigate(this.app_route);
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
  OnLoadProductsIngredients(product_id) {

    this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsIngredients')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.drugsingredientsData  = data.data;
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
          this.drugsPackagingData  = data.data;
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
          this.productManufacturersData  = data.data;
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
}
