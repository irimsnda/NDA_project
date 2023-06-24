import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
import { WizardComponent } from 'ng2-archwizard';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-addproduct-applicationdetails',
  templateUrl: './addproduct-applicationdetails.component.html',
  styleUrls: ['./addproduct-applicationdetails.component.css']
})
export class AddproductApplicationdetailsComponent extends SharedProductregistrationclassComponent implements OnInit, AfterViewInit {
 
  @ViewChild(WizardComponent)
  wizardPanel: WizardComponent;
  
  @Input() group_application_code: number;

  @Input() productGeneraldetailsfrm: FormGroup;
  @Input() assessmentProcedureData: any;
  @Input() classificationData: any;
  @Input() commonNamesData: any;
  @Input() siUnitsData: any;
  @Input() distributionCategoryData: any;
  @Input() storageConditionData: any;
  @Input() dosageFormsData: any;
  @Input() routeOfAdministrationData: any;
  @Input() productCategoryData: any;
  @Input() durationDescData: any;
  @Input() targetSpeciesData: any;
  @Input() productTypeData: any;
  @Input() confirmDataParam: any;
  @Input() confirmDataParamAll: any;
  @Input() zonesData: any;
  @Input() section_id: number;
  @Input() atc_code_id: number;

  @Input() productFormData: any;
  @Input() reasonForClassificationData:any;
  @Input() gmdnCategoryData: any;
  @Input() hasAssessmentProcedure: any;
  @Input() hasOtherDistributionCategory: any;
 
  @Input() methodOfUseData: any;
  @Input() intendedEndUserData: any;
  @Input() productSubCategoryData: any;
  @Input() productSpecialCategoryData: any;
  @Input() devicesTypeData: any;
  @Input() assessmentTypesData: any;

  @Input() sub_module_id: number;
  @Input() product_id: number;
  @Input() application_code: number;

  @Input() isReadOnly: boolean;
  @Input() reg_product_id: number;
  @Input() tra_product_id: number;
  @Input() isReadOnlyTraderasLtr: boolean;
  @Input() prodclass_category_id: number;
  @Input() fastTrackOptionsData: number;
  @Input() payingCurrencyData: number;
 
  @Input() status_id: number;
  @Input() module_id: number;

  @Input() drugsingredientsData: any;
   @Input() drugsPackagingData: any;
   @Input() productManufacturersData: any;
   @Input() apiManufacturersData: any;
   @Input() productgmpInspectionData: any;
   @Input() tradergmpInspectionData: any;
   @Input() manufacturersSiteData: any;
   @Input() tracking_no: string;
  
   
    
   @Input() productIngredientsdetailsfrm: FormGroup;
   @Input() productNutrientsdetailsfrm: FormGroup;
  
   @Input() productapimanufacturingSiteFrm: FormGroup;
  
   @Input() productmanufacturingSiteFrm: FormGroup;
   @Input() product_type_id: number;

  
   @Input()  manufacturingSiteFrm: FormGroup;
   @Input() prodgmpAddinspectionFrm: FormGroup;
   
   
   @Input() productPackagingdetailsfrm: FormGroup;
   @Input() gmpProductLineData: any;
   @Input() productIngredientsModal: boolean;

   @Input() product_origin_id: number;

   @Input() tabaccoFlavourData: any;

  productapp_details: any;
  terms_conditions: any;
  prodProductTypeData:any;

  prodClassCategoriesData:any;
  appsubmissionTypesData:any;
  processData:any;

  isInitiateAddProductGroupAppWin:boolean=false;


  ngOnInit() {
    this.onLoadGuidelines(this.sub_module_id, this.section_id);
    this.productapp_details = this.appService.getProductApplicationDetail();
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/newprodreg-dashboard']);
      return;
    }
    this.productAppSubmissionDetailsfrm.patchValue(this.productapp_details);
    
