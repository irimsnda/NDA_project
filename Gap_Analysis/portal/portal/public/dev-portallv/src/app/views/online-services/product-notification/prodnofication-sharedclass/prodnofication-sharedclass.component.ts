import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AppSettings } from 'src/app/app-settings';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-prodnofication-sharedclass',
  templateUrl: './prodnofication-sharedclass.component.html',
  styleUrls: ['./prodnofication-sharedclass.component.css']
})
export class ProdnoficationSharedclassComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  productapp_details:any;
  productGeneraldetailsfrm:FormGroup;
  section_id:number;
  sub_module_id:number;
  devicesTypeData:any;
  classificationData:any;
  
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  commonNamesData:any;
  intendedEndUserData:any;
  durationDescData:any;
  zonesData:any;
  confirmDataParam:any;
  is_local_agent:boolean;
  trader_title:string;
  traderAccountsDetailsData:any;
  isRegistrantDetailsWinshow:boolean = false;
  module_id:number;
  process_title:string;
  product_id:number;
  tracking_no:string;
  status_name:string;
  status_id:number;
  application_code:number;
  country_id:number;
  trader_id:number;
  trader_name:string;
  mistrader_id:number;
  is_local:number;
  trader_aslocalagent:number;
  localagent_optionDisabled:boolean=true;
  
  loading: boolean;
  product_resp:any;
  isManufacturerSitePopupVisible:boolean= false;

  manufacturersData:any = {};
  isManufacturerPopupVisible:boolean = false;
  initWizardPanel :number=0;
  terms_conditions:any;
  checkProductsSubmission:boolean;
  app_route:any;
  
  base_url = AppSettings.base_url;
  isnewmanufacturerModalShow:boolean = false;
  isproductManufacturerModalShow:boolean = false;
  manufacturerFrm:FormGroup;
  mis_url = AppSettings.mis_url;
  countries: any;
  regions: any;
  districts: any;
  productTypeData:any;
  initqueryresponsefrm:FormGroup;
  action_url:string;
  applicationPreckingQueriesData:any;
  query_sectioncheck:string;
  isInitalQueryResponseFrmVisible:boolean = false;
  gmdnCategoryData:any;
  prodclass_category_id:number;
  onApplicationSubmissionFrm:FormGroup;
  
  constructor(public viewRef: ViewContainerRef,  public configService:ConfigurationsService, public utilityService:Utilities, public spinner:SpinnerVisibilityService, public authService:AuthService, public appService:ProductApplicationService, public router:Router, public config:ConfigurationsService, public toastr: ToastrService,public httpClient: HttpClient) {
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
      this.onApplicationSubmissionFrm = new FormGroup({
        paying_currency_id: new FormControl('', Validators.compose([])),
        is_fast_track: new FormControl('', Validators.compose([])),
        submission_comments:new FormControl('', Validators.compose([]))
      });
      
      this.productGeneraldetailsfrm = new FormGroup({
        section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
        sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
        common_name_id: new FormControl('', Validators.compose([Validators.required])),
        classification_id: new FormControl('', Validators.compose([Validators.required])),
        brand_name: new FormControl('', Validators.compose([Validators.required])),
        zone_id: new FormControl('', Validators.compose([])),
        intended_enduser_id: new FormControl('', Validators.compose([Validators.required])),
        intended_use: new FormControl('', Validators.compose([Validators.required])),
        gmdn_code: new FormControl('', Validators.compose([])),
        physical_description: new FormControl('', Validators.compose([])),
        gmdn_term: new FormControl('', Validators.compose([])),
        gmdn_category: new FormControl('', Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([Validators.required])),
        shelf_life: new FormControl('', Validators.compose([])),
        shelflifeduration_desc:new FormControl('', Validators.compose([])),
        product_id: new FormControl('', Validators.compose([])),
        trader_aslocal_agent: new FormControl('', Validators.compose([])),
        local_agent_id: new FormControl('', Validators.compose([])),
        manufacturer_id: new FormControl('', Validators.compose([Validators.required])),
        local_agent_name: new FormControl('', Validators.compose([])),
        manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
        product_origin_id: new FormControl('', Validators.compose([Validators.required])),
        prodclass_category_id: new FormControl('', Validators.compose([Validators.required])),
        product_strength: new FormControl('', Validators.compose([])),
        target_species_id: new FormControl('', Validators.compose([])),
        
        reason_for_classification_id: new FormControl('', Validators.compose([]))
      });
      this.initqueryresponsefrm = new FormGroup({
        queries_remarks: new FormControl('', Validators.compose([Validators.required])),
        response_txt: new FormControl('', Validators.compose([Validators.required])),
        id: new FormControl('', Validators.compose([])),
        query_id: new FormControl('', Validators.compose([]))
      });
     
    let user_details = this.authService.getUserDetails();
    this.country_id = user_details.country_id;
    this.trader_id = user_details.trader_id;
    this.trader_name = user_details.company_name;
    this.mistrader_id =  user_details.mistrader_id;
    this.is_local = user_details.is_local;
    if (this.is_local == 1) {
      this.trader_aslocalagent = 1;
    }
    this.productapp_details = this.appService.getProductApplicationDetail();
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/prodnotificationreg-dashboard']);
      return;
    }
    else {
      this.section_id = this.productapp_details.section_id;
      this.sub_module_id = this.productapp_details.sub_module_id;
      
      this.module_id = this.productapp_details.module_id;
      this.process_title = this.productapp_details.process_title;
      this.product_id = this.productapp_details.product_id;
      this.tracking_no = this.productapp_details.tracking_no;
      this.status_name = this.productapp_details.status_name;
      this.status_id = this.productapp_details.status_id;
      this.prodclass_category_id = this.productapp_details.prodclass_category_id;
      this.application_code = this.productapp_details.application_code;
    }
   
    if (this.productapp_details.product_id) {
      
      this.productGeneraldetailsfrm.patchValue(this.productapp_details);
      if (this.is_local == 1) {
        this.localagent_optionDisabled = true;
        this.productGeneraldetailsfrm.patchValue({  trader_aslocal_agent: 1 })
        //deiable field
      }
      else {
        this.localagent_optionDisabled = false;
        this.productGeneraldetailsfrm.patchValue({ trader_aslocal_agent: 0 })
  
      }
    }else{
          //reload the other stores
          this.productGeneraldetailsfrm.patchValue(this.productapp_details);
        
        if (this.is_local == 1) {
         
          this.localagent_optionDisabled = true;
          this.productGeneraldetailsfrm.patchValue({ local_agent_name: this.trader_name, local_agent_id: this.trader_id, trader_aslocal_agent: 1 })
          //deiable field
        }
        else {
          this.localagent_optionDisabled = false;
          this.productGeneraldetailsfrm.patchValue({ local_agent_name: 'Select Local Agent', local_agent_id: '', trader_aslocal_agent: 0 })
    
        }
       
    }
    this.autoLoadedParameters(this.section_id);
    if(this.status_id != 1){
      
    this.funcReloadQueriesDetails();
    }
   }

  ngOnInit() {
    
  }
  
  onProductDashboard() {
    //check for unsaved changes 

    this.router.navigate(['../online-services/prodnotificationreg-dashboard']);

  }
  onLoadProductType() {
    var data = {
      table_name: 'par_product_origins'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeData = data;
        });
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }

  autoLoadedParameters(section_id) {
    this.onLoadZones();
    this.onLoadconfirmDataParm();
    this.onLoadCommonNames(section_id);
    this.onLoadClassifications(section_id);
    this.onLoaddevicesTypeData(section_id);

    this.onLoadintendedEndUserData(section_id);
    this.onLoaddurationDescData();
    this.onLoadProductType();
    this.onLoadCountries();
    this.onLoadgmdnCategoryData(section_id)
  }
  onLoadgmdnCategoryData(section_id) {
    var data = {
      table_name: 'par_gmdn_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmdnCategoryData = data;
        });
  }
  onLoaddevicesTypeData(section_id) {
    //
    var data = {
      table_name: 'par_device_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.devicesTypeData = data;
        });
  }
  onLoadClassifications(section_id) {
    var data = {
      table_name: 'par_classifications',
        prodclass_category_id:this.prodclass_category_id,
      is_notification:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
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

  onLoadintendedEndUserData(section_id) {
    var data = {
      table_name: 'par_intended_enduser'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.intendedEndUserData = data;
        });
  }onLoaddurationDescData() {

    var data = {
      table_name: 'par_timespan_defination',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.durationDescData = data;
        });

  } onLoadZones() {
    var data = {
      table_name: 'par_zones',
      is_hq:1
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zonesData = data;
        });
  }onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }
 
  onSaveMedicalDevicesNotification(){
    
    const invalid = [];
    const controls = this.productGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.productGeneraldetailsfrm.invalid) {
      return;
    }
  this.spinner.show();
    this.appService.onSaveProductNotification(this.productGeneraldetailsfrm.value,'onSaveMedicalProductNotification')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 

         
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.product_id = this.product_resp.product_id;
            this.application_code = this.product_resp.application_code;
      
            this.productGeneraldetailsfrm.patchValue({ product_id: this.product_id})
            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });

  }
  
  onMovePreviousWizard(previous_step) {
    this.wizard.model.navigationMode.goToStep(previous_step);

  }
  onMoveNextWizard(nextStep) {
    
    if (nextStep == 1+this.initWizardPanel) {
        this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 2+this.initWizardPanel) {
        this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 3+this.initWizardPanel) {
        //validate the datasets 
        this.wizard.model.navigationMode.goToStep(nextStep);
        
    }
  }
  funcValidateDocumentsUpload(nextStep){
    this.spinner.show();
   
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_product_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
        
          this.wizard.model.navigationMode.goToStep(nextStep);
         
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        
        this.spinner.hide();
      });
    
  }
  newProductTermscheckbox(e) {

    this.checkProductsSubmission = e.value;

  }
  onLoadGuidelines(sub_module_id, section_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id, section_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onProductApplicationSubmit() {
    this.app_route = ['./online-services/prodnotificationreg-dashboard'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_product_applications', this.app_route)
  }
  onApplicationPrint(){
    
  }
  onNotificationsProductsApplicationPrint(){
    let report_url = this.mis_url+'reports/generateProductsNotificationRpt?application_code='+this.application_code;
    this.funcGenerateRrp(report_url,"Application Details");

  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

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
  funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalQueryResponseFrmVisible = true;
  
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
  }funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_product_applications')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
    
    this.action_url  = 'onSavePrecheckingqueryresponse';
   
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value,this.action_url)
      .subscribe(
        response => {
          this.product_resp = response.json();
          if (this.product_resp.success) {
            this.toastr.success(this.product_resp.message, 'Response');
            
            this.initqueryresponsefrm.get('query_id').setValue(this.product_resp.record_id)
            this.funcReloadQueriesDetails();
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } 
  funcReloadQueriesDetails(){

    this.funcgetPreckingQueriesData();
    
  }
  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_product_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
}
