import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trial-details',
  templateUrl: './trial-details.component.html',
  styleUrls: ['./trial-details.component.css']
})
export class TrialDetailsComponent extends CtrregistrySharedclassComponent  {
  @Input() ctrRegistrydetailsfrm: FormGroup;
  @Input() application_id: number;
  @Input() countries: any;
  @Input() districts: any;
  @Input() regions: any;
  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  ngOnInit() {
    
    this.onLoadclinicalTrialDesignData();
    this.onLoadclinicalStudyPhaseData();
    this.onLoaddiseaseConditionsData();
    this.onLoadclinicalStudyPurposeData();
    this.onLoadrecruitMentStatusData();
    this.onLoadConfirmationsData() ;
    this.onLoadCountries()
  }
  
  onClinicalTrialInvestigator() {
    this.sponsor_investigatortitle = 'Clinical trial Principal Invetigator';
    this.checkifsponsor = false;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onsaveInvestigator() {
    this.spinner.show();
    let table_name;
    table_name = 'clinical_trial_personnel';

    let name = this.sponsorInvestigatorFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.sponsorInvestigatorFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.issponsorInvestigatorAddWinVisible = false;
            
          this.isSponsorInvestigatorSearchWinVisible = true;
            this.onClinicalTrialInvestigator();
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  funcSelectInvestigator(data) {
      this.ctrRegistrydetailsfrm.get('investigator_id').setValue(data.data.id);
      this.ctrRegistrydetailsfrm.get('principal_investigator').setValue(data.data.name);
      this.isSponsorInvestigatorSearchWinVisible = false;

  }
onIsREgisteredReceSelect($event){
   
    if( $event.selectedItem.id == 1){
        this.is_app_registered = true;
    }
    else{
      this.is_app_registered = false;
    }
}
onValidateClinicalTrialApp($event){
    
    this.spinner.show();
    let ctrregistered_tracking_no = this.ctrRegistrydetailsfrm.get('ctrregistered_tracking_no').value;

    this.appService.onSavePermitApplication('', this.ctrRegistrydetailsfrm.value, '', 'clinicaltrials/onValidateClinicalTrialApp')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           // record
           this.ctrRegistrydetailsfrm.get('study_title').setValue(this.app_resp.record.study_title);
            this.ctrRegistrydetailsfrm.get('reg_clinical_trial_id').setValue(this.app_resp.record.reg_clinical_trial_id);
           this.ctrRegistrydetailsfrm.get('version_no').setValue(this.app_resp.record.version_no);
this.ctrRegistrydetailsfrm.get('phase_id').setValue(this.app_resp.record.phase_id);

            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
}
}
