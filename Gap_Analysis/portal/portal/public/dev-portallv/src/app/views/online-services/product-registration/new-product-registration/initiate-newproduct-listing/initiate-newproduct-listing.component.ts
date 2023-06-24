import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';

@Component({
  selector: 'app-initiate-newproduct-listing',
  templateUrl: './initiate-newproduct-listing.component.html',
  styleUrls: ['./initiate-newproduct-listing.component.css']
})
export class InitiateNewproductListingComponent extends SharedProductregistrationclassComponent implements OnInit {
  productGeneraldetailsfrm: FormGroup;
  productNutrientsdetailsfrm:FormGroup;
  productapp_details: any;
  drugsingredientsData:any;
  drugsPackagingData:any;
  productManufacturersData:any;

  apiManufacturersData:any;
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

  }onLoadGuidelines(sub_module_id, section_id) {
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
  funcEditgroupedProductApplicationData(data) {
    this.application_code = 0;
    this.product_id = 0;
        let application_data = data.data;
        this.spinner.show();
        this.appService.getProductApplicationInformation(application_data.application_code,'getGroupedProductApplicationInformation')
        .subscribe(
          data => {
            this.processData = data.data;
            this.spinner.hide();
            if(data.success){
              this.process_title = this.processData.process_title;
              this.application_code = this.processData.application_code;
              this.product_id = this.processData.product_id;
              this.productGeneraldetailsfrm.reset();
              this.productGeneraldetailsfrm.patchValue(this.processData);

              this.tracking_no = this.processData.tracking_no;
              //
              this.autoLoadProductsOtherDetails(this.product_id);
              //end 
              this.isInitiateAddProductGroupAppWin = true;
            }
            else{
              this.toastr.error(this.processData.message, 'Alert!');
            }
          
          });

  }

  autoLoadProductsOtherDetails(product_id) {
    this.OnLoadProductsIngredients(product_id);
    this.OnLoadProductsPackagingMaterials(product_id);
    this.OnLoadproductManufacturersData(product_id);
    this.OnLoadapiManufacturersData(product_id)
    this.OnLoadProductsGMPInspectionDetails(product_id)

  }
  funcDeletegroupedProductApplicationData(data) {
    //func_delete records 1000 
    let record_id = data.data.id;
    let application_code = data.data.application_code;
    let table_name = 'wb_product_applications';


    this.funcDeleteApplicationDetailhelper(application_code, table_name,'Application details');
  
  }

  funcDeleteApplicationDetailhelper(application_code, table_name,title) {
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
            this.utilityService.onApplicationDelete(application_code, table_name)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    this.onloadadingProductApplications();
                    this.autoLoadProductsOtherDetails(this.product_id);

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

  onGroupedProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/newprodreg-dashboard'];
    this.utilityService.onGroupedPermitsApplicationSubmit(this.viewRef, this.group_application_code, this.tracking_no, 'wb_appsubmissions_typedetails', this.app_route,this.onApplicationSubmissionFrm.value);
    this.isApplicationSubmitwin = false;
  
  }
}