    if (this.is_local == 1) {
      this.isReadOnlyTraderasLtr = true;
      this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id,trader_aslocal_agent: 1 })
      //deiable field
    }
    else { 
      this.isReadOnlyTraderasLtr = false;
      this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 2 })
    }

    this.productapp_details = {}; //drugs
    this.drugsingredientsData = {};
    this.drugsPackagingData = {};
    this.productManufacturersData = {};
    this.apiManufacturersData = {};
    this.onApplicationSubmissionFrm.get('is_fast_track').setValue(2);//medical devices
    this.autoLoadedParameters(this.section_id);
    this.onLoadappsubmissionTypesData();
    this.onLoadprodClassCategoriesData();
    this.onLoadSections();
    this.onLoadprodProductTypeData();
    this.onLoadProductApplciations();

  }
  ngAfterViewInit(){
    this.wizardPanel.model.navigationMode.goToStep(0);
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
  } onProductDashboard() {
    //check for unsaved changes 
   this.router.navigate(['../online-services/newprodreg-dashboard']);

}
  //drugs
  onMoveNextWizardDrugs(nextStep) {
    //validate details 
    if (nextStep == 1+this.initWizardPanel) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 2+this.initWizardPanel) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 3+this.initWizardPanel) {
      this.spinner.show();
      this.appService.onValidateProductOtherdetails(this.product_id,this.section_id)
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
            this.toastr.error('Error Occurred', 'Alert');
            this.spinner.hide();
          });
     
      
    }else{
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
  }
  onProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/newprodreg-dashboard'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_product_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    this.isApplicationSubmitwin = false;

  }

  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodProductTypeData = data;
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
  onProductClassificationChange($event) {
    if($event.selectedItem){
      let prodclass_category =$event.selectedItem;
      
      this.productAppSubmissionDetailsfrm.get('section_id').setValue(prodclass_category.section_id);

    }
    
  } 
  onSaveAddNewProductApplication() {

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
  onLoadprodClassCategoriesData() {
    var data = {
      table_name: 'par_prodclass_categories',
      section_id:this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodClassCategoriesData = data;
        });

  }
   onLoadappsubmissionTypesData() {
    var data = {
      table_name: 'par_appsubmission_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.appsubmissionTypesData = data;
        });
  }
  ongroupedProdsesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'New Product Application(add)',
        type: 'default',
        icon: 'fa fa-plus',
        disabled: this.tbisReadOnly,
        onClick: this.initiateAddProductGroupApplication.bind(this)

      }
    },  {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onloadadingProductApplications.bind(this)
        }
      });
  }
  onloadadingProductApplications(){
    this.onLoadProductApplciations();
  }

  initiateAddProductGroupApplication(){
    this.application_code = 0;
    this.product_id = 0;
    
    this.productGeneraldetailsfrm.reset();
    this.productGeneraldetailsfrm.patchValue(this.productapp_details);
    this.productGeneraldetailsfrm.get('sub_module_id').setValue(7);
    this.productGeneraldetailsfrm.get('section_id').setValue(this.section_id);
    this.productGeneraldetailsfrm.get('prodclass_category_id').setValue(this.prodclass_category_id);

    if (this.is_local == 1) {
      this.isReadOnlyTraderasLtr = true;
      this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id,trader_aslocal_agent: 1 })
      //deiable field
    }
    else { 
      this.isReadOnlyTraderasLtr = false;
      this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 2 })
    }
    
    this.wizard.model.navigationMode.goToStep(0);

    this.isInitiateAddProductGroupAppWin = true;

  }
  
  onFUncCloseGroupApplicatinWindow(){
    this.isInitiateAddProductGroupAppWin = false;

}

  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadProductsIngredients(product_id);
    this.OnLoadProductsPackagingMaterials(product_id);
    this.OnLoadproductManufacturersData(product_id);
    this.OnLoadapiManufacturersData(product_id)
    this.OnLoadProductsGMPInspectionDetails(product_id)

  }
  
 
}
