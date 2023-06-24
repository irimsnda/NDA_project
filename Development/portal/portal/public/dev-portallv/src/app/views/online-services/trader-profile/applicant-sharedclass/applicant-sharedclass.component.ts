import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from 'ng2-archwizard';
@Component({
  selector: 'app-applicant-sharedclass',
  templateUrl: './applicant-sharedclass.component.html',
  styleUrls: ['./applicant-sharedclass.component.css']
})
export class ApplicantSharedclassComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  trader_profile: FormGroup;
  countries: any;
  regions: any;
  districts: any;
  account_resp:any;
  trader_categories: any;
  country_id:number;
  region_id:number;
  district_id:number;
  is_readOnly:boolean= true;
  accountTypesData:any;
  isTPinNumberEnabled:boolean= false;
  isPacroNumberEnabled:boolean= false;
  is_local:any;
  isReadOnly:boolean =true;
  message:any;

  
  status_id: number = 1;
  sub_module_id:number = 88;
  module_id:number= 26;
  document_type_id:number = 33;
  customer_account_id:number;
  constructor(private config:ConfigurationsService,private accountService:AccountManagementService,private accountManagementService: AccountManagementService,private spinner: SpinnerVisibilityService,public toastr: ToastrService) {
    this.trader_profile = new FormGroup({
      name: new FormControl('', Validators.compose([])), pacra_no: new FormControl('', Validators.compose([])),
      tpn_no: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl(this.region_id, Validators.compose([])),
      district_id: new FormControl(this.district_id, Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      trader_category_id: new FormControl('', Validators.compose([])),
      tin_certificate: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([])),
      traderaccount_type_id: new FormControl('', Validators.compose([Validators.required])),
      contact_person_telephone: new FormControl('', Validators.compose([Validators.required])),
      contact_person_email: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([Validators.required])),
      
    });
    
    this.onLoadCountries();
    this.onLoadDistricts();
    this.onLoadAccountTypesData();
    this.onLoadTraderInformaton();


   }
  
  ngOnInit() {
   
  }
  onLoadAccountTypesData() {

    var data = {
      table_name: 'par_traderaccount_types'
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.accountTypesData = data;
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
  onLoadDistricts() {
    var data = {
      table_name: 'par_districts'
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
  onLoadTraderInformaton() {

    this.accountService.onGetTraderInformation()
      .subscribe(
        data => {
          if(data.success){
            this.trader_profile.patchValue(data.data)
            this.region_id = data.data.region_id;
            this.district_id = data.data.district_id;
            this.customer_account_id  == data.data.id;
          }
        },
        error => {
          return false;
        });
  }
  //onLoad Details 
  onCoutryCboSelect($event) {
    
    if($event.selectedItem.id){
      this.is_local = $event.selectedItem.is_local;
      let account_type_id = this.trader_profile.get('traderaccount_type_id').value;

      this.onLoadRegions($event.selectedItem.id);
        //if value is tanzania disable tin and upload
      if(this.is_local){
        this.isTPinNumberEnabled = true;
        this.isPacroNumberEnabled = false;
        this.trader_profile.addControl('tpn_no',new FormControl('', Validators.required));
        this.trader_profile.addControl('pacra_no',new FormControl('',Validators.compose([]) ));
        if(account_type_id == 1){
          this.isPacroNumberEnabled = true;
          this.trader_profile.addControl('pacra_no',new FormControl('', Validators.required));
        }
      }
      else{
        this.isTPinNumberEnabled = false;
        this.isPacroNumberEnabled = false;
        this.trader_profile.addControl('tpn_no',new FormControl('', Validators.compose([])));
        
        this.trader_profile.addControl('pacra_no',new FormControl('', Validators.compose([])));
      }
     
    }
    
    
  }
  onRegionsCboSelect($event) {
    
   
  }
  onUpdateTraderAccount() {

    if (this.trader_profile.invalid) {
      return;
    }
    this.spinner.show();
    
    this.accountManagementService.onCreateAccount(this.trader_profile.value,'','onUpdateTraderAccountDetails')
      //.pipe(first())
      .subscribe(
        response => {
            this.account_resp = response.json();
            if(this.account_resp.success){
              this.message = this.account_resp.message;
              this.toastr.success(this.message, 'Response');
              this.wizard.model.navigationMode.goToStep(1);
            }else{
              this.message = this.account_resp.message;
              this.toastr.error(this.message, 'Alert');
            }
            this.spinner.hide();
        },
        error => {
          this.toastr.success('Error occurred!', 'Response');
          this.spinner.hide();
        });
  }
}
