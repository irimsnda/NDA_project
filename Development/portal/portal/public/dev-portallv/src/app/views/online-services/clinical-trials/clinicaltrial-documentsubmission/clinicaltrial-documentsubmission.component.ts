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
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-clinicaltrial-documentsubmission',
  templateUrl: './clinicaltrial-documentsubmission.component.html',
  styleUrls: ['./clinicaltrial-documentsubmission.component.css']
})
export class ClinicaltrialDocumentsubmissionComponent extends 
SharedClinicaltrialComponent implements OnInit {
  sub_module_id: number = 10;
  appmodule_id:number;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {

    super(utilityService, premappService, dmsService, fb, modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,httpClient);
    this.is_readonly = true;
  }
  ngOnInit() {
    this.application_details = this.appService.getApplicationDetail();
    this.appmodule_id = this.module_id;
    this.clinicaltrialGeneraldetailsfrm.patchValue(this.application_details);

  }
  onClinicalDashboard() {
    this.app_route = ['./online-services/newclinical-trialsdashboard'];

    this.router.navigate(this.app_route);
  }onPermitsApplicationSubmit() {
    this.app_route = ['./online-services/newclinical-trialsdashboard'];
    if(this.status_id == 1){
      if (this.onApplicationSubmissionFrm.invalid) {
        
        this.toastr.error('Fill in the submission details to proceed!!', 'Alert');
        return;
      }
    }
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_clinical_trial_applications', this.app_route,this.onApplicationSubmissionFrm.value);
  }
}

