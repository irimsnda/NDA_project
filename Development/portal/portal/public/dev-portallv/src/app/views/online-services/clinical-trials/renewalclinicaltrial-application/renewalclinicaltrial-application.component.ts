import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';
@Component({
  selector: 'app-renewalclinicaltrial-application',
  templateUrl: './renewalclinicaltrial-application.component.html',
  styleUrls: ['./renewalclinicaltrial-application.component.css']
})
export class RenewalclinicaltrialApplicationComponent extends 
SharedClinicaltrialComponent implements OnInit {
 
  sub_module_id: number = 11;
  appmodule_id:number;

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/renewalclinical-trialsdashboard']);
      return
    }
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    
    this.clinicaltrialGeneraldetailsfrm.patchValue(this.application_details);

  }

  onSaveClincialTrialApplication() {
    if (this.clinicaltrialGeneraldetailsfrm.invalid) {
      return;
    }
    console.log( this.clinicaltrialGeneraldetailsfrm.value);
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
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onClinicalDashboard() {
    this.app_route = ['./online-services/renewalclinical-trialsdashboard'];

    this.router.navigate(this.app_route);
  }
  onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/renewalclinical-trialsdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

