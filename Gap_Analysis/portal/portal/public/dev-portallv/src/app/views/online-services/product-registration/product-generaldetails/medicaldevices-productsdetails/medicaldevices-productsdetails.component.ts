
import { Component,  Input, ViewContainerRef, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
@Component({
  selector: 'app-medicaldevices-productsdetails',
  templateUrl: './medicaldevices-productsdetails.component.html',
  styleUrls: ['./medicaldevices-productsdetails.component.css']
})
export class MedicaldevicesProductsdetailsComponent  extends SharedProductregistrationclassComponent  implements OnInit {

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
  @Input() productTypeData: any;
  @Input() confirmDataParam: any;

  @Input() productFormData: any;
  @Input() methodOfUseData: any;
  @Input() intendedEndUserData: any;
  @Input() productSubCategoryData: any;
  @Input() productSpecialCategoryData: any;
  @Input() devicesTypeData: any;

  @Input() zonesData: any;
  @Input() section_id: number = 4;
  @Input() atc_code_id: number;

  @Input() sub_module_id: number;
  @Input() product_id: number;
  @Input() application_code: number;
  @Input() gmdnCategoryData: any;
  
  @Input() isReadOnly: boolean;
  @Input() reg_product_id: number;
  @Input() tra_product_id: number;
  @Input() isReadOnlyTraderasLtr: boolean;
  @Input() assessmentTypesData: any;

  @Input() hasAssessmentProcedure: boolean;

  @Input() hasOtherDistributionCategory: boolean;
  
  @Input() prodclass_category_id: number;
  country_id:number;
  trader_name: string;
 // is_local:boolean;
 
  registrant_option_id:number;
  trader_id:number;
  registrant_optionDisabled:boolean;
  traderAccountsDetailsData:any ={};
 // is_local_agent:boolean;
  trader_title:string;
  isRegistrantDetailsWinshow:boolean = false;
  @Input() fastTrackOptionsData: number;
  @Input() payingCurrencyData: number;
  @Output() productTypeEvent = new EventEmitter();
  gmdnCodeData:any;
  reasonForClassificationData:any;
  isHasModelChange:boolean = false;
  isHasMedicalFamily:boolean = false;
  isonHasReagents_accessories:boolean = false;

 
  ngOnInit() {
    this.onLoadGmdnCodeData(this.section_id);
   
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;
    this.is_local = user_details.is_local;
    if(!this.product_id){
        this.productGeneraldetailsfrm.get('zone_id').setValue(2);

        this.productGeneraldetailsfrm.get('shelflifeduration_desc').setValue(1);
        
    }
    this.onLoadSections();
    this.onLoadManufacrunginCountries();
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
  }
  onTraderasLocalAgentChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasLtr = true;
        this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id });
    }else{
      this.isReadOnlyTraderasLtr = false;

      this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 2 })
    }
   

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
   // this.spinner.show();

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
  } onProductTypeSelection($event){

    this.productTypeEvent.emit($event.selectedItem.id);

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
 onLoadGmdnCodeData(section_id) {
  var data = {
    table_name: 'par_gmdn_codes',
    section_id: section_id
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.gmdnCodeData = data;
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

ongmdnCodeDataSelect($event) {

  this.productGeneraldetailsfrm.get('gmdn_term').setValue($event.selectedItem.description);
  
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
onclassificationDevTypeDataSelect($event) {
  let device_type_id =  this.productGeneraldetailsfrm.get('device_type_id').value;
  let classification_id =  this.productGeneraldetailsfrm.get('classification_id').value;
  this.onLoadreasonForClassificationData(device_type_id,classification_id);
}

}
