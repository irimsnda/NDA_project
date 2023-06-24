
import { Component, OnInit} from '@angular/core';

import { SharedClinicaltrialComponent } from '../shared-clinicaltrial/shared-clinicaltrial.component';

@Component({
  selector: 'app-clinicaltrial-progressreporting',
  templateUrl: './clinicaltrial-progressreporting.component.html',
  styleUrls: ['./clinicaltrial-progressreporting.component.css']
})
export class ClinicaltrialProgressreportingComponent  extends 
SharedClinicaltrialComponent implements OnInit {
 
  appmodule_id:number;
  sub_module_id = 23;
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/clinicaltrial-progressrptdashboard']);
      return
    }
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
   
    this.clinicaltrialReportingdetailsfrm.patchValue(this.application_details);

  }

  onSaveClincialTrialApplication() {

    if (this.clinicaltrialReportingdetailsfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.clinicaltrialReportingdetailsfrm.value, this.tracking_no, 'clinicaltrials/saveCtrProgressReportingApplication')
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
  }  onClinicalDashboard() {
    this.app_route = ['./online-services/clinicaltrial-progressrptdashboard'];

    this.router.navigate(this.app_route);
  }onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/clinicaltrial-progressrptdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}



