import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedDrugshopsregistrationclassComponent } from '../../shared-drugshopsregistrationclass/shared-drugshopsregistrationclass.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';


@Component({
  selector: 'app-drugshop-licensedetails',
  templateUrl: './drugshop-licensedetails.component.html',
  styleUrls: ['./drugshop-licensedetails.component.css']
})
export class DrugshopLicensedetailsComponent implements OnInit {
  @Input() newPremisesStafflDetailsfrm: FormGroup;
  @Input() premPersonnelDetailsData: any;
  @Input() premisesStafflDetailsfrm:any;
  @Input() isBusinessPersonnelPopupVisible: boolean;
  @Input() qualificationsData: any;
  @Input() personnelPositionData: any;
  @Input() studyFieldsData: any;
  @Input() isStaffPopupVisible: boolean;
  @Input() staffDetailsData: any = {};
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() personnel_informationData: any;
  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() is_readonly: boolean;
  @Input()  traderAccountsDetailsData:any = {};
  @Input() premise_id: number;
  @Input() premisesGeneraldetailsfrm: FormGroup;
  personnelIdentificationTypeData:any;
  trader_title:string;
  personnel_id:number;
  district_id:number;
  region_id:number;
  country_id:number;
  personnel_QualificationData:any;
  personnel_type_id:number;
  app_resp:any;
  isPersonnelPopupVisible:boolean;
  is_local_agent:boolean;
  isRegistrantDetailsWinshow:boolean= false;
  isReadOnlyTraderasLtr:boolean=false;
  premises_resp:any;
  isperssonelAddPopupVisible:boolean;
  loading:boolean;
  constructor(public cdr: ChangeDetectorRef,public httpClient: HttpClient,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {

  }
  ngOnInit() {
    this.onLoadPremisesStaffDetails();
    this.onpersonnelIdentificationTypeDataLoad();
  }  
  funcSearchRegistrantDetails(is_local_agent) {

    //  this.spinner.show();

        this.isStaffPopupVisible = true;
        if (is_local_agent == 1) {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Other Premises';
        }
        else {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Product Registrant';
        }
        let me = this;
        this.traderAccountsDetailsData.store = new CustomStore({
          load: function (loadOptions: any) {
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;//searchValue
              var headers = new HttpHeaders({
                "Accept": "application/json",
                "Authorization": "Bearer " + me.authService.getAccessToken(),
              });
            
              this.configData = {
                headers: headers,
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,is_local_agent:is_local_agent }
              };
              return me.httpClient.get(AppSettings.base_url + 'productregistration/getTraderInformationDetails',this.configData)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });

          }
      });
    
     // this.traderAccountsDetailsData.load();

  }

  funcEditPersonnelDetails(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.premisesStafflDetailsfrm.patchValue(data.data);

    this.premisesStafflDetailsfrm.patchValue(data.data);
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.onLoadPersonnerQualifationsDetails(data.data.personnel_id);
    this.personnel_id = data.data.personnel_id;

  }      
  // funcSelectStaffDetails(data){
  //   this.premisesStafflDetailsfrm.patchValue(data.data);
  //     this.isStaffPopupVisible= false;         
  // }
  funcSelectTraderDetails(data) {
        let record = data.data;
        
          this.premisesStafflDetailsfrm.get('local_agent_name').setValue(record.trader_name);
          this.premisesStafflDetailsfrm.get('local_agent_id').setValue(record.id);
          this.isStaffPopupVisible = false;
      }





  onSearchStaffDetails() {
      this.appService.onLoadPremisesStaffDetails({})
        .subscribe(
          data_response => {
            this.isStaffPopupVisible = true;
            this.staffDetailsData = data_response.data;
          },
          error => {
            return false
      


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
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, '',is_readonly);
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
  onLoadPremisesStaffDetails() {

    this.appService.onLoadPremisesStaffDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }
  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_staff';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Staff Details');

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
                    
                      this.onLoadPremisesStaffDetails();

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
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
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
      this.premisesStafflDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
    //reload the qualifications and documents
    this.personnel_id = data.data.id;
    }
    
    
    this.isPersonnelPopupVisible = false;
    
  }onPremisesPersonnelToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddPremisesPersonnelDetails, 'Add Pharmaceutical Business if any',is_readonly);
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
  onTraderasContactpersonChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasLtr = true;

    }else{
      this.isReadOnlyTraderasLtr = false;
    }
    

  }
  funAddPremisesPersonnelDetails() {
  
    this.premisesStafflDetailsfrm.reset();
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.personnel_id = 0;
    this.personnel_QualificationData = {};

  }
 
    
  onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
        let table_name;
        table_name = 'tra_staff_information';
        let name = this.newPremisesStafflDetailsfrm.get('name').value;
        let email_address = this.newPremisesStafflDetailsfrm.get('email_address').value;
        let telephone_no = this.newPremisesStafflDetailsfrm.get('telephone_no').value;
        let postal_address = this.newPremisesStafflDetailsfrm.get('postal_address').value;

        this.utilityService.onAddPersonnDetails(table_name, this.newPremisesStafflDetailsfrm.value)
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
                  this.premisesStafflDetailsfrm.patchValue({ personnel_id: this.app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
                }
                this.isaddNewPremisesPersonnelDetails = false;
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
  onSavePremisesStaffDetails() {
    if (this.premisesStafflDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesStaffDetails(this.premisesStafflDetailsfrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isBusinessPersonnelPopupVisible = false;
            this.isperssonelAddPopupVisible = false;

            this.onLoadPremisesStaffDetails();

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
}
