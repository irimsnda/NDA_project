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
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedProductregistrationclassComponent } from '../shared-productregistrationclass/shared-productregistrationclass.component';


@Component({
  selector: 'app-sampledocuments-submissions',
  templateUrl: './sampledocuments-submissions.component.html',
  styleUrls: ['./sampledocuments-submissions.component.css']
})
export class SampledocumentsSubmissionsComponent extends SharedProductregistrationclassComponent implements OnInit {
  isSampleDetailsWinshow:boolean= false;
  sampleSubmissionData:any;
  sampleDetailsFrm: FormGroup;
  productapp_details: any;
  document_title:string;
  is_readonly:boolean = true;
  isReadOnly:boolean = true;
  
  ngOnInit() {
    
    this.productapp_details = this.appService.getProductApplicationDetail();
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/productreg-dashboard']);
      return;
    }
    this.sampleDetailsFrm = new FormGroup({
      batch_no: new FormControl('', Validators.compose([Validators.required])),
     // shelf_life: new FormControl('', Validators.compose([Validators.required])),
     // shelf_life_afteropening: new FormControl('', Validators.compose([Validators.required])),
     // manufacturing_date: new FormControl('', Validators.compose([Validators.required])),
      
     // expiry_date: new FormControl('', Validators.compose([])),
      storage_id: new FormControl('', Validators.compose([])),
     // pack_size: new FormControl('', Validators.compose([])),
     // pack_unit_id: new FormControl('', Validators.compose([])),
      quantity: new FormControl('', Validators.compose([])),
      quantity_unit_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl(this.application_code, Validators.compose([])),

      id: new FormControl('', Validators.compose([]))

  });
    
    if(this.section_id == 2){
      this.document_title = "Dossier & Document Submission";

    }
    else{
      this.document_title = "Application Document Submission";
      
    }
    this.onLoadSampleSubmissionData();
    if (this.productapp_details.product_id != '') {
      //reload the other stores
      this.productGeneraldetailsfrm.patchValue(this.productapp_details);

    }
    this.autoLoadedParameters(this.section_id);
  

  }
  onSampleMoveNextWizard(nextStep) {

      if (nextStep == 1) {
        this.wizard.model.navigationMode.goToStep(nextStep);

      }
      else if (nextStep == 2) {
        
          this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_product_applications')
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response;
                if (response_data.success) {
                  this.wizard.model.navigationMode.goToStep(nextStep);
      
                }
                else {
      
                  this.toastr.error(response_data.message, 'Response');
                }
      
                this.spinner.hide();
              });
      }
      else if (nextStep == 3) {
        var data = {
          table_name: 'tra_sample_information',
          application_code: this.application_code
        };
        this.utilityService.getApplicationUniformDetails(data, 'validateSampleProductDetails')
        .subscribe(
          response => {
            this.spinner.hide();
            let response_data = response;
            if (response_data.success) {
              this.wizard.model.navigationMode.goToStep(nextStep);
  
            }
            else {
  
              this.toastr.error(response_data.message, 'Response');
            }
  
            this.spinner.hide();
          });

      }
      else if(nextStep == 4){
        var data = {
          table_name: 'tra_uploadedproduct_images',
          application_code: this.application_code
        };
        this.utilityService.getApplicationUniformDetails(data, 'validateSampleProductDetails')
        .subscribe(
          response => {
            this.spinner.hide();
            let response_data = response;
            if (response_data.success) {
              this.wizard.model.navigationMode.goToStep(nextStep);
  
            }
            else {
  
              this.toastr.error(response_data.message, 'Response');
            }
  
            this.spinner.hide();
          });

        

      }

  }
 
  funSelectWithdrawalRegisteredProdcustsApp(data){
    let productdata = data.data;
     
    delete productdata.product_id;
    delete productdata.module_id;
    delete productdata.sub_module_id;
 
     this.withdrawalproductGeneraldetailsfrm.patchValue(productdata);
     this.isRegisteredProductsWinshow = false;
 
   }
   onsampleSubmissionPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Sample Details',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcAddSampleSubmissionDetails.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  funcAddSampleSubmissionDetails(){
      this.isSampleDetailsWinshow = true;

  }
  
  funcEditSampleDetails(data) {
    this.sampleDetailsFrm.patchValue(data.data);
    this.isSampleDetailsWinshow = true;
  }
  
  onSavesampleDetails() {
    this.spinner.show();
    let table_name;
        table_name = 'tra_sample_information';

    this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.sampleDetailsFrm.value, 'onSavesampleDetails')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.onLoadSampleSubmissionData();
           
            this.isSampleDetailsWinshow = false;

            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onLoadSampleSubmissionData() {

    this.appService.getProductsOtherDetails({ application_code: this.application_code }, 'getSampleSubmissionDetails')
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.sampleSubmissionData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
}