import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

//model

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-initiate-product-withdrawal',
  templateUrl: './initiate-product-withdrawal.component.html',
  styleUrls: ['./initiate-product-withdrawal.component.css']
})
export class InitiateProductWithdrawalComponent extends SharedProductregistrationclassComponent implements OnInit {
  productNutrientsdetailsfrm: FormGroup;
  productapp_details: any;
  
  ngOnInit() {
    this.productapp_details = this.appService.getProductApplicationDetail();
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/prodwithdrawalreg-dashboard']);
      return;
    }
    
      if (this.productapp_details.product_id != '') {
        //reload the other stores
        this.productGeneraldetailsfrm.patchValue(this.productapp_details);

      }
    this.is_readonly = true;
    this.isReadOnly = true;
    this.autoLoadedParameters(this.section_id);
  
  }
  onMoveNextWizard(nextStep) {
    //validate details 
    this.wizard.model.navigationMode.goToStep(nextStep);
    
  }
}
