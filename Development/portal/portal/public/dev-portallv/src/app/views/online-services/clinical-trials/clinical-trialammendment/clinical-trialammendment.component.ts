import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';


import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-clinical-trialammendment',
  templateUrl: './clinical-trialammendment.component.html',
  styleUrls: ['./clinical-trialammendment.component.css']
})
export class ClinicalTrialammendmentComponent extends SharedClinicaltrialComponent implements OnInit {
  sub_module_id: number = 13;

  isReadOnly:boolean= true;
  
  isRegisteredClinicalTrialApplicatioWinn:boolean= false;
  reg_clinical_trial_id:number;
  dtRegClinicalTrialApplicationData:any;
  clinicaltrialGeneraldetailsfrm:FormGroup;
  clinicaltrailVariationRequestsFrm:FormGroup;
  isClinicalVariationsDetailsWin:boolean= false;

  clinicaltrailVariationRequestsData:any;
  typeofVariationData:any;
  variationCategoriesData:any;
  
  ngOnInit() {
    this.is_readonly = true;
    this.application_details = this.appService.getApplicationDetail();
    if (!this.application_details) {
      this.router.navigate(['./../online-services/clinicaltrial-variationdashboard']);
      return
    }
    this.clinicaltrailVariationRequestsFrm = new FormGroup({
      variation_type_id: new FormControl('', Validators.compose([Validators.required])),
      variation_category_id: new FormControl('', Validators.compose([Validators.required])),
      present_details: new FormControl('', Validators.compose([])),
      proposed_variation: new FormControl('', Validators.compose([Validators.required])),
      variation_background_information: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });

    this.onLoadtypeofVariationData();

    this.clinicaltrialGeneraldetailsfrm.patchValue(this.application_details);
    this.onLoadclinicaltrailVariationData();
  } onClinicalDashboard() {
    this.app_route = ['./online-services/clinicaltrial-variationdashboard'];

    this.router.navigate(this.app_route);
  }
  onRegisteredClinicalTrialApplications(){
    if(this.application_code < 1){
     this.toastr.error('Clinical Trial Application as already been saved, search on the clinical Trail Applications Dasboard to proceed.', 'Alert');
      return;
    }
    this.appService.getClinicalTrialOtherdetails({ table_name: 'study_sites' }, 'getClinicalTrialsList')
    .subscribe(
      data => {
        if (data.success) {
          this.dtRegClinicalTrialApplicationData = data.data;
          this.isRegisteredClinicalTrialApplicatioWinn = true;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  
  onLoadtypeofVariationData() {
    var data = {
      table_name: 'par_typeof_variations',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.typeofVariationData = data;
        });

  }
  onLoadvariationCategoriesData(variation_type_id) {
    var data = {
      table_name: 'par_variations_categories',
      variation_type_id:variation_type_id,
      sub_module_id:this.sub_module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.variationCategoriesData = data;
        });

  }
  onTypeofVariationSelect($event){
    this.onLoadvariationCategoriesData($event.selectedItem.id);
  }
  
  funSelectRegisteredClinicalApp(data){
   
    this.clinicaltrialGeneraldetailsfrm.patchValue(data.data);
    this.isRegisteredClinicalTrialApplicatioWinn = false;
  }
  //the save details
  //
  
  onSaveAltClincialTrialApplication() {
    if(this.application_id >0){
      this.wizard.model.navigationMode.goToStep(1);
    }
    if (this.clinicaltrialGeneraldetailsfrm.invalid) {
     
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialGeneraldetailsfrm.value, this.tracking_no, 'clinicaltrials/saveAltClinicalTrialApplication')
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
            //reload the stores 
            this.onLoadClinicalSiteDetails(this.application_id);
            this.onLoadclinicaltrailinvestigatorsData();
           this.onLoadclinicaltrailIMPProdData();
           this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onClinicalVariationsDetailsToolbar(e) {
    this.functDataGridToolbar(e, this.funcClinicalVariationsDetails, 'Add Clinical trial Variation requests');
  }
  funcClinicalVariationsDetails(){
    this.isClinicalVariationsDetailsWin = true;
    this.clinicaltrailVariationRequestsFrm.reset();
  }
  funcEditVariationRequestDetails(data) {

    this.clinicaltrailVariationRequestsFrm.patchValue(data.data);
    //load the personnel qualifiations
    this.isClinicalVariationsDetailsWin = true;

  }
  
  onsaveclinicaltrailVariationRequests() {
    this.spinner.show();
    let table_name;
        table_name = 'wb_application_variationsdata';

    this.appService.onsaveClinicaltrialAppCodeOtherDetails(this.application_code, this.clinicaltrailVariationRequestsFrm.value, 'onsaveclinicaltrailVariationRequests')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isClinicalVariationsDetailsWin = false;
            //reload
            this.onLoadclinicaltrailVariationData();
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/clinicaltrial-variationdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

