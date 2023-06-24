import { Component,  Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-drugs-productsdetails',
  templateUrl: './drugs-productsdetails.component.html',
  styleUrls: ['./drugs-productsdetails.component.css']
})
export class DrugsProductsdetailsComponent extends SharedProductregistrationclassComponent {
  hasCountriesSelection:boolean=false;
  assessment_procedure_id:number;
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
  @Output() productTypeEvent = new EventEmitter();

  country_id:number;
  trader_name: string;
 // is_local:boolean;
  registrant_option_id:number;
  trader_id:number;
  registrant_optionDisabled:boolean;
  traderAccountsDetailsData:any = {};
 // is_local_agent:boolean;
  trader_title:string;
  isRegistrantDetailsWinshow:boolean = false;
  
  ATCCodesData:any;
  ATCCodesDataAll:any;
  field_hidden:number= 1;
  product_resp:any;
  prodAssessmentCountriesDta:any;
  addproductGenericNamesModal:boolean= false;
  isonHasMaximumResidue_limit:boolean = false;
  hasReferenceMaximumResidue_limit:boolean = false;
  isHasModelChange:boolean = false;
  isHasMedicalFamily:boolean = false;
  isonHasReagents_accessories:boolean = false;
  addproductGenericNamesFrm:FormGroup;
  ngOnInit() {
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;
    this.is_local = user_details.is_local;
    if(!this.product_id){
        this.productGeneraldetailsfrm.get('zone_id').setValue(2);
    }
    this.onLoadSections();
    this.onLoadvetmedicinesRegistrationtypeData();
    this.onLoadAssessmentProcedureTypes();
    this.onLoadManufacrunginCountries();
  } onLoadvetmedicinesRegistrationtypeData() {
    var data = {
      table_name: 'par_vetmedicines_registrationtypes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.vetmedicinesRegistrationtypeData = data;
        });
  }onLoadAssessmentProcedureTypes() {
    var data = {
      table_name: 'par_assessmentprocedure_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.assessmentTypesData = data;
        });
  }
  onLoadManufacrunginCountries() {
    let data = {
      table_name: 'par_countries'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.countriesData = data;
        },
        error => {
          return false;
        });
  }onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onAddNewCommonNameDetails(){
    this.addproductGenericNamesFrm.reset();
    this.addproductGenericNamesModal = true;
    this.onLoadATCCodesDataAll();
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
  
  onAssessmentCboSelect($event) {
    
    if($event.selectedItem.id){
      this.assessment_procedure_id = $event.selectedItem.id;

      if(this.assessment_procedure_id == 2 || this.assessment_procedure_id == 5){
        this.hasCountriesSelection = false;
          this.onLoadCountriesLists(this.assessment_procedure_id) 

      }else{
        this.hasCountriesSelection = false;
        this.productGeneraldetailsfrm.get('prodassessment_countries_ids').setValue("");
      }
    }
  }
  onLoadCountriesLists(assessment_procedure_id) {

    var data = {
      table_name: 'par_assessment_procedures_countries',
      assessment_procedure_id: assessment_procedure_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.prodAssessmentCountriesDta = data;
        },
        error => {
          return false
        });
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
  onHasMaximumResidue_limit($event) {

  if($event.value == 1){
      this.isonHasMaximumResidue_limit = false;
      this.hasReferenceMaximumResidue_limit = true;
  }
  else{
    this.isonHasMaximumResidue_limit = true;
    this.hasReferenceMaximumResidue_limit = false;
  }
}
  onSelectRegistrantOptions($event) {

    this.registrant_option_id = $event.selectedItem.id;
    if (this.registrant_option_id == 1) {
      this.registrant_optionDisabled = true;

    }
    else {
      this.registrant_optionDisabled = false;
      this.productGeneraldetailsfrm.patchValue({ applicant_name: 'Search Product Registrant' })

    }

  }
  funcSearchRegistrantDetails(is_local_agent) {

    //  this.spinner.show();

        this.isRegistrantDetailsWinshow = true;
        if (is_local_agent == 1) {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Local Representative';
        }
        else {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Product Registrant';
        }
        let me = this;
        this.traderAccountsDetailsData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,is_local_agent:is_local_agent }
              };
              return me.httpClient.get(AppSettings.base_url + 'productregistration/getTraderInformationDetails',this.configData)
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
    
     // this.traderAccountsDetailsData.load();

  }
  funcSelectTraderDetails(data) {
    let record = data.data;
    this.productGeneraldetailsfrm.get('local_agent_name').setValue(record.trader_name);
    this.productGeneraldetailsfrm.get('local_agent_id').setValue(record.id);
    
    this.isRegistrantDetailsWinshow = false;
  }
  onProductTypeSelection($event){

    this.productTypeEvent.emit($event.selectedItem.id);

}
onCommonNameCboSelect($event) {
  if($event.selectedItem){
        let common_namedetails =$event.selectedItem;
        this.onLoadATCCodesData(common_namedetails.id);
  
  }
 
 // this.productGeneraldetailsfrm.get('atc_code_id').setValue(common_namedetails.atc_code_id); onAssessmentTypesCboSelect
 // this.productGeneraldetailsfrm.get('atc_code').setValue(common_namedetails.atc_code);
//  this.productGeneraldetailsfrm.get('atc_code_description').setValue(common_namedetails.atc_code_description);
}
onATCCboSelect($event) {
  let atccode_details =$event.selectedItem;
 
 this.productGeneraldetailsfrm.get('atc_code_id').setValue(atccode_details.id);
 this.productGeneraldetailsfrm.get('atc_code_description').setValue(atccode_details.description);
}

