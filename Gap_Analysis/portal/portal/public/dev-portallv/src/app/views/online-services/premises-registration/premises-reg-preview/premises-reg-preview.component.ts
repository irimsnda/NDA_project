
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { SharedPremisesregistrationclassComponent } from '../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';

@Component({
  selector: 'app-premises-reg-preview',
  templateUrl: './premises-reg-preview.component.html',
  styleUrls: ['./premises-reg-preview.component.css']
})
export class PremisesRegPreviewComponent extends SharedPremisesregistrationclassComponent implements OnInit {

  productApplicationProcessingData:any;
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {
    super(cdr,dmsService,fb,modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,utilityService)
  }

  ngOnInit() {

    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {

      this.router.navigate(['./../online-services/premisesreg-dashboard']);
      return;
    }
    else {

      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.process_title = this.premisesapp_details.process_title;
      this.section_id = this.premisesapp_details.section_id;
      this.premise_id = this.premisesapp_details.premise_id;
      this.tracking_no = this.premisesapp_details.tracking_no;
      this.country_id = this.premisesapp_details.country_id;
      this.region_id = this.premisesapp_details.region_id;

      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.init_premise_id = this.premisesapp_details.init_premise_id;
      this.module_id = this.premisesapp_details.module_id;

      this.onLoadApplicationProcessingData(this.premisesapp_details.application_code)
    }

   
  }
  onLoadApplicationProcessingData(application_code) {

    this.utilityService.onLoadApplicationProcessingData(application_code)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.productApplicationProcessingData =  application_code;
            
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
}
