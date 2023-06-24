import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService } from 'ngx-modal-dialog';
import { b } from '@angular/core/src/render3';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PublicService } from 'src/app/services/public/public.service';

@Component({
  selector: 'app-ctrregistry-sharedclass',
  templateUrl: './ctrregistry-sharedclass.component.html',
  styleUrls: ['./ctrregistry-sharedclass.component.css']
})
export class CtrregistrySharedclassComponent implements OnInit {
  
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

 @ViewChild(WizardComponent)
  public wizard: WizardComponent;
strict:any;
districts:any;
  application_details:any;
  addDiseasedetailsfrm:FormGroup;
  appmodule_id:any;
  dtClinicalTrialRegistryData:any;
  navBarLocation:string= 'top';
  navBarLayout:string ='small-empty';
  app_route:any;
  confirmationData:any;
  
  fundingSourceTypeData:any;
  ctrRegistrydetailsfrm:FormGroup;
  ctrSecondaryDetailsfrm:FormGroup;
  onApplicationSubmissionFrm:FormGroup;
  ctrEligibilityCriteriaFrm:FormGroup;
  ctrStudyDesingdetailsfrm:FormGroup;
  outcomesFrm:FormGroup;
  interventionsFrm:FormGroup;
  termscheckbox:any= false;
  clinicalTrialDesignData:any;
  clinicalStudyPhaseData:any;
  diseaseConditionsData:any;
  addDiseasedetailsMdl:boolean=false;
  clinicalStudyPurposeData:any;
  recruitMentStatusData:any;
  application_id:number;
  tracking_no:string;
  app_resp:any;
  application_code:number;loading:boolean;
  is_app_registered:boolean;
  section_id: number = 5;
  module_id: number = 7;
  sub_module_id:number=56;
  status_id:number=1;
  doc_section_id=5;
  interventionAssData:any;
   interventionAllData:any; allocationSequenceData:any;sequenceGenerationData:any;
    maskingBindingData:any;
    clinicalMaskingDetailsDta:any;
    interventionTypesData:any;
    natureofControlData:any;
    interventionsAddWin:boolean;
     clinicalTrialIntData:any;
     durationDescData:any;
     sexData:any;
     ageGroupData:any;
     sponsorNatureData:any;
     OutcomesData:any;
     sponsorsLevelData:any;
     outcomeTypesData:any;
     outcomeAddWin:boolean;
     countries:any;
      regions:any;
      recruitmentCenterFrm:FormGroup;
      recruitmentCenterAddWin:boolean=false;
      recruitmentCentersData:any;
      ethicsApprovalData:any;
      ethicsApprovalFrm:FormGroup;
      ethicsApprovalAddWin:boolean;
      fundingSourceFrm:FormGroup;

