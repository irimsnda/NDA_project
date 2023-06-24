import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gmp-app-preview',
  templateUrl: './gmp-app-preview.component.html',
  styleUrls: ['./gmp-app-preview.component.css']
})
export class GmpAppPreviewComponent extends SharedGmpapplicationclassComponent implements OnInit {

  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
    super(modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,dmsService,utilityService,httpClient)
      this.gmpapp_details = this.appService.getGmpApplicationDetail();

      if (!this.gmpapp_details) {
        this.router.navigate(['./../online-services/gmpapplications-dashboard']);
        return;
      }
      if (this.country_id == 36) {
        this.localagent_optionDisabled = true;
        this.applicationApplicantdetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id, trader_aslocal_agent: 1 })
        //deiable field
      }
      else {
        this.localagent_optionDisabled = false;
        this.applicationApplicantdetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 0 })
  
      }
  
      this.gmpapplicationGeneraldetailsfrm.patchValue(this.gmpapp_details);
      
      this.applicationApplicantdetailsfrm.patchValue(this.gmpapp_details);
  
  }
  
}
