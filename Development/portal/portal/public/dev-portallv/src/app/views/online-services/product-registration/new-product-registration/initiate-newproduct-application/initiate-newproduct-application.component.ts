import { Component, OnInit} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';

@Component({
  selector: 'app-initiate-newproduct-application',
  templateUrl: './initiate-newproduct-application.component.html',
  styleUrls: ['./initiate-newproduct-application.component.css']
})
export class InitiateNewproductApplicationComponent extends SharedProductregistrationclassComponent implements OnInit {
  productGeneraldetailsfrm: FormGroup;
  productNutrientsdetailsfrm:FormGroup;

  productapp_details: any;
  drugsingredientsData:any;
  drugsPackagingData:any;
  productManufacturersData:any;
  apiManufacturersData:any;
  terms_conditions: any;

  ngOnInit() {
    this.onLoadGuidelines(this.sub_module_id, this.section_id);
    this.productapp_details = this.appService.getProductApplicationDetail();
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/newprodreg-dashboard']);
      return;
    }
      if (this.productapp_details.product_id != '') {
      //reload the other stores
      this.productGeneraldetailsfrm.patchValue(this.productapp_details);

    }
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

  } onProductDashboard() {
    //check for unsaved changes 
   this.router.navigate(['../online-services/newprodreg-dashboard']);

}
}