      clinicaltrailSponsorsData:any;
      sponsorDetailsWinVisible:boolean;
      clinicalSponsorsFrm:FormGroup;
      sponsorInvestigatorData:any;
    isSponsorInvestigatorSearchWinVisible:boolean;
    checkifAllInvestigatorsponsor:boolean;
    sponsorInvestigatorFrm:FormGroup;
    collaboratorsFrm:FormGroup;
    issponsorInvestigatorAddWinVisible:boolean;
    contactPersonData:any;
    contactPersonRoles:any;
    contactPersonAddWin:boolean;
    contactPersonFrm:FormGroup;
    is_readonly:boolean=false;
    reg_clinical_trial_id:number;
  constructor(public utilityService: Utilities,public router: Router, public config:ConfigurationsService,public spinner: SpinnerVisibilityService,public appService: ImportexportService,public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public modalDialogue: ModalDialogService,public viewRef: ViewContainerRef,public publicService: PublicService) { 
    this.ctrSecondaryDetailsfrm = new FormGroup({
      is_secondaryid_applicable: new FormControl('', Validators.compose([Validators.required])),
      secondary_id: new FormControl('', Validators.compose([])),
      issuing_authority: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.clinicalSponsorsFrm = new FormGroup({
      sponsor_name: new FormControl('', Validators.compose([Validators.required])),
      sponsor_id: new FormControl('', Validators.compose([Validators.required])),
      sponsor_level_id: new FormControl('', Validators.compose([Validators.required])),
      sponsor_nature_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
    this.addDiseasedetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
    this.collaboratorsFrm = new FormGroup({
      has_collaborators: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.fundingSourceFrm = new FormGroup({
      is_funding_receivied: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([])),
      
      fundsource_type_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),

      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    
    this.recruitmentCenterFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.ethicsApprovalFrm = new FormGroup({
      submission_date: new FormControl('', Validators.compose([Validators.required])),
      approval_date: new FormControl('', Validators.compose([])),
      committee_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      phone_no: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
    this.contactPersonFrm = new FormGroup({
      contactperson_role_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      phone_no: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      contact_personposition: new FormControl('', Validators.compose([])),

      
      id: new FormControl('', Validators.compose([]))
    });
    
    this.ctrStudyDesingdetailsfrm = new FormGroup({
      intervention_assignment_id: new FormControl('', Validators.compose([Validators.required])),
      intervention_allocation_id: new FormControl('', Validators.compose([Validators.required])),
      sequence_generation_id: new FormControl('', Validators.compose([])),
      allocation_sequence_id: new FormControl('', Validators.compose([Validators.required])),
      masking_id: new FormControl('', Validators.compose([Validators.required])),
      masking_used_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),

    });
    
    this.ctrRegistrydetailsfrm = new FormGroup({
            public_title: new FormControl('', Validators.compose([Validators.required])),
            study_title: new FormControl('', Validators.compose([Validators.required])),
            clinicaltrial_description: new FormControl('', Validators.compose([Validators.required])),
            trial_design_id: new FormControl('', Validators.compose([])),
            trial_design: new FormControl('', Validators.compose([Validators.required])),
            version_no: new FormControl('', Validators.compose([Validators.required])),
            acronym: new FormControl('', Validators.compose([])),
            principal_investigator: new FormControl('', Validators.compose([Validators.required])),
            investigator_id: new FormControl('', Validators.compose([Validators.required])),
            registered_institution: new FormControl('', Validators.compose([])),
            registered_institution_refno: new FormControl('', Validators.compose([])),
            phase_id: new FormControl('', Validators.compose([Validators.required])),
            purpose_of_trial: new FormControl('', Validators.compose([Validators.required])),
            proposed_start_date: new FormControl('', Validators.compose([Validators.required])),
            actualtrial_start_date: new FormControl('', Validators.compose([Validators.required])),
            anticipatedfollow_uplast_date: new FormControl('', Validators.compose([Validators.required])),
            completion_date: new FormControl('', Validators.compose([Validators.required])),
            target_participants: new FormControl('', Validators.compose([Validators.required])),
            final_participants: new FormControl('', Validators.compose([])),
            protocol_no: new FormControl('', Validators.compose([Validators.required])),
            recruitment_status_id: new FormControl('', Validators.compose([Validators.required])),
            publication_url: new FormControl('', Validators.compose([])),
            other_obstetrics_disease: new FormControl('', Validators.compose([Validators.required])),
            disease_being_studied: new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
            appmodule_id: new FormControl(this.module_id, Validators.compose([])),
            section_id: new FormControl(this.section_id, Validators.compose([])),
            application_code: new FormControl('', Validators.compose([])),
            reg_clinical_trial_id: new FormControl('', Validators.compose([])),
            is_ctrapp_registered: new FormControl('', Validators.compose([]))    ,      
            ctrregistered_tracking_no: new FormControl('', Validators.compose([]))
    });
  //  investigator_id
    this.onApplicationSubmissionFrm = new FormGroup({
      submission_comments:new FormControl('', Validators.compose([]))
    });
    this.ctrEligibilityCriteriaFrm = new FormGroup({
      inclusion_criteria: new FormControl('', Validators.compose([Validators.required])),
      exclusion_criteria: new FormControl('', Validators.compose([Validators.required])),age_groups: new FormControl('', Validators.compose([Validators.required])),minimum_age: new FormControl('', Validators.compose([Validators.required])),minage_duration_desc: new FormControl('', Validators.compose([Validators.required])),maximum_age: new FormControl('', Validators.compose([Validators.required])),
      maxage_duration_desc: new FormControl('', Validators.compose([Validators.required])),
      sex_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),

    });
    
    this.outcomesFrm = new FormGroup({
      outcome_type_id: new FormControl('', Validators.compose([Validators.required])),
      time_point: new FormControl('', Validators.compose([Validators.required])),
      outcome: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),

    });
    this.interventionsFrm = new FormGroup({
      intervention_type_id: new FormControl('', Validators.compose([Validators.required])),
      intervention_name: new FormControl('', Validators.compose([Validators.required])),
      intervention_dose: new FormControl('', Validators.compose([Validators.required])),
      intervention_duration: new FormControl('', Validators.compose([Validators.required])),
      intervention_description: new FormControl('', Validators.compose([Validators.required])),
      group_size: new FormControl('', Validators.compose([Validators.required])),
      nature_ofcontrol_id: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
    });
 this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),

      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([Validators.required]))
    });
    
    this.spinner.hide();
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    if(this.application_details){
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
      if(this.application_details.is_readonly){
          this.is_readonly = this.application_details.is_readonly
      }
     
      
      
      
    }
    console.log(this.application_id)
  }

  ngOnInit() {
  }
  onClinicalDashboard() {
    this.app_route = ['./clinicaltrial-registry/ctrregistry-dashboard'];

    this.router.navigate(this.app_route);
  }
  submissionsTermscheckbox(e) {

    this.termscheckbox = e.value;

  }
  
  onClinicalApplicationSubmit() {
    this.app_route = ['./clinicaltrial-registry/ctrregistry-dashboard'];

      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
   
    this.utilityService.onMisPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'tra_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value)
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onLoadinterventionAssData() {

    var data = {
      table_name: 'par_clinical_intervention_assignment'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.interventionAssData = data;
        },
        error => {
          return false;
        });
  }
  onLoadinterventionAllDataData() {

    var data = {
      table_name: 'par_clinical_intervention_allocation'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.interventionAllData = data;
        },
        error => {
          return false;
        });
  }
  onLoadallocationSequenceDataData() {

    var data = {
      table_name: 'par_clinical_allocation_sequence'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.allocationSequenceData  = data;
        },
        error => {
          return false;
        });
  }
  
  onLoadsequenceGenerationDataData() {

    var data = {
      table_name: 'par_clinical_sequence_generation'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.sequenceGenerationData  = data;
        },
        error => {
          return false;
        });
  }
  onLoadmaskingBindingDataData()  {

    var data = {
      table_name: 'par_clinical_maskingbinding'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.maskingBindingData = data;
        },
        error => {
          return false;
        });
  }
  onLoadclinicalMaskingDetailsDta() {

    var data = {
      table_name: 'par_clinical_masking_used'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.clinicalMaskingDetailsDta = data;
        },
        error => {
          return false;
        });
  }
  onLoadinterventionTypesDataDta() {

    var data = {
      table_name: 'par_clinical_intervention_types'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.interventionTypesData = data;
        },
        error => {
          return false;
        });
  }
  onLoadnatureofControlDataDta()  {

    var data = {
      table_name: 'par_clinical_natureofcontrols'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.natureofControlData = data;
        },
        error => {
          return false;
        });
  }
  
  onLoaddurationDescDataDta()  {

    var data = {
      table_name: 'par_timespan_defination'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.durationDescData = data;
        },
        error => {
          return false;
        });
  } onLoadsexDataDta()  {

    var data = {
      table_name: 'par_sexdetails'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.sexData = data;
        },
        error => {
          return false;
        });
  }
  onLoadageGroupDataDta()  {

    var data = {
      table_name: 'par_age_groups'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.ageGroupData = data;
        },
        error => {
          return false;
        });
  }
  
  onLoadsponsorsLevelData()  {

    var data = {
      table_name: 'par_sponsors_levels'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.sponsorsLevelData = data;
        },
        error => {
          return false;
        });
  }
  
  onLoadsponsorNatureData()  {

    var data = {
      table_name: 'par_sponsors_nature'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.sponsorNatureData = data;
        },
        error => {
          return false;
        });
  }
  onLoadoutcomeTypesData()  {

    var data = {
      table_name: 'par_clinicaloutcome_types'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.outcomeTypesData = data;
        },
        error => {
          return false;
        });
  }
  onLoadcontactPersonRoles()  {

    var data = {
      table_name: 'par_clinicaltrialpersons_roles'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.contactPersonRoles = data;
        },
        error => {
          return false;
        });
  }
  
  onLoadclinicalTrialDesignData() {

    var data = {
      table_name: 'par_clinicaltrial_designs'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.clinicalTrialDesignData = data;
        },
        error => {
          return false;
        });
  }
  onLoadclinicalStudyPhaseData() {

    var data = {
      table_name: 'par_clinical_phases'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.clinicalStudyPhaseData = data;
        },
        error => {
          return false;
        });
  }
  onLoaddiseaseConditionsData() {

    var data = {
      table_name: 'par_clinical_diseaseconditions'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.diseaseConditionsData = data;
        },
        error => {
          return false;
        });
  }
  onLoadclinicalStudyPurposeData() {

    var data = {
      table_name: 'par_clinical_studypurposes'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.clinicalStudyPurposeData = data;
        },
        error => {
          return false;
        });
  }
  onLoadrecruitMentStatusData() {

    var data = {
      table_name: 'par_clinical_recruitmentstatuses'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.recruitMentStatusData = data;
        },
        error => {
          return false;
        });
  }
  onLoadConfirmationsData() {

    var data = {
      table_name: 'par_confirmations'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.confirmationData = data;
        },
        error => {
          return false;
        });
  }
  onLoadfundingSourceTypeData() {

    var data = {
      table_name: 'par_fundingsource_types'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.fundingSourceTypeData = data;
        },
        error => {
          return false;
        });
  }
  onSaveClinicalTrialRegistryApp() {
    if (this.ctrRegistrydetailsfrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
      return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.ctrRegistrydetailsfrm.value, this.tracking_no, 'clinicaltrials/saveClinicalTrialRegistryApplication')
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
            this.wizard.model.navigationMode.goToStep(1);
            this.ctrRegistrydetailsfrm.get('id').setValue(this.app_resp.application_id);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onSaveContactPersonFrm() {
    if (this.contactPersonFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.contactPersonFrm.value, this.tracking_no, 'clinicaltrials/onSaveContactPersonDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.contactPersonAddWin =false;
            this.reloadContactpersonaDetails();
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onsaveclinicaltSponsorDetails() {
    if (this.clinicalSponsorsFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
      return;
    }
    this.spinner.show();
   
    this.appService.onSavePermitApplication(this.application_id, this.clinicalSponsorsFrm.value, this.tracking_no, 'clinicaltrials/onsaveclinicaltSponsorDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.sponsorDetailsWinVisible =false;
            this.reloadclinicaltrailSponsorsData();
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onSaveStudyDesign() {
    if(this.is_readonly){
      this.wizard.model.navigationMode.goToStep(3);
      return;
    }
    if (this.ctrStudyDesingdetailsfrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.ctrStudyDesingdetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveStudyDesign')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(3);
         
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  
  onSaveethicsApprovalFrm() {
    if (this.ethicsApprovalFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    
    this.appService.onSavePermitApplication(this.application_id, this.ethicsApprovalFrm.value, this.tracking_no, 'clinicaltrials/onSaveethicsApproval')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.reloadEthicsApprovalData()
            this.ethicsApprovalAddWin = false;
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onSaverecruitmentCenterFrm() {
    if (this.recruitmentCenterFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.recruitmentCenterFrm.value, this.tracking_no, 'clinicaltrials/onSaverecruitmentCenter')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.reloadRecruitmentCenters()
            this.recruitmentCenterAddWin = false;
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  
  onSaveCollaboratorsFrm(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(11);
      return;
    }
    //onSaveSecondaryIdentifiers
    if (this.collaboratorsFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.collaboratorsFrm.value, this.tracking_no, 'clinicaltrials/onSaveCollaboratorsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
          
            this.wizard.model.navigationMode.goToStep(11);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();
        });
  }
  onSavefundingSourceFrm(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(9);
      return;
    }
    if (this.fundingSourceFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.fundingSourceFrm.value, this.tracking_no, 'clinicaltrials/onSavefundingSourceDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
          
            this.wizard.model.navigationMode.goToStep(9);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();
        });
  }
  onSaveEligibilityCriteria(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(5);
      return;
    }
    if (this.ctrEligibilityCriteriaFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.ctrEligibilityCriteriaFrm.value, this.tracking_no, 'clinicaltrials/onSaveEligibilityCriteria')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
          //  this.recruitmentCenterAddWin=false;
            
            this.wizard.model.navigationMode.goToStep(5);
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();
        });
  }
  onSaveInterventionFrm() {
    
    if (this.interventionsFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
    }
    
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.interventionsFrm.value, this.tracking_no, 'clinicaltrials/onSaveInterventionDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.interventionsAddWin=false;
            this.reloadClinicalInterventions();
            
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  
  onSaveOutcomesFrm() {
  
    if (this.outcomesFrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.outcomesFrm.value, this.tracking_no, 'clinicaltrials/onSaveOutcomesDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.outcomeAddWin=false;
            this.reloadClinicalOutcomes();
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onSaveSecondaryIdentifiers() {
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(2);
      return;
    }
    if (this.ctrSecondaryDetailsfrm.invalid) {
      this.toastr.error('Enter All Mandatory Fields!!(with the red mark)', 'Alert');
     //return;
    }
    this.spinner.show();
    this.appService.onSavePermitApplication(this.application_id, this.ctrSecondaryDetailsfrm.value, this.tracking_no, 'clinicaltrials/onSaveSecondaryIdentifiers')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           
            this.toastr.success(this.app_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(2);
         
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  onClinicalTrialContactPersPreparing(e){
    this.functDataGridToolbar(e, this.funcAddContactPerson, 'Contact Person', this.reloadContactpersonaDetails);
   

  }
  onClinicalTrialInterventionsPreparing(e){
    this.functDataGridToolbar(e, this.funcAddClinicalIntervention, 'Intervention', this.reloadClinicalInterventions);
   

  }
  onClinicalTrialRecuritmentPreparing(e){
   
    this.functDataGridToolbar(e, this.funcAddClinicalRecruitment, 'Recruitment Center', this.reloadRecruitmentCenters);
   
  }
  onClinicalTrialEthicsAppPreparing(e){
   
    
    this.functDataGridToolbar(e, this.funcAddEthicsApproval, 'Ethics Approval',this.reloadEthicsApprovalData);
   
  }
  
  funcAddContactPerson(){
   
    this.contactPersonFrm.reset();
    this.contactPersonAddWin = true;
  }
  funcAddEthicsApproval(){
    this.ethicsApprovalFrm.reset();
    this.ethicsApprovalAddWin = true;
  }
  funcAddClinicalRecruitment(){

    this.recruitmentCenterFrm.reset();
    this.recruitmentCenterAddWin = true;

  }
  onClinicalTrialOutcomesPreparing(e){
   
    this.functDataGridToolbar(e, this.funcAddClinicalOutcomes, 'Outcome',this.reloadClinicalOutcomes);
   
  }
  
  funcAddClinicalIntervention(){
    
    this.interventionsFrm.reset();
    this.interventionsAddWin  = true;
   
  }
  funcAddClinicalOutcomes(){
    
    this.outcomesFrm.reset();
    this.outcomeAddWin  = true;
    

  }onEditContactPerson(data){
    
    this.contactPersonFrm.patchValue(data);
    this.contactPersonAddWin  = true;
  }
   
  onEditRecuitmentCenter(data){

    this.ethicsApprovalFrm.patchValue(data);
    this.recruitmentCenterAddWin  = true;
  }
  onEditEthicsApproval(data){

    this.ethicsApprovalFrm.patchValue(data);
    this.ethicsApprovalAddWin  = true;
  }
  onEditOutcomess(data){

    this.outcomesFrm.patchValue(data);
    this.outcomeAddWin  = true;
  }
  onEditInterventions(data){

    this.interventionsFrm.patchValue(data);
    this.interventionsAddWin  = true;
  }
  
  funcAddInvestigatorDetails(){

    this.clinicalSponsorsFrm.reset();
    this.sponsorDetailsWinVisible  = true;
  }

  reloadContactpersonaDetails() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalContactPersonsDetails',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.contactPersonData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  reloadClinicalInterventions() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalInterventionsDetails',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.clinicalTrialIntData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  reloadRecruitmentCenters() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalRecruiptmentDetails',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.recruitmentCentersData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  reloadEthicsApprovalData() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalEthicsApprovalDetails',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.ethicsApprovalData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  
  reloadclinicaltrailSponsorsData() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicaltrailSponsorsData',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.clinicaltrailSponsorsData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  reloadClinicalOutcomes() {
    this.spinner.show();
    this.appService.onPermitApplicationLoading('clinicaltrials/getClinicalOutcomesDetails',{application_id:this.application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

            this.OutcomesData = resp_data.data;

          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }
  
  funcDeleteContactPerson(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrial_contactpersons';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'contactperson', 'Contact Person Details');
  }
  funcDeleteSponsorsDetails(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrialregistry_sponsors';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'sponsors', 'Sponsors Details');

  }
  funcDeleteEthicsApproval(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrial_ethic_approvals';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'ethics', 'Ethics Approval');

  }
  funcDeleteRecuitmentCenters(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrial_recruitmentcenters';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'recruitment', 'Recruitment');

  }
  funcDeleteInterventionsDetails(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrial_interventions';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'outcomes', 'Outcomes');

  }
  
  funcDeleteOutcomesDetails(data) {
    //func_delete records 
    let record_id = data.id;
    let table_name = 'tra_clinicaltrial_outcomes';
    this.funcDeleteDetailhelper(record_id, data.application_id, table_name, 'intervention', 'Intervention');

  }
  funcDeleteDetailhelper(record_id, application_id, table_name, reload_type, title) {
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
            this.appService.onDeleteClinialREgistryDetails(record_id, table_name, application_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if (reload_type == 'intervention') {
                      this.reloadClinicalInterventions();

                    }else if (reload_type == 'outcomes') {
                      this.reloadClinicalOutcomes();

                    }else if (reload_type == 'recruitment') {
                      this.reloadRecruitmentCenters();

                    }else if (reload_type == 'ethics') {
                      this.reloadEthicsApprovalData();

                    }else if (reload_type == 'sponsors') {
                      this.reloadclinicaltrailSponsorsData();

                    }else if (reload_type == 'contactperson') {
                      this.reloadContactpersonaDetails();

                    }
                    
                    this.spinner.hide();
                    this.toastr.success(resp.message, 'Response');
                  }
                  else {
                    this.toastr.error(resp.message, 'Alert');
                    this.spinner.hide();
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
  onCoutryCboSelect($event) {


    this.onLoadRegions($event.selectedItem.id);

  }
  
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.regions = data;
        },
        error => {
          return false
        });
  }
  
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      // id: 36
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries  = data;
        },
        error => {
          return false;
        });
  }
  onInvestigatorsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddInvestigatorDetails, 'Sponsors Details', this.reloadclinicaltrailSponsorsData);
  }
     
  functDataGridToolbar(e, funcBtn, btn_title,refreshBtn) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type:'success',
        icon: 'fa fa-plus',
        disabled:this.is_readonly,
        onClick: funcBtn.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',type:'success',
          onClick: refreshBtn.bind(this)
        }
      });
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  onClinicalTrialAllinvestigators() {
   
    this.checkifAllInvestigatorsponsor = true;
    
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
  } onSponsorInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails, 'New Details',this.funcAddSponsorInvestigatoretails);
  }
  onIsREgisteredReceSelect($event){
   
    if( $event.selectedItem.id == 1){
        this.is_app_registered = true;
    }
    else{
      this.is_app_registered = false;
    }
}
  funcAddSponsorInvestigatoretails() {

    this.isSponsorInvestigatorSearchWinVisible = false;
    this.issponsorInvestigatorAddWinVisible = true;
    this.sponsorInvestigatorFrm.reset();

  }
  funcSelectSponsorInvestigator(data) {
    
    
      this.clinicalSponsorsFrm.get('sponsor_id').setValue(data.data.id);
      this.clinicalSponsorsFrm.get('sponsor_name').setValue(data.data.name);
    
       this.isSponsorInvestigatorSearchWinVisible = false;
    
     
  }onsaveSponsorInvestigator() {
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
            this.issponsorInvestigatorAddWinVisible = false;
            
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
  onAddNewMedConditionsDetails(){
    this.addDiseasedetailsfrm.reset();
    this.addDiseasedetailsMdl = true;
  }
  onSaveDiseasedetails(){
    this.addDiseasedetailsfrm.get('tablename').setValue('par_clinical_diseaseconditions')
    this.utilityService.onsaveApplicationUniformDetails('', this.addDiseasedetailsfrm.value, 'onSaveUniformConfigData')
    .subscribe(
      response => {
        this.app_resp = response.json();
        //the details 
        if (this.app_resp.success) {
          this.onLoaddiseaseConditionsData();
         
          this.addDiseasedetailsMdl = false;
         
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
  onPreviewlinicalTriaRegistry(app_data,is_readonly=false){
    this.spinner.show();
    var resp_data = [{application_code:app_data.application_code, applicant_id:app_data.applicant_id}];
    this.publicService.setApplicationDetail(resp_data);
    this.app_route = ['./clinicaltrial-registry/clinicaltrialreg-preview'];
    this.router.navigate(this.app_route);
   
  }
}
