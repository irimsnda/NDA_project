import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input,ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter  } from '@angular/core';
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
import { HttpClient,HttpHeaders } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-gmp-generaldetails',
  templateUrl: './gmp-generaldetails.component.html',
  styleUrls: ['./gmp-generaldetails.component.css']
})
export class GmpGeneraldetailsComponent implements OnInit {
  
  @Input() gmpapplicationGeneraldetailsfrm: FormGroup;
  @Input() assessmentProcedureData: any;
  @Input() sectionsData: any;
  @Input() manufacturingSiteLocationSet: any = true;
  @Input() countries: any;
  @Input() gmpLocationData: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() businessTypesData: any;
  @Input() zoneData: any;
  @Input() confirmDataParam: any;

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() man_site_id: number;
  @Input() ltr_id: number;
  @Input() manufacturing_site_id: number;
  @Input() premise_id: number;
  @Input() registered_id: number;

  @Input() isReadOnlyTraderasContact: boolean;
  @Input() is_readonly: boolean;
  
  @Input() isPersonnelPopupVisible: boolean;
  @Input() personnel_informationData: any;
  @Input() isaddNewPremisesPersonnelDetails: boolean;
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  
  @Input()  traderAccountsDetailsData:any = {};
  @Input() ispremisesSearchWinVisible: boolean;
  @Input() isManufacturerPopupVisible: boolean;
  @Input() registered_premisesData: any;
  @Input() manufacturersSiteData: any = {};

  @Input() fastTrackOptionsData: any;
  
  @Input() payingCurrencyData: any;
  @Input() gmp_type_id: number;
  @Input() section_id: number;
  
  
  manufacturersData:any = {};
  isproductManufacturerModalShow:boolean=false;
  @Output() businessTypeEvent = new EventEmitter();
  region_id:number;
  country_id:number;
  personnel_type_id:number;
  auto:any;
  businessTypeDetailsData:any;
  business_type_id:number;
  is_local_agent:boolean;
  trader_title:string;
  isgmpapplicationSearchWinVisible:boolean=false;
  devicesTypeData:any;
  isReadOnlyTraderasContactPerson:boolean;
  isAddNewManufacturingSite:boolean = false;
  manufacturerFrm:FormGroup;
  isReadOnlyTraderasLtr:boolean = false;
  is_local:number;
  trader_aslocalagent:number;
  isRegistrantDetailsWinshow:boolean= false;
  gmpAssessmentCountriesDta:any;
  assessment_procedure_id:number;
  hasCountriesSelection:boolean;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 

    let user_details = this.authService.getUserDetails();
    
