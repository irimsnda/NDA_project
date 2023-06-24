import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SharedassessmentClassComponent } from '../sharedassessment-class/sharedassessment-class.component';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinicaltrial-assessment',
  templateUrl: './clinicaltrial-assessment.component.html',
  styleUrls: ['./clinicaltrial-assessment.component.css']
})
export class ClinicaltrialAssessmentComponent extends SharedassessmentClassComponent   implements OnInit {

  constructor(public utilityService:Utilities,public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient,public modalServ: ModalDialogService,public viewRef: ViewContainerRef) {
    super(utilityService,spinner, configService, router, formBuilder, config,  toastr,  authService,httpClient, modalServ, viewRef)
   }

  ngOnInit() {
  }

}

