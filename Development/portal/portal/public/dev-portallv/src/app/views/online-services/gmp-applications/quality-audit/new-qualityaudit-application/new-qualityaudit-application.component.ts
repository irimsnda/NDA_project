
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
  selector: 'app-new-qualityaudit-application',
  templateUrl: './new-qualityaudit-application.component.html',
  styleUrls: ['./new-qualityaudit-application.component.css']
})
export class NewQualityauditApplicationComponent extends SharedGmpapplicationclassComponent implements OnInit {
  
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
      super(modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,dmsService,utilityService,httpClient)
  }
  ngOnInit() {
 
    this.gmpapp_details = this.appService.getGmpApplicationDetail();

    if (!this.gmpapp_details) {
      this.router.navigate(['./../online-services/gmpapplications-dashboard']);
      return;
    }
    else {
      
      this.sub_module_id = this.gmpapp_details.sub_module_id;
      this.process_title = this.gmpapp_details.process_title;
      this.section_id = this.gmpapp_details.section_id;
      this.manufacturing_site_id = this.gmpapp_details.manufacturing_site_id;
      this.tracking_no = this.gmpapp_details.tracking_no;
      this.country_id = this.gmpapp_details.country_id;
      this.region_id = this.gmpapp_details.region_id;

      this.status_name = this.gmpapp_details.status_name;
      this.status_id = this.gmpapp_details.application_status_id;
      this.module_id = this.gmpapp_details.module_id;

    }
    
    if(this.status_id < 1 || !this.status_id){
      this.status_name = "New"
      this.status_id = 1;
    }

    this.manufacturingSiteLocationSet = true;
  
    this.gmp_type_id = this.gmpapp_details.gmp_type_id;

    if (this.is_local == 1) {
      this.localagent_optionDisabled = true;
      this.gmpapplicationGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id, trader_aslocal_agent: 1 })
      //deiable field
    }
    else {
      this.localagent_optionDisabled = false;
      this.gmpapplicationGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 0 })

    }

    this.gmpapplicationGeneraldetailsfrm.patchValue(this.gmpapp_details);
    


  }
  onStep2Next(e){
    return false;
  }
  onSaveGMPApplication() {
    if (this.gmpapplicationGeneraldetailsfrm.invalid) {
      return;
    }
   
   this.spinner.show();
    this.appService.onSaveGmpApplication(this.manufacturing_site_id, this.gmpapplicationGeneraldetailsfrm.value, this.tracking_no,'')
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          //the details 
          this.spinner.hide();
          this.tracking_no = this.gmp_resp.tracking_no;
          this.manufacturing_site_id = this.gmp_resp.manufacturing_site_id;
          this.application_code =  this.gmp_resp.application_code;
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onGMPApplicationDashboard() {
    //check for unsaved changes 

    this.router.navigate(['../online-services/medicalqualityaudits-dashboard']);

  }
}
