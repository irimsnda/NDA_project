
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-gmp-personneldetails',
  templateUrl: './gmp-personneldetails.component.html',
  styleUrls: ['./gmp-personneldetails.component.css']
})
export class GmpPersonneldetailsComponent   implements OnInit {
  
  @Input() gmpPersonnelDetailsData: any;
  @Input() isBusinessPersonnelPopupVisible: boolean;
  @Input() premisesPersonnelDetailsfrm: FormGroup;
  @Input() personnelPositionData: any;
  @Input() qualificationsData: FormGroup;
  @Input() studyFieldsData: FormGroup;
  @Input() isPersonnelPopupVisible: boolean;
  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() personnel_informationData: any;
  

  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
 
  @Input() is_readonly: boolean;
  
  @Input() personnel_type_id: number;
  @Input() manufacturing_site_id: number;
  @Input() isperssonelAddPopupVisible: boolean;
  @Input() personnel_id: number;
  @Input() gmpapplicationGeneraldetailsfrm: FormGroup;
  
  
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
   

  }
  ngOnInit() {
    

  }   onPremisesPersonnelToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddPremisesPersonnelDetails, 'Manufacturing Site Personnel');
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onSaveGMPPersonnelDetails() {
    if (this.premisesPersonnelDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSaveGMPPersonnelDetails(this.premisesPersonnelDetailsfrm.value, this.manufacturing_site_id)
      .subscribe(
        response => {
          let gmp_resp = response.json();
          if (gmp_resp.success) {
            this.toastr.success(gmp_resp.message, 'Response');
            this.isBusinessPersonnelPopupVisible = false;
           
            this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);

          } else {
            this.toastr.error(gmp_resp.message, 'Alert');
          }
        },
        error => {
          //this.loading = false;
        });
  }
  funAddPremisesPersonnelDetails() {
    //function call to get the personnels data
    
    this.premisesPersonnelDetailsfrm.reset();
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;

  }
  funcEditPersonnelDetails(data) {

    this.premisesPersonnelDetailsfrm.patchValue(data.data);
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
   
  }
  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.manufacturing_site_id;
    let table_name = 'wb_manufacturing_sites_personnel';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Personnel');

  }
  funcDeleteDetailhelper(record_id, manufacturing_site_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete ' + title + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    this.onLoadPremisesPersonnelDetails(manufacturing_site_id);

                    this.toastr.success(resp.message, 'Response');
                  }
                  else {
                    this.toastr.error(resp.message, 'Alert');
                  }
                },
                error => {
                  return false
                });
            resolve();
          })
        },
        {
          text: 'no',
          buttonClass: 'btn btn-default',
          onAction: () => new Promise((resolve: any) => {

            resolve();

          })
        }
      ]
    });
  }onPersonnelSearchDetails(personnel_type_id) {

      this.appService.onLoadPersonnelInformations()
        .subscribe(
          data_response => {
            this.personnel_informationData = data_response.data;
            this.personnel_type_id = personnel_type_id;
            this.isPersonnelPopupVisible = true;
            
          },
          error => {
            return false
          });
    

  }   onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add Personnel',is_readonly);
  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }

  funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.gmpapplicationGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    }
    else{
      this.premisesPersonnelDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
      //reload the qualifications and documents
      this.personnel_id = data.data.id;
    }
    
    
    this.isPersonnelPopupVisible = false;
    
  }
  onSavePremisesPersonnelDetails() {
    if (this.premisesPersonnelDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesPersonnelDetails(this.premisesPersonnelDetailsfrm.value, this.manufacturing_site_id)
      .subscribe(
        response => {
          let gmp_resp = response.json();
          if (gmp_resp.success) {
            this.toastr.success(gmp_resp.message, 'Response');
            this.isBusinessPersonnelPopupVisible = false;
            this.isperssonelAddPopupVisible = false;

            this.onLoadPremisesPersonnelDetails(this.manufacturing_site_id);

          } else {
            this.toastr.error(gmp_resp.message, 'Alert');
          }
        },
        error => {
         // this.loading = false;
        });
  }
  onLoadPremisesPersonnelDetails(manufacturing_site_id) {

    this.appService.onLoadPremisesPersonnelDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {//dtgmpPersonnelDetailsData
          this.gmpPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }
 

  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled:is_readonly,
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }  refreshDataGrid() {
    //this.dataGrid.instance.refresh();
  }
  
  onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
        let table_name;
        table_name = 'tra_personnel_information';
        let name = this.newPremisesPersonnelDetailsFrm.get('name').value;
        let email_address = this.newPremisesPersonnelDetailsFrm.get('email_address').value;
        let telephone_no = this.newPremisesPersonnelDetailsFrm.get('telephone_no').value;
        let postal_address = this.newPremisesPersonnelDetailsFrm.get('postal_address').value;

        this.utilityService.onAddPersonnDetails(table_name, this.newPremisesPersonnelDetailsFrm.value)
          .subscribe(
            response => {
              let app_resp = response.json();
              //the details 
              if (app_resp.success) {
                if(this.personnel_type_id == 1){
                
                  this.toastr.success(app_resp.message, 'Response');
      
                  this.gmpapplicationGeneraldetailsfrm.patchValue({ contact_person_id: app_resp.record_id, contact_person: name})
                }
                else{
                  this.premisesPersonnelDetailsfrm.patchValue({ personnel_id: app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
                }
                this.isaddNewPremisesPersonnelDetails = false;
                this.isPersonnelPopupVisible = false;
              } else {
                this.toastr.error(app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      }
}