onLoadATCCodesDataAll() {
  var data = {
    table_name: 'par_atc_codes'
  };
  this.confirmDataParam = {
    params: data,
    headers: { 'Accept': 'application/json' }
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        //this.commonNamesData = data;
        this.ATCCodesDataAll = new DataSource({
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

onLoadreasonForClassificationData(device_type_id,classification_id) {
  var data = {
    table_name: 'par_product_classificationrules',
    classification_id: classification_id,
    device_type_id:device_type_id
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.reasonForClassificationData = data;
      });
}


onLoadATCCodesData(common_name_id) {
  var data = {
    table_name: 'par_atc_codes',
    common_name_id: common_name_id
  };
  this.confirmDataParam = {
    params: data,
    headers: { 'Accept': 'application/json' }
  };

  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        //this.commonNamesData = data;
        this.ATCCodesData = new DataSource({
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
onHasModelChange($event) {

  if($event.value == 1){
      this.isHasModelChange = false;
  }
  else{
    this.isHasModelChange = true;
  }
}
onHasMedicalFamily($event) {

  if($event.value == 1){
      this.isHasMedicalFamily = false;
  }
  else{
    this.isHasMedicalFamily = true;
  }
}

onHasReagents_accessories($event) {

  if($event.value == 1){
      this.isonHasReagents_accessories = false;
  }
  else{
    this.isonHasReagents_accessories = true;
  }
}

onValidateBrandNameDetails(e){
  let brand_name = this.productGeneraldetailsfrm.get('brand_name').value;
  if(this.sub_module_id == 7 && this.application_code < 1){
    this.spinner.show();
    this.appService.getProductsOtherDetails({ brand_name:brand_name }, 'onValidateBrandNameDetails')
      .subscribe(
        data => {
          if (!data.success) {
            this.productGeneraldetailsfrm.get('brand_name').setValue('');
            this.toastr.error(data.message, 'Alert');
          }
          
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  
 }
 onclassificationDevTypeDataSelect($event) {
  let device_type_id =  this.productGeneraldetailsfrm.get('device_type_id').value;
  let classification_id =  this.productGeneraldetailsfrm.get('classification_id').value;
  this.onLoadreasonForClassificationData(device_type_id,classification_id);
}

}
