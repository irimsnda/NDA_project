import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PublicService } from 'src/app/services/public/public.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { SharedpublicShareclassComponent } from '../sharedpublic-shareclass/sharedpublic-shareclass.component';

@Component({
  selector: 'app-clinical-trials',
  templateUrl: './clinical-trials.component.html',
  styleUrls: ['./clinical-trials.component.css']
})
export class ClinicalTrialsComponent  extends SharedpublicShareclassComponent{
clinicalTrialApplicationData:any ={};
studySiteData:any ={};
countryData:any ={};
registeredClinicalTrial:FormGroup;
title: string;
countriesData:any;
loading:boolean;
message:string;
//success:boolean;
isLoggedIn:any;
app_route:any;
signInFrm: FormGroup;
trader_no:any;
company_name:any;
email_address:any;
isAdvancedSearch:boolean=false;
 /* constructor(public toastr: ToastrService,  private publicService: PublicService,private spinner: SpinnerVisibilityService,private config: ConfigurationsService,public formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }
 */

  ngOnInit() {
    this.is_readonly = true;
    this.signInFrm = this.formBuilder.group({
      trader_no: ['', Validators.required],
      user_password: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]]
    // recaptcha: ['', Validators.required]
    });     
  
    this.registeredClinicalTrial = new FormGroup({
      certificate_no: new FormControl('', Validators.compose([])),
      applicant_name: new FormControl('', Validators.compose([])),
      registrantcountry_id: new FormControl('', Validators.compose([])),
      study_title: new FormControl('', Validators.compose([])),
      study_site_id: new FormControl('', Validators.compose([])),
      principal_investigator: new FormControl('', Validators.compose([])),
      clinical_trial_sponsor: new FormControl('', Validators.compose([])),
      recruitment_status_id: new FormControl('', Validators.compose([])),
      public_title: new FormControl('', Validators.compose([])),
      trial_design: new FormControl('', Validators.compose([])),
      phase_id: new FormControl('', Validators.compose([])),
      disease_being_studied: new FormControl('', Validators.compose([])),
      purpose_of_trial: new FormControl('', Validators.compose([])),
      
    });


    this.onLoadcountriesData();
    this.onLoadClinicalTrialSitesData();
    this.onLoadRegisteredClincialTrial();

    if(localStorage.length >0){
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
      let userDetails = JSON.parse(localStorage.getItem('user'));
      this.trader_no = userDetails.trader_no;
      this.company_name = userDetails.company_name;
      this.email_address = userDetails.email_address;
    }

  } get f() { return this.signInFrm.controls; }
  onSignIn() {
    const formData = new FormData();

    if (this.signInFrm.invalid) {
      return;
    }
    this.loading = true;
    this.spinner.show();
   
    this.authService.login(this.f.trader_no.value, this.f.email_address.value, this.f.user_password.value)
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;
          if(this.success){
            localStorage.setItem('isLoggedIn', auth_response.isLoggedIn);
            localStorage.setItem('user',JSON.stringify(auth_response));
            this.toastr.info(this.message, 'Success!');
            this.isLoggedIn = auth_response.isLoggedIn;
            this.router.navigate(['/clinicaltrial-registry']);
           // location.reload();
           this.spinner.hide();
          }
          else{
           
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
    //this.router.navigate(['/online-services']);
  } 
  funcOnlineServices(){
    
    this.router.navigate(['/clinicaltrial-registry']);
    
  }
  funcLogOut(){
   
    this.authService.logout();
    
  }
  funcPublicNavigation(router_link){
    
    this.app_route = ['./public/' + router_link];
    this.router.navigate(this.app_route);

  } onSignOnKeyPress(event){

    if(event.key === 'Enter'){
     
        this.onSignIn();
    }
    
}
  onLoadcountriesData() {
    var data = {
      table_name: 'par_countries',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.countriesData = data;
        });
  }
  onLoadClinicalTrialSitesData() {

    var data = {
      table_name: 'study_sites',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.studySiteData = data;
        });
  }
  advanceSearchTermscheckbox(e) {

    this.isAdvancedSearch = e.value;

  }
  onSearchRegisteredclinicaltrials(){
    this.spinner.show();
   
    this.publicService.OnSearchRegistrationDataSets(this.registeredClinicalTrial.value,'onSearchPublicRegisteredclinicaltrials')
      .subscribe(
        data => {
          if (data.success) {
              this.clinicalTrialApplicationData = data.data;
          } else {
            this.toastr.error(data.message, 'Alert');
          }
        });

  }
  onLoadRegisteredClincialTrial(){

    this.spinner.show();
    this.publicService.OnSearchRegistrationDataSets({'section':'all'},'onSearchPublicRegisteredclinicaltrials')
      .subscribe(
        data => {
          if (data.success) {
              this.clinicalTrialApplicationData = data.data;
          } else {
            this.toastr.error(data.message, 'Alert');
          }
        });
        
  }
  onClearRegisteredclinicaltrialsFilter(){

    this.registeredClinicalTrial.reset();
    this.onLoadRegisteredClincialTrial();
    
  }
  onEditClinicalTriaRegistry(app_data,is_readonly=false){
    this.spinner.show();
    var resp_data = [{application_code:app_data.application_code, applicant_id:app_data.applicant_id}];
    this.publicService.setApplicationDetail(resp_data);
    this.app_route = ['./public/previewclinical-trials'];
    this.router.navigate(this.app_route);
        
  }
  contentReady(e) {
      if (!e.component.getSelectedRowKeys().length)
          e.component.selectRowsByIndexes(0);
  }
  selectionChanged(e) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
      let application_id = e.currentSelectedRowKeys[0];

      this.reloadClinicalInterventions(application_id);
      this.reloadClinicalOutcomes(application_id);
      this.reloadRecruitmentCenters(application_id);
      this.reloadEthicsApprovalData(application_id);
     
      this.reloaddiseaseConditionsData(application_id);
      
  }
}
