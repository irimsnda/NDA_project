import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gmp-document-submission',
  templateUrl: './gmp-document-submission.component.html',
  styleUrls: ['./gmp-document-submission.component.css']
})
export class GmpDocumentSubmissionComponent extends SharedGmpapplicationclassComponent implements OnInit {
  
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
    super(modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,dmsService,utilityService,httpClient)
      this.manufacturingSiteLocationSet = true;
      this.gmpapp_details = this.appService.getGmpApplicationDetail();
      if (!this.gmpapp_details) {
        this.router.navigate(['./../online-services/gmpapplications-dashboard']);
        return;
      }
      this.gmp_type_id = this.gmpapp_details.gmp_type_id;
      this.manufacturingSiteLocationSet = true;
      
  }

  ngOnInit() {
  }

}
