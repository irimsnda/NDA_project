

import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

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

@Component({
  selector: 'app-premises-generaldetails',
  templateUrl: './premises-generaldetails.component.html',
  styleUrls: ['./premises-generaldetails.component.css']
})
export class PremisesGeneraldetailsComponent  implements OnInit {

  @Input() premisesGeneraldetailsfrm: FormGroup;
  @Input() sectionsData: any;
  @Input() premisesTypeData: any;
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() businessTypesData: any;
  @Input() businessScaleData: any;
  @Input() businessCategoryData: any;
  @Input() zoneData: any;
  @Input() confirmDataParam: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() tra_premise_id: number;
  @Input() registered_id: number;
  @Input() premPersonnelDetailsData: any;
  @Input() supervisingDetailsData: any = {};

  @Input() isReadOnlyTraderasContact: boolean;
  @Input() is_readonly: boolean;
  @Input() payingCurrencyData: boolean;
  @Input() fastTrackOptionsData: boolean;
  @Input() isSupervisorPopupVisible: boolean;
  @Input() premise_id: number;
  @Input() classificationData: any;

  region_id:number;
  country_id:number;
  personnel_type_id:number;
  personnel_informationData:any;
  isPersonnelPopupVisible:boolean;
  section_id:number;
  businessTypeDetailsData:any;
  business_type_id:number;
  isaddNewPremisesPersonnelDetails:boolean=false;
  isDisabledVehicleReg:boolean;
  @Output() businessTypeEvent = new EventEmitter();
  
  @Input() newPremisesPersonnelDetailsFrm: FormGroup;
  app_resp:any;
  businesstypeCategoriesData:any;
  premiseClassData:any;
  isSectionHidden:boolean=false;
  sectorsData:any;
  district_id:number;
  cellsData:any;
  sector_id:number;
  registeringOrganisationData:any;
  has_otherregisteringorganisation:boolean= false
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {


  }

  ngOnInit() {
   // this.onBusinessTypesLoad(this.section_id);
    this.onregisteringOrganisationDataLod();
    this.onLoadclassificationData();
    this.onLoadSections();
    this.onLoadBusinessTypesLoad();
    this.is_readonly = false;
    if(this.sub_module_id != 1){
      this.is_readonly = true;
    }
   
    if(!this.application_code){
      //  this.premisesGeneraldetailsfrm.get('zone_id').setValue(2);
        this.premisesGeneraldetailsfrm.get('country_id').setValue(37);
    }
    
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
   onLoadSections() {
    var data = {
      table_name: 'par_premise_class',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premiseClassData = data;
        });
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

  
  onREgOrganisationCboSelect($event) {
    
    let is_other_config = $event.selectedItem.is_other_config;
    if(is_other_config ==1){
      this.has_otherregisteringorganisation = true;

    }
    else{

      this.has_otherregisteringorganisation = false;

    }
   

  }
  onCategoriesDataCboSelect($event) {
    
    this.business_type_id = $event.value;
    
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
  onLoadSectors(district_id) {
    var data = {
      table_name: 'par_sectors',
      district_id: district_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.sectorsData = data
        },
        error => {
          return false;
        });
  }
  onLoadCells(sector_id) {
    var data = {
      table_name: 'par_cells',
      sector_id: sector_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.cellsData = data
        },
        error => {
          return false;
        });
  }
  
  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
 
  onLoadclassificationData() {
    var data = {
      table_name: 'par_classifications',
     // section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }
  
  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    this.onLoadSectors(this.district_id);

  }
  oSectorsCboSelect($event) {
    this.sector_id = $event.selectedItem.id;

    this.onLoadCells(this.sector_id);

  }

  
  onTraderasContactpersnChange($event) {
    
    if($event.selectedItem.id == 1){
        this.isReadOnlyTraderasContact = true;

    }else{
      this.isReadOnlyTraderasContact = false;
    }
    

  } onPersonnelSearchDetails(personnel_type_id) {
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

  }onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add Personnel',is_readonly);
  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
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
  onPremisesTypeSelect($event){

    if($event.value == 1){

      this.isDisabledVehicleReg = true;
    }
    else{
      this.isDisabledVehicleReg = false;

    }
  }
  // onSectionsCboSelect($event) {
  //   this.onBusinessTypesLoad($event.value)
  //  // this. OnLoadBusinesstypeCategories($event.value);

  // }
    onLoadPremisesPersonnelDetails() {

    this.appService.onLoadPremisesPersonnelDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }
  
  onLoadBusinessTypesLoad() {

    var data = {
      table_name: 'par_business_types',
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
   funcSelectSupervisingDetails(data){
    this.premisesGeneraldetailsfrm.patchValue(data.data);
      this.isSupervisorPopupVisible= false;         
  }

   onSearchSupervisingDetails() {
      this.appService.onLoadPremisesPersonnelDetails({})
        .subscribe(
          data_response => {
            this.isSupervisorPopupVisible = true;
            this.supervisingDetailsData = data_response.data;
          },
          error => {
            return false
      


       });
  }
  OnLoadBusinesstypeCategories(section_id) {

    var data = {
      table_name: 'par_businesstype_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businesstypeCategoriesData = data;
        },
        error => {
          return false
        });
  }
  onregisteringOrganisationDataLod() {

    var data = {
      table_name: 'par_registering_organisations'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registeringOrganisationData = data;
        },
        error => {
          return false
        });
  }
  
  funcSelectPremisePersonnel(data) {
      this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name})
    
       this.isPersonnelPopupVisible = false;
    
  } onSaveNewPremisesPersonnelDetails() {
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
              this.app_resp = response.json();
              //the details 
              if (this.app_resp.success) {
                
                  this.toastr.success(this.app_resp.message, 'Response');
      
                  this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name})
                
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
      } funcpopWidth(percentage_width) {
        return window.innerWidth * percentage_width/100;
      }
}