    this.is_local = user_details.is_local;
    if (this.is_local == 1) {
      this.isReadOnlyTraderasLtr = true;
    }

    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      mansite_name: new FormControl('', Validators.compose([Validators.required])),
      mansitecountry_id: new FormControl('', Validators.compose([Validators.required])),
      mansiteregion_id: new FormControl('', Validators.compose([])),
      mansiteemail_address: new FormControl('', Validators.compose([Validators.required])),
      mansitepostal_address: new FormControl('', Validators.compose([Validators.required])),
      mansitetelephone_no: new FormControl('', Validators.compose([Validators.required])),
      mansitephysical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      
    });

  }
  onAssessmentCboSelect($event) {
    
    if($event.selectedItem.id){
      this.assessment_procedure_id = $event.selectedItem.id;

      if(this.assessment_procedure_id == 2 || this.assessment_procedure_id == 5){
          this.hasCountriesSelection = false;
          this.onLoadCountriesLists(this.assessment_procedure_id) 

      }else{
        this.hasCountriesSelection = false;
        this.gmpapplicationGeneraldetailsfrm.get('gmpassessment_countries_ids').setValue("");
      }
    }
  }

  onLoadCountriesLists(gmp_assessment_id) {

    var data = {
      table_name: 'par_gmpassessmentprocedure_countries',
      gmp_assessment_id: gmp_assessment_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.gmpAssessmentCountriesDta = data;
        },
        error => {
          return false
        });
  }
  ngOnInit() {
    this.onLoaddevicesTypeData(this.section_id);
    if(this.sub_module_id == 5){
      this.manufacturingSiteLocationSet = true;
    }
    else{
      this.manufacturingSiteLocationSet = false;
    }

  }
  onCoutryCboSelect($event) {
    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  } // this.onLoaddevicesTypeData(section_id)

  onLoaddevicesTypeData(section_id) {
    //
    var data = {
      table_name: 'par_device_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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
  } onBusinesTypeCboSelect($event) {
    
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
    this.businessTypeEvent.emit(this.business_type_id);


  }
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_type_details',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
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
  onRegionsCboSelect($event) {
    if($event.selectedItem.id){
      this.region_id = $event.selectedItem.id;

      this.onLoadDistricts(this.region_id);
    }
   

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

  }onSearchManufacturingSite() {
    this.isManufacturerPopupVisible = true;
    let me = this;
    this.manufacturersSiteData.store = new CustomStore({
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
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
            };
            return me.httpClient.get(AppSettings.base_url + 'gmpinspection/getManufacturingSiteInformation',this.configData)
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
  }
  onAddManufacturingSite(){
      this.isAddNewManufacturingSite = true;
  }
  onManDetailPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'add',
          text: 'New Manufacturing Site',
          type: 'default',
          onClick: this.onAddManufacturingSite.bind(this)
        }
      });
  }
  funcSearchRegistrantDetails(is_local_agent) {
   
        this.isRegistrantDetailsWinshow = true;
        if (is_local_agent == 1) {
          this.is_local_agent = is_local_agent;
          this.trader_title = 'Local Representative';
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
    
      //this.traderAccountsDetailsData.load();
/*
    this.appService.getGMPDataDetails({ is_local_agent: is_local_agent }, 'productregistration/getTraderInformationDetails')
      .subscribe(
        data => {
          if (data.success) {
            if (is_local_agent == 1) {
              

            }
            else {
              this.is_local_agent = is_local_agent;
              this.trader_title = 'Product Registrant';
            }

            this.traderAccountsDetailsData = data.data;
            this.modalService.getModal('traderAccountsDetailsModal').open();
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
        */
  }
  //isManufacturerPopupVisible
 
  onTraderasContactpersnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyTraderasContactPerson = true;

    }else{
      this.isReadOnlyTraderasContactPerson = false;
    }
    

  }
  
  funcSelectPremisePersonnel(data) {
    if(this.personnel_type_id == 1){
      this.gmpapplicationGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    }
   
    
    this.isPersonnelPopupVisible = false;
    
  }
  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value)
  }
  onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id,
      is_manufacturer:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypesData = data;
        },
        error => {
          return false
        });
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
      funcSelectTraderDetails(data) {
        let record = data.data;
        
          this.gmpapplicationGeneraldetailsfrm.get('local_agent_name').setValue(record.trader_name);
          this.gmpapplicationGeneraldetailsfrm.get('local_agent_id').setValue(record.id);
          this.isRegistrantDetailsWinshow = false;
      }
      funcSelectPremiseDetails(data){
        this.gmpapplicationGeneraldetailsfrm.patchValue(data.data);
         this.ispremisesSearchWinVisible= false;
         this.isgmpapplicationSearchWinVisible = false;
         
  }    
  funcSelectManData(data){
    this.manufacturerFrm.patchValue(data.data);
    this.manufacturerFrm.patchValue({manufacturer_id:data.data.id});
    this.isproductManufacturerModalShow = false;
  }
  funcSelectManufacturer(data) {
    if (this.gmp_type_id == 2) {
      let resp_data = data.data;
      this.gmpapplicationGeneraldetailsfrm.patchValue({manufacturer_name:resp_data.manufacturer_name,man_site_id:resp_data.man_site_id});
      this.gmpapplicationGeneraldetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:2});
    }
    else {
      this.gmp_type_id = 1
      this.gmpapplicationGeneraldetailsfrm.patchValue(data.data);
      
      this.gmpapplicationGeneraldetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:1});
     

    }
     
    this.isManufacturerPopupVisible = false;
  }
  onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add New Personnel',is_readonly);
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
  

  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }

  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name').value;
    this.utilityService.onsaveApplicationUniformDetails('',  this.manufacturerFrm.value,'saveManufacturerSiteFulldetails')
      .subscribe(
        response => {
          let resp = response.json();
          //the details 
          if (resp.success) {
            //  the record 
            this.gmpapplicationGeneraldetailsfrm.patchValue(resp.record);
      
             this.gmpapplicationGeneraldetailsfrm.patchValue({section_id:this.section_id,gmp_type_id:1});

            this.isAddNewManufacturingSite = false;
            this.isManufacturerPopupVisible = false;
            this.toastr.success(resp.message, 'Response');
  
          } else {
            this.toastr.error(resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
        
  }
 
  onSearchManufacturer() {
this.isproductManufacturerModalShow= true;
  let me = this;
  this.manufacturersData.store = new CustomStore({
    load: function (loadOptions: any) {
      console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });
      
        this.configData = {
          headers: headers,
          params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
        };
        return me.httpClient.get(AppSettings.base_url + 'productregistration/getManufacturersInformation',this.configData)
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
}
}
