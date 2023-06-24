import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';

import { WizardComponent } from 'ng2-archwizard';
import { ModalDialogService } from 'ngx-modal-dialog';
@Component({
  selector: 'app-sharedassessment-class',
  templateUrl: './sharedassessment-class.component.html',
  styleUrls: ['./sharedassessment-class.component.css']
})
export class SharedassessmentClassComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  tracking_no:string;
  status_name:string;value:any;strict:any;
  reference_no:string;
  process_name:string;
  submissionActionData:any;
  document_type_id:string;
  section_id:number;
  module_id:number;
  status_id:number;
  sub_module_id:number;
  application_code:number;
  app_details:any;
  process_title:string;
  product_id:number;
  prodclass_category_id:number;
  workflow_stage:number;
  applicationProcessSubfrm:FormGroup;
  submissionNextStageData:any;
  process_id:number;
  app_resp:any;
  assessmentRecommendationsData:any;
  constructor(public utilityService:Utilities,public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public modalServ: ModalDialogService,public viewRef: ViewContainerRef) { 

    this.app_details = this.utilityService.getApplicationDetail();
    console.log(this.app_details);
    if (!this.app_details) {
      this.router.navigate(['./../online-admin']);
      return;
    }
    else{

      this.section_id = this.app_details.section_id;
      this.sub_module_id = this.app_details.sub_module_id;
      this.module_id = this.app_details.module_id;
      this.process_title = this.app_details.process_title;
      this.product_id = this.app_details.product_id;
      this.tracking_no = this.app_details.tracking_no;
      this.reference_no = this.app_details.reference_no;
      this.status_name = this.app_details.status_name;
      this.status_id = this.app_details.status_id;
      this.product_id = this.app_details.product_id;
      this.application_code = this.app_details.application_code;
      this.prodclass_category_id = this.app_details.prodclass_category_id;
    
      this.process_id = this.app_details.process_id;
      this.workflow_stage = this.app_details.workflow_stage;
      this.process_name = this.app_details.process_name;
    }
    //pruducts details 
  this.applicationProcessSubfrm = new FormGroup({
          action: new FormControl('', Validators.compose([Validators.required])),
          next_stage: new FormControl('', Validators.compose([Validators.required])),
          remarks: new FormControl('', Validators.compose([])),
          sub_module_id: new FormControl('', Validators.compose([])),
          module_id: new FormControl('', Validators.compose([])),
          section_id: new FormControl('', Validators.compose([])),
          application_code: new FormControl('', Validators.compose([])),
          curr_stage_id:new FormControl('', Validators.compose([])),
          process_id:new FormControl('', Validators.compose([])),
          recommendation_id: new FormControl('', Validators.compose([Validators.required])),
        });
  this.onLoadSubmissionActionData();
    this.getSubmissionWorkflowStages();
    this.onloadassessmentRecommendationsData();
  }

  ngOnInit() {
        
  }
  onApplicationsDashboard(){
    this.router.navigate(['../online-admin']);
  }
  onApplicationPreviewDetails(){
    
  }
  onValidateApplicationAssesmentProcess(){
    this.utilityService.getApplicationUniformDetails({section_id: this.section_id,sub_module_id: this.sub_module_id, workflow_stage: this.workflow_stage, application_code: this.application_code }, 'onValidateApplicationAssesmentReport')
    .subscribe(
      data => {
        if (data.success) {
          this.wizard.model.navigationMode.goToStep(2);
        }
        else {
          this.toastr.error(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  onLoadSubmissionActionData(){
    this.utilityService.getApplicationUniformDetails({stage_id: this.workflow_stage,is_submission: 1}, 'getSubmissionActionData')
    .subscribe(
      data => {
        if (data.success) {
        this.submissionActionData = data.data;
          
        }
        else {
          this.toastr.error(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  
  getSubmissionNextStageDetails(action_id){
    this.utilityService.getApplicationUniformDetails({stage_id: this.workflow_stage,action: action_id}, 'getSubmissionNextStageDetails')
    .subscribe(
      data => {
        if (data.success) {
          //next_stage
          this.applicationProcessSubfrm.get('next_stage').setValue(data.data.nextstage_id)
         
        }
        else {
          this.toastr.error(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  getSubmissionWorkflowStages(){
    this.utilityService.getApplicationUniformDetails({process_id: this.process_id}, 'getSubmissionWorkflowStages')
    .subscribe(
      data => {
        if (data.success) {
           this.submissionNextStageData = data.data;
          
        }
        else {
          this.toastr.error(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  
  onsubmissionActionDataSelection($event){
    this.getSubmissionNextStageDetails($event.value)

  }

  onApplicaitonProcessSubmission() {
  
    let table_name;
        table_name = 'wb_application_queriessdata';
        if (this.applicationProcessSubfrm.invalid) {
             this.toastr.error('Fill all the Submission Details', 'Alert');
             return;
           }
           this.modalServ.openDialog(this.viewRef, {
            title: 'Do you want to submit the application with tracking no ' + this.reference_no + ' for processing?',
            childComponent: '',
            settings: {
              closeButtonClass: 'fa fa-close'
            },
            actionButtons: [{
              text: 'Yes',
              buttonClass: 'btn btn-danger',
              onAction: () => new Promise((resolve: any, reject: any) => {
                      this.spinner.show();
                      this.applicationProcessSubfrm.get('sub_module_id').setValue(this.sub_module_id)  ;
                      this.applicationProcessSubfrm.get('section_id').setValue(this.section_id)  ;
                      this.applicationProcessSubfrm.get('application_code').setValue(this.application_code);
          
                      this.applicationProcessSubfrm.get('module_id').setValue(this.module_id);
          
                      this.applicationProcessSubfrm.get('curr_stage_id').setValue(this.workflow_stage);
                      this.applicationProcessSubfrm.get('process_id').setValue(this.process_id);

                      
                      this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.applicationProcessSubfrm.value, 'onApplicationProcessSubmission')
                        .subscribe(
                          response => {
                            this.app_resp = response.json();
                            //the details 
                            if (this.app_resp.success) {
                            //
                              
                             this.toastr.success(this.app_resp.message, 'Submission Response');
                             this.router.navigate(['./../online-admin']);
                            return;
                            } else {
                               this.toastr.error(this.app_resp.message, 'Alert');
                            }
                            this.spinner.hide();
                          },
                          error => {
                            this.toastr.error('Error Occurred', 'Alert');
                          });
                resolve();
              })
            }, {
              text: 'no',
              buttonClass: 'btn btn-default',
              onAction: () => new Promise((resolve: any) => {
                resolve();
              })
            }
            ]
          });
        

          
  }
  onloadassessmentRecommendationsData(){
        var data = {
             table_name: 'par_evaluation_recommendations',
        };
        this.config.onLoadConfigurationData(data)
          .subscribe(
            data => {
                   this.assessmentRecommendationsData = data;
            });


  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}
