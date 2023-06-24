import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AuthService } from 'src/app/services/auth.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-meddev-generaldetails',
  templateUrl: './meddev-generaldetails.component.html',
  styleUrls: ['./meddev-generaldetails.component.css']
})
export class MeddevGeneraldetailsComponent implements OnInit {
  @Input() productGeneraldetailsfrm:FormGroup;
  @Input() devicesTypeData:any;
  @Input() classificationData:FormGroup;
  @Input() commonNamesData:any;
  @Input() intendedEndUserData:FormGroup;
  @Input() productTypeData:FormGroup;
  @Input() durationDescData:FormGroup;
  @Input() confirmDataParam:FormGroup;
  @Input() is_local_agent:boolean;
  @Input() trader_title:string;
  @Input() traderAccountsDetailsData:any;
  @Input() isRegistrantDetailsWinshow:boolean;
  @Input() zonesData:any;
  @Input() product_id:number;
  @Input() section_id:number;
  
  @Input() gmdnCategoryData:any;
  @Input() localagent_optionDisabled:number;
 
  isReadOnly:boolean;
  
  isnewmanufacturerModalShow:boolean= false;
  manufacturerFrm:FormGroup;
  isManufacturerSitePopupVisible:boolean=false;
  product_resp:any;
  isproductManufacturerModalShow:boolean=false;
  country_id:number;
  countries:any;
  regions:any;
  districts:any;
  gmdnCodeData:any;
  reasonForClassificationData:any;
  manufacturersData:any = {};targetSpeciesData:any;
  sectionData:any;
  
  addproductGenericNamesModal:boolean = false;
  addproductGenericNamesFrm:FormGroup;
  constructor(public viewRef: ViewContainerRef,  private configService:ConfigurationsService, public utilityService:Utilities, private spinner:SpinnerVisibilityService, private authService:AuthService, private appService:ProductApplicationService, private router:Router, private config:ConfigurationsService, public toastr: ToastrService,public httpClient: HttpClient) {
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))

    });
    this.addproductGenericNamesFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      therapeutic_code: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
   this.onLoadGmdnCodeData(4);
    
 }
  ngOnInit() {
    this.onLoadCountries();
    this.onLoadtargetSpecies();
    this.onLoadSectionData();
    if(!this.product_id){
        this.productGeneraldetailsfrm.get('classification_id').setValue(365);
        this.productGeneraldetailsfrm.get('zone_id').setValue(2);
        this.productGeneraldetailsfrm.get('shelflifeduration_desc').setValue(1);
    }
  }  onLoadtargetSpecies() {
    var data = {
      table_name: 'par_target_species'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.targetSpeciesData = data;
        });
  }
  onLoadSectionData() {
    var data = {
      table_name: 'par_sections'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionData = data;
        });
  }
  
  funcSelectTraderDetails(data) {
    let record = data.data;
    this.productGeneraldetailsfrm.get('local_agent_name').setValue(record.trader_name);
    this.productGeneraldetailsfrm.get('local_agent_id').setValue(record.id);
    
    this.isRegistrantDetailsWinshow = false;

  } onLoadreasonForClassificationData(device_type_id,classification_id) {
    var data = {
      table_name: 'par_product_classificationrules',
      classification_id: classification_id,
      device_type_id:device_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForClassificationData = data;
        });
  }
  funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.productGeneraldetailsfrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
    this.isManufacturerSitePopupVisible = false;

  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
 onAddNewCommonNameDetails(){
    this.addproductGenericNamesFrm.reset();
    this.addproductGenericNamesModal = true;
   console.log('tests');
  }
  
  onSaveNewGenericName(){
    this.addproductGenericNamesFrm.get('tablename').setValue('par_common_names')
    this.addproductGenericNamesFrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addproductGenericNamesFrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadCommonNames(this.section_id);
         
          this.addproductGenericNamesModal = false;
          this.productGeneraldetailsfrm.get('common_name_id').setValue(this.product_resp.record_id)
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
  onLoadCommonNames(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNamesData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
        });
  }
  funcSearchRegistrantDetails(is_local_agent) {

    this.appService.getProductsOtherDetails({ is_local_agent: is_local_agent }, 'getTraderInformationDetails')
      .subscribe(
        data => {
          if (data.success) {
            if (is_local_agent == 1) {
              this.is_local_agent = is_local_agent;
              this.trader_title = 'Local Representative';

            }
            else {
              this.is_local_agent = is_local_agent;
              this.trader_title = 'Product Registrant';
            }
            this.traderAccountsDetailsData = data.data;
            this.isRegistrantDetailsWinshow = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name').value;
    this.appService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          if (this.product_resp.success) {
            this.isnewmanufacturerModalShow = false;
            this.isproductManufacturerModalShow = false;
            let manufacturer_id =this.product_resp.record_id;
            //load Manufactureing Sites 
            this.productGeneraldetailsfrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
     
           this.isManufacturerSitePopupVisible = false;

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
  
  onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
      location: 'after',
      widget: 'dxButton',
      hidden: true
    });
  }
  funcAddManufacturerSite() {
    this.isnewmanufacturerModalShow = true;
    this.manufacturerFrm.reset();
  }
  onRegionsCboSelect($event) {
   
    this.onLoadDistricts($event.selectedItem.id);

  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      // id: 36
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
  funcSearchManufacturingSite() {

        this.isManufacturerSitePopupVisible = true;
        var me = this;
       

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
  }onLoadGmdnCodeData(section_id) {
    var data = {
      table_name: 'par_gmdn_codes',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmdnCodeData = data;
        });
  }
 
  
  ongmdnCodeDataSelect($event) {
  
    this.productGeneraldetailsfrm.get('gmdn_term').setValue($event.selectedItem.description);
    
  }
  onclassificationDevTypeDataSelect($event) {
    let device_type_id =  this.productGeneraldetailsfrm.get('device_type_id').value;
    let classification_id =  this.productGeneraldetailsfrm.get('classification_id').value;
    this.onLoadreasonForClassificationData(device_type_id,classification_id);
  }
}
