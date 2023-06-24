import { Component, OnInit } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../ctrregistry-sharedclass/ctrregistry-sharedclass.component';

@Component({
  selector: 'app-clinical-trialpreview',
  templateUrl: './clinical-trialpreview.component.html',
  styleUrls: ['./clinical-trialpreview.component.css']
})
export class ClinicalTrialpreviewComponent extends CtrregistrySharedclassComponent {

 
  ngOnInit() {
    this.is_readonly = true;
  
    if(window.innerWidth < 800){
      this.navBarLocation='left';
      this.navBarLayout='large-empty-symbols';
    }
    
    this.application_details = this.publicService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    if(this.application_details){
      this.funcloadClinicalTrialRegData(this.application_details[0].application_code,this.application_details[0].applicant_id);
    }
    else{
      this.app_route = ['./clinicaltrial-registry/clinicaltrialreg-preview'];
      this.router.navigate(this.app_route);
    }
  }
  onToolbarPreparing(e){  
    e.toolbarOptions.visible = false;  
}  
  funcloadClinicalTrialRegData(application_code,applicant_id){
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalRegistryAppData',{application_code:application_code, applicant_id:applicant_id})
    .subscribe(
      resp_data => {
        this.spinner.hide();
        if (resp_data.success) {
          resp_data.data.is_readonly = true;
          this.application_details = resp_data.data;
              
          this.ctrRegistrydetailsfrm.patchValue(this.application_details.trial_details);
          this.application_code = this.application_details.trial_details.application_code;
          this.tracking_no = this.application_details.trial_details.tracking_no;
          this.application_id = this.application_details.trial_details.id;
          if(this.application_details.clinicaltrial_secondaryids){
            this.ctrSecondaryDetailsfrm.patchValue(this.application_details.clinicaltrial_secondaryids);
          }
          if(this.application_details.eligibilitycriteria){
              this.ctrEligibilityCriteriaFrm.patchValue(this.application_details.eligibilitycriteria);
          }
        if(this.application_details.clinicaltrial_studydesign){
              this.ctrStudyDesingdetailsfrm.patchValue(this.application_details.clinicaltrial_studydesign);
        
          }
          if(this.application_details.fundingsource){
            this.fundingSourceFrm.patchValue(this.application_details.fundingsource);
      
        }
        if(this.application_details.collaborators){
          this.collaboratorsFrm.patchValue(this.application_details.collaborators);
    
      }
        if(this.application_details.OutcomesData){
          this.OutcomesData =  this.application_details.OutcomesData;
          }
          if(this.application_details.clinicaltrailSponsorsData){
            this.clinicaltrailSponsorsData =  this.application_details.clinicaltrailSponsorsData;
          }
          if(this.application_details.ethicsApprovalData){
            this.ethicsApprovalData =  this.application_details.ethicsApprovalData;
        }
        if(this.application_details.recruitmentCentersData){
          this.recruitmentCentersData =  this.application_details.recruitmentCentersData;
      }
            if(this.application_details.clinicalTrialIntData){
              this.clinicalTrialIntData =  this.application_details.clinicalTrialIntData;
          }
          if(this.application_details.contactPersonData){
            this.contactPersonData =  this.application_details.contactPersonData;
          }

        
         
          
        }
        else {
          this.toastr.error(resp_data.message, 'Alert!');

        }
        this.spinner.hide();
      });
  }

}
