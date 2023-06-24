import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService } from 'ngx-modal-dialog';
import { b } from '@angular/core/src/render3';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PublicService } from 'src/app/services/public/public.service';

@Component({
  selector: 'app-sharedpublic-shareclass',
  templateUrl: './sharedpublic-shareclass.component.html',
  styleUrls: ['./sharedpublic-shareclass.component.css']
})
export class SharedpublicShareclassComponent implements OnInit {
  
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  app_route:any;
  message:string;
  success:string;
  isAdminLoggedIn:boolean;

 @ViewChild(WizardComponent)
  public wizard: WizardComponent;
strict:any;
onAdminAccessFrm:FormGroup;
is_secondary_id:boolean;
is_funding_received:boolean;
has_collaborators:boolean;
previewBillsWin:boolean;
    previewIshiddenField:boolean;
  application_details:any;
  addDiseasedetailsfrm:FormGroup;
  appmodule_id:any;
  dtClinicalTrialRegistryData:any;
  navBarLocation:string= 'top';
  navBarLayout:string ='small-empty';
  
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
    confirmationTrialData:any;
    confirmationSecondaryData:any;
     confirmationFundingData:any; 
     confirmationCollaboratorsData:any;
  constructor(public utilityService: Utilities,public router: Router, public config:ConfigurationsService,public spinner: SpinnerVisibilityService,public publicService: PublicService,public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public modalDialogue: ModalDialogService,public viewRef: ViewContainerRef,public formBuilder: FormBuilder) { 
    this.onLoadclinicalTrialDesignData();
    this.onLoadclinicalStudyPhaseData();
    this.onLoaddiseaseConditionsData();
    this.onLoadclinicalStudyPurposeData();
    this.onLoadrecruitMentStatusData();
    this.onLoadConfirmationsData();

    this.onLoadsexDataDta();
    this.onLoaddurationDescDataDta();
    this.onLoadageGroupDataDta();

    this.onLoadoutcomeTypesData();
    this.reloadClinicalOutcomes(this.application_id);
    this.onLoadinterventionAssData() 
    this.onLoadinterventionAllDataData() 
    this.onLoadallocationSequenceDataData() 
    this.onLoadmaskingBindingDataData() 
    this.onLoadclinicalMaskingDetailsDta()
    this.onLoadsequenceGenerationDataData()

    this.onLoadnatureofControlDataDta() ;
    this.onLoadinterventionTypesDataDta();
    this.reloadClinicalInterventions(this.application_id);
    this.onLoadfundingSourceTypeData();
    this.onLoadCountries();
    this.ctrSecondaryDetailsfrm = new FormGroup({
      is_secondaryid_applicable: new FormControl('', Validators.compose([])),
      secondary_id: new FormControl('', Validators.compose([])),
      issuing_authority: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.clinicalSponsorsFrm = new FormGroup({
      sponsor_name: new FormControl('', Validators.compose([])),
      sponsor_id: new FormControl('', Validators.compose([])),
      sponsor_level_id: new FormControl('', Validators.compose([])),
      sponsor_nature_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.addDiseasedetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      tablename: new FormControl('', Validators.compose([]))

    });
    this.collaboratorsFrm = new FormGroup({
      has_collaborators: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.fundingSourceFrm = new FormGroup({
      is_funding_receivied: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      
      fundsource_type_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),

      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    
    this.recruitmentCenterFrm = new FormGroup({
      name: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.ethicsApprovalFrm = new FormGroup({
      submission_date: new FormControl('', Validators.compose([])),
      approval_date: new FormControl('', Validators.compose([])),
      committee_name: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      phone_no: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.contactPersonFrm = new FormGroup({
      contactperson_role_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      phone_no: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      contact_personposition: new FormControl('', Validators.compose([])),

      
      id: new FormControl('', Validators.compose([]))
    });
    
    this.ctrStudyDesingdetailsfrm = new FormGroup({
      intervention_assignment_id: new FormControl('', Validators.compose([])),
      intervention_allocation_id: new FormControl('', Validators.compose([])),
      sequence_generation_id: new FormControl('', Validators.compose([])),
      allocation_sequence_id: new FormControl('', Validators.compose([])),
      masking_id: new FormControl('', Validators.compose([])),
      masking_used_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),

    });
    
    this.ctrRegistrydetailsfrm = new FormGroup({
            public_title: new FormControl('', Validators.compose([])),
            study_title: new FormControl('', Validators.compose([])),
            clinicaltrial_description: new FormControl('', Validators.compose([])),
            trial_design_id: new FormControl('', Validators.compose([])),
            version_no: new FormControl('', Validators.compose([])),
            acronym: new FormControl('', Validators.compose([])),
            phase_id: new FormControl('', Validators.compose([])),
            purpose_of_trial: new FormControl('', Validators.compose([])),
            proposed_start_date: new FormControl('', Validators.compose([])),protocol_no: new FormControl('', Validators.compose([])),
            actualtrial_start_date: new FormControl('', Validators.compose([])),
            anticipatedfollow_uplast_date: new FormControl('', Validators.compose([])),
            completion_date: new FormControl('', Validators.compose([])),
            target_participants: new FormControl('', Validators.compose([])),
            final_participants: new FormControl('', Validators.compose([])),
            recruitment_status_id: new FormControl('', Validators.compose([])),
            publication_url: new FormControl('', Validators.compose([])),
            other_obstetrics_disease: new FormControl('', Validators.compose([])),
            disease_being_studied: new FormControl('', Validators.compose([])),
            id: new FormControl('', Validators.compose([])),
            sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),
            appmodule_id: new FormControl(this.module_id, Validators.compose([])),
            section_id: new FormControl(this.section_id, Validators.compose([])),
            trial_design: new FormControl(this.section_id, Validators.compose([])),
            
            
            application_code: new FormControl('', Validators.compose([])),
            registered_institution_refno:new FormControl('', Validators.compose([])),
            registered_institution:new FormControl('', Validators.compose([])),
            
            reg_clinical_trial_id: new FormControl('', Validators.compose([])),
            
            is_ctrapp_registered: new FormControl('', Validators.compose([]))    ,      
            ctrregistered_tracking_no: new FormControl('', Validators.compose([]))
                 
             
    });
    this.onApplicationSubmissionFrm = new FormGroup({
      submission_comments:new FormControl('', Validators.compose([]))
    });
    this.ctrEligibilityCriteriaFrm = new FormGroup({
      inclusion_criteria: new FormControl('', Validators.compose([])),
      exclusion_criteria: new FormControl('', Validators.compose([])),age_groups: new FormControl('', Validators.compose([])),minimum_age: new FormControl('', Validators.compose([])),minage_duration_desc: new FormControl('', Validators.compose([])),maximum_age: new FormControl('', Validators.compose([])),
      maxage_duration_desc: new FormControl('', Validators.compose([])),
      sex_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),

    });
    
    this.outcomesFrm = new FormGroup({
      outcome_type_id: new FormControl('', Validators.compose([])),
      time_point: new FormControl('', Validators.compose([])),
      outcome: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),

    });
    this.interventionsFrm = new FormGroup({
      intervention_type_id: new FormControl('', Validators.compose([])),
      intervention_name: new FormControl('', Validators.compose([])),
      intervention_dose: new FormControl('', Validators.compose([])),
      intervention_duration: new FormControl('', Validators.compose([])),
      intervention_description: new FormControl('', Validators.compose([])),
      group_size: new FormControl('', Validators.compose([])),
      nature_ofcontrol_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
    });
 this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([])),

      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([]))
    });
    
    this.spinner.hide();
    
    this.onAdminAccessFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required,Validators.email])),  
      user_password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
  }
  onClinicalDashboard() {
    this.app_route = ['./public/clinical-trials'];

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
  onLoadrecruitMentStatusData(){
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
          this.confirmationTrialData = data;
          this.confirmationSecondaryData = data;
          this.confirmationFundingData = data;
          this.confirmationCollaboratorsData = data;
       
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
    
  }
  onSaveContactPersonFrm() {
   
  }
  onsaveclinicaltSponsorDetails() {
    
  }
  onSaveStudyDesign() {
    if(this.is_readonly){
      this.wizard.model.navigationMode.goToStep(3);
      return;
    }
   
  }
  
  onSaveethicsApprovalFrm() {
   
  }
  onSaverecruitmentCenterFrm() {
    
  }
  
  onSaveCollaboratorsFrm(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(11);
      return;
    }
    
  }
  onSavefundingSourceFrm(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(9);
      return;
    }
   
  }
  onSaveEligibilityCriteria(){
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(5);
      return;
    }
    
  }
  onSaveInterventionFrm() {
   
  }
  
  onSaveOutcomesFrm() {
  
  }
  onSaveSecondaryIdentifiers() {
    if(this.is_readonly){
      
      this.wizard.model.navigationMode.goToStep(2);
      return;
    }
   
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
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalContactPersonsDetails',{application_id:this.application_id})
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
  reloadClinicalInterventions(application_id) {
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalInterventionsDetails',{application_id:application_id})
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
  reloadRecruitmentCenters(application_id) {
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalRecruiptmentDetails',{application_id:application_id})
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
  onIsREgisteredReceSelect($event){
   
    if( $event.selectedItem.id == 1){
        this.is_app_registered = true;
    }
    else{
      this.is_app_registered = false;
    }
}
  reloadEthicsApprovalData(application_id) {
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalEthicsApprovalDetails',{application_id:application_id})
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
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicaltrailSponsorsData',{application_id:this.application_id})
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
  reloadClinicalOutcomes(application_id) {
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalOutcomesDetails',{application_id:application_id})
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
  reloaddiseaseConditionsData(application_id) {
    this.spinner.show();
    this.publicService.onPermitApplicationLoading('clinicaltrials/getClinicalTrialDiseasesDetails',{application_id:application_id})
      .subscribe(
        resp_data => {
          if (resp_data.success) {

              this.ctrRegistrydetailsfrm.patchValue(resp_data.data);

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
   
   
  } onSponsorInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails, 'Sponsor Details',this.funcAddSponsorInvestigatoretails);
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
   
  }
  onAddNewMedConditionsDetails(){
    this.addDiseasedetailsfrm.reset();
    this.addDiseasedetailsMdl = true;
  }
  onSaveDiseasedetails(){
    

  }  onClinicalTrialPrintDetails(){
    
    let popupWinindow
    let innerContents = document.getElementById('print-container').innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
   // popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
 
  }
  get f() { return this.onAdminAccessFrm.controls; }
  onAdminAccessLoginKeyPress($event){
    if (this.onAdminAccessFrm.invalid) {
      return;
    }
    this.loading = true;
    this.spinner.show();
   
    this.authService.onAdminlogin(this.f.email_address.value, this.f.user_password.value)
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;
          if(this.success){
            localStorage.setItem('isAdminLoggedIn', auth_response.isAdminLoggedIn);
            localStorage.setItem('mis_external_user_id', auth_response.mis_external_user_id);
            
            localStorage.setItem('token', auth_response.access_token);
            localStorage.setItem('user',JSON.stringify(auth_response));
            this.toastr.info(this.message, 'Success!');
            this.isAdminLoggedIn = auth_response.isAdminLoggedIn;
            this.router.navigate(['/online-admin']);
           // location.reload();
           this.spinner.hide();
          }
          else{
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  funcPublicNavigation(router_link){
    
    this.app_route = ['./public/' + router_link];
    this.router.navigate(this.app_route);

  }
  
}
