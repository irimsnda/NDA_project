
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
  selector: 'app-gmp-applications-amendements',
  templateUrl: './gmp-applications-amendements.component.html',
  styleUrls: ['./gmp-applications-amendements.component.css']
})
export class GmpApplicationsAmendementsComponent extends SharedGmpapplicationclassComponent implements OnInit {
  is_readonly:boolean = true;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
    super(modalServ, viewRef, spinner, configService, appService, router, formBuilder, config, modalService, toastr, authService,dmsService,utilityService,httpClient)

}
ngOnInit() {

  this.gmpapp_details = this.appService.getGmpApplicationDetail();

  if (!this.gmpapp_details) {
    this.router.navigate(['./../online-services/gmpapplications-dashboard']);
    return;
  }
 console.log(this.gmpapp_details);
  this.gmpapplicationGeneraldetailsfrm.patchValue(this.gmpapp_details);
  

}
  onSaveGMPApplication() {
    if (this.gmpapplicationGeneraldetailsfrm.invalid) {
     // return;
    }
    
    this.spinner.show();
    this.appService.onSaveRenewalGmpApplication(this.manufacturing_site_id, this.gmpapplicationGeneraldetailsfrm.value, this.tracking_no)
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
  funcSelectTraderDetails(data) {
    let record = data.data;
    this.gmpapplicationGeneraldetailsfrm.get('local_agent_name').setValue(record.trader_name);
     this.gmpapplicationGeneraldetailsfrm.get('local_agent_id').setValue(record.id);
    
    this.modalService.getModal('traderAccountsDetailsModal').close();

  }
}