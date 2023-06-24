import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedPremisesregistrationclassComponent } from '../../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-directors-details',
  templateUrl: './directors-details.component.html',
  styleUrls: ['./directors-details.component.css']
})
export class DirectorsDetailsComponent implements OnInit {
  @Input() premisesDirectorsDetailsfrm: FormGroup;
  @Input() newPremisesDirectorsDetailsFrm: FormGroup;
  @Input() premDirectorsDetailsData: any;
  @Input() isBusinessPersonnelPopupVisible: boolean;
  @Input() qualificationsData: any;
  @Input() personnelPositionData: any;
  @Input() studyFieldsData: any;
  @Input() isDirectorsPopupVisible: boolean;
  @Input() directorsDetailsData: any = {};
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() personnel_informationData: any;
  @Input() isaddNewPremisesDirectorsDetails: boolean;
  @Input() is_readonly: boolean;

  @Input() premise_id: number;
  @Input() premisesGeneraldetailsfrm: FormGroup;
  personnelIdentificationTypeData:any;
  
  personnel_id:number;
  district_id:number;
  region_id:number;
  country_id:number;
  personnel_QualificationData:any;
  personnel_type_id:number;
  app_resp:any;
  isPersonnelPopupVisible:boolean;
  premises_resp:any;
  isperssonelAddPopupVisible:boolean;
  loading:boolean;
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities,public httpClient: HttpClient) {

  }
  ngOnInit() {
    this.onLoadPremisesDirectorsDetails();
    this.onpersonnelIdentificationTypeDataLoad();
    this.onLoadCountries();
  }
  funcEditPersonnelDetails(data) {

    // this.premisesDirectorsDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.premisesDirectorsDetailsfrm.patchValue(data.data);

    this.premisesDirectorsDetailsfrm.patchValue(data.data);
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.onLoadPersonnerQualifationsDetails(data.data.personnel_id);
    this.personnel_id = data.data.personnel_id;

  }      
  funcSelectDirectorsDetails(data){
    this.premisesDirectorsDetailsfrm.patchValue(data.data);
      this.isDirectorsPopupVisible= false;         
  }
 
    onSearchStaffDetails() {
      this.appService.onLoadPremisesDirectorsDetails({})
        .subscribe(
          data_response => {
            this.isDirectorsPopupVisible = true;
            this.directorsDetailsData = data_response.data;
          },
          error => {
            return false
      


       });
  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          return false;
        });
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.regions = data;
        },
        error => {
          return false
        });
  }


   onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
    onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }

  onLoadPersonnerQualifationsDetails(personnel_id) {
    this.appService.onLoadPersonnerQualifationsDetails(personnel_id)
      .subscribe(
        data_response => {
          this.personnel_QualificationData = data_response.data;
        },
        error => {
          return false
        });

  } onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesDirectorsDetails, '',is_readonly);
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  
 /* onSavePersonnelQualification() {

    if (this.personnelQualificationFrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePersonnelQualification(this.personnelQualificationFrm.value)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {

            this.toastr.success(this.premises_resp.message, 'Response');

            this.onLoadPersonnerQualifationsDetails(this.premises_resp.personnel_id);

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  */
  onLoadPremisesDirectorsDetails() {

    this.appService.onLoadPremisesDirectorsDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premDirectorsDetailsData = data.data;
        },
        error => {
          return false
        });
  }
  funcDeleteDirectorsDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_proprietors';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Directors');

  }
  funcDeleteDetailhelper(record_id, apppremises_id, table_name, reload_type, title) {
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
            this.appService.onDeletePremisesDetails(record_id, table_name, apppremises_id, 'Premises Other Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    
                      this.onLoadPremisesDirectorsDetails();

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
  }
  funAddNewPremisesDirectorsDetails() {
    this.isaddNewPremisesDirectorsDetails = true;
  }
  onPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.appService.onLoadPersonnelInformations()
    .subscribe(
      data_response => {
        this.personnel_informationData = data_response.data;
        
           this.isPersonnelPopupVisible = true;
      },
      error => {
        return false
      });

  }
  
  funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    }
    else{
      this.premisesDirectorsDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
    //reload the qualifications and documents
    this.personnel_id = data.data.id;
    }
    
    
    this.isPersonnelPopupVisible = false;
    
  }onPremisesDirectorsToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddPremisesDirectorsDetails, 'Add Director',is_readonly);
  }
 
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
         // onClick: this.refreshDataGrid.bind(this)
        }
      });
  } onpersonnelIdentificationTypeDataLoad() {

    var data = {
      table_name: 'par_identification_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.personnelIdentificationTypeData = data;
        },
        error => {
          return false
        });
  }
  funAddPremisesDirectorsDetails() {
  
    this.premisesDirectorsDetailsfrm.reset();
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.personnel_id = 0;
    this.personnel_QualificationData = {};

  }

  onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
        let table_name;
        table_name = 'tra_personnel_information';
        let name = this.newPremisesDirectorsDetailsFrm.get('name').value;
        let email_address = this.newPremisesDirectorsDetailsFrm.get('email_address').value;
        let telephone_no = this.newPremisesDirectorsDetailsFrm.get('telephone_no').value;
        let postal_address = this.newPremisesDirectorsDetailsFrm.get('postal_address').value;

        this.utilityService.onAddPersonnDetails(table_name, this.newPremisesDirectorsDetailsFrm.value)
          .subscribe(
            response => {
              this.app_resp = response.json();
              //the details 
              if (this.app_resp.success) {
                if(this.personnel_type_id == 1){
                
                  this.toastr.success(this.app_resp.message, 'Response');
      
                  this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name})
                }
                else{
                  this.premisesDirectorsDetailsfrm.patchValue({ personnel_id: this.app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
                }
                this.isaddNewPremisesDirectorsDetails = false;
                this.isPersonnelPopupVisible = false;
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.toastr.error('Error Occurred', 'Alert');
            });
      }
  onSavePremisesDirectorsDetails() {
    if (this.premisesDirectorsDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesDirectorsDetails(this.premisesDirectorsDetailsfrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isBusinessPersonnelPopupVisible = false;
            this.isperssonelAddPopupVisible = false;

            this.onLoadPremisesDirectorsDetails();

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
}
