import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Countriesmdl } from '../../../models/countriesmdl.model';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AccountManagementService } from '../../../services/account_management/account-management.service';
import { ConfigurationsService } from '../../../services/shared/configurations.service';

import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AppSettings } from 'src/app/app-settings';
import { ModalDialogService } from 'ngx-modal-dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PublicService } from 'src/app/services/public/public.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild(WizardComponent,ArchwizardModule)
  public wizard: WizardComponent;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  siteKey:any = AppSettings.siteKey;
  trader_no = 9126;
  loading = true;
  country_id = 0;
  region_id:number;
  tin_certificate: string;
  title: string = "Account Registration";
  submitted = false;

  model: any = {};

  createAccountFrm: FormGroup;
  applicationInformationFrm:FormGroup;
  countries: any;
  regions:any;
  districts: any;
  table_name: string;
  filter:any;
  trader_categories:any;
  upload_disabled:boolean = true;
  account_resp:any;
  message:string;
  application_modalVisible: boolean=false;
  email_address:string;
  applicationTypesData:any;
  traderApplicationInformationDta:any;
  password:string;
  confirm_password:string;
  rules: any;forgotPasswordFrm:FormGroup;
  response:any;
  app_route:any;
  addRegionDetailsFrm:FormGroup;
  addRegionDetailsWin:boolean=false;
  product_resp:any;
  accountTypesData:any;
  constructor( private spinner: SpinnerVisibilityService, public viewRef: ViewContainerRef,private authService:AuthService,   public toastr: ToastrService,private router: Router, private formBuilder: FormBuilder, private accountManagementService: AccountManagementService, private config:ConfigurationsService,public modalService: NgxSmartModalService,public modalDialogue: ModalDialogService, public utilityService:PublicService) {
    this.rules = { "X": /[03-9]/ };
    //18th - 23th
    this.spinner.hide();
  }
  ngOnInit() {
    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      identification_no: new FormControl('', Validators.compose([Validators.required])),
    });
    this.createAccountFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      traderaccount_type_id: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),
      contact_person_email: new FormControl('', Validators.compose([]))
      //recaptcha: new FormControl('', Validators.compose([Validators.required]))
    });
    this.addRegionDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    });
    this.applicationInformationFrm = new FormGroup({
      module_id: new FormControl('', Validators.compose([Validators.required])),
      registration_no: new FormControl('', Validators.compose([])),
      reference_no: new FormControl('', Validators.compose([])),
      year_of_registration: new FormControl('', Validators.compose([])),
      remarks: new FormControl('', Validators.compose([])),
      
    });
    //load modules 
    this.onLoadCountries();
    this.spinner.hide();
    this.onTraderCategories();
    this.onLoadapplicationTypesData();
    this.onLoadAccountTypesData();

  }onLoadAccountTypesData() {

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

  onCoutryCboSelect($event) {
    
    if($event.selectedItem.id){
      this.country_id = $event.selectedItem.id;
      this.onLoadRegions(this.country_id);
       
    }
    
   
    
  }
  onRegionsCboSelect($event) {
    
    if($event.selectedItem.id){
      this.region_id = $event.selectedItem.id;
      this.onLoadDistricts(this.region_id);
    }
    

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
  onLoadapplicationTypesData(){
    var data = {
      table_name: 'modules'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypesData = data;
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
  get f() { return this.createAccountFrm.controls; }
  oncloseRegistrationMdl(){
      this.modalService.getModal('createAccountModal').close();
      this.router.navigate(['/']);
  } handleReset(){

  }
  handleExpire(){
    
  }
  handleLoad(){
    
  }
  handleSuccess($event){
    
  }
  onCreateAccount() {

    if (this.createAccountFrm.invalid) {
      return;
    }
    this.spinner.show();
    const uploadData = this.prepareSave();
    //check for TIN certificate 
    this.country_id = this.createAccountFrm.controls['country_id'].value;
   // this.tin_certificate = this.createAccountFrm.controls['tin_certificate'].value;
    if (this.country_id == 36) {
      if (this.tin_certificate == '') {
        return;
      }
    }

    this.loading = true;
    this.accountManagementService.onCreateAccount(this.createAccountFrm.value,uploadData,'onAccountRegistration')
      //.pipe(first())
      .subscribe(
        response => {
            this.account_resp = response.json();
            //the details 
            if(this.account_resp.success){
              this.trader_no = this.account_resp.trader_no;
              this.message = this.account_resp.message;
              this.toastr.success(this.message, 'Response');
              this.modalService.getModal('createAccountModal').open();
            
            }else{
              this.message = this.account_resp.message;
              this.toastr.error(this.message, 'Alert');
            }
            this.spinner.hide();
        },
        error => {
          this.loading = false;
        });
  }
  onSaveTradersApplicationInformation() {

    if (this.applicationInformationFrm.invalid){

      return;

    }
    
    this.loading = true;

    this.accountManagementService.onSaveTradersApplicationInformation(this.applicationInformationFrm.value,this.email_address)
      //.pipe(first())
      .subscribe(
        response => {

            this.account_resp = response.json();
            //the details 
            if(this.account_resp.success){
             
             this.toastr.success(this.account_resp.message, 'Response');
             this.application_modalVisible = false;
             //reload the data
             this.onLoadtraderApplicationInformationDta(this.email_address)
            }else{
              this.toastr.error(this.account_resp.message, 'Alert');
            }
        },
        error => {
          this.loading = false;
        });
  }
  onLoadtraderApplicationInformationDta(email_address){

      this.loading = true;
  
      this.accountManagementService.onLoadtraderApplicationInformation(email_address)
        //.pipe(first())
        .subscribe(
          response => {
  
              this.account_resp = response;
              //the details 
              if(this.account_resp.success){
                this.traderApplicationInformationDta = this.account_resp.data;
               //reload the data
              }else{
                this.toastr.error(this.message, 'Alert');
              }
          },
          error => {
            this.loading = false;
          });

  }
  
  onTraderCategories() {
    var data = {
      table_name: 'par_trader_categories'
    };
    this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.trader_categories=data;
      },
      error => {
        this.loading = false;
      });
  }
  onMovePreviousWizard(previous_step) {
    this.wizard.model.navigationMode.goToStep(previous_step);

  }
  onMoveNextWizard(nextStep) {
    //validate details 
    this.wizard.model.navigationMode.goToStep(nextStep);
   

  }
  functDataGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Application Information',
        type: 'default',
        icon: 'fa fa-plus',
        onClick:  this.funcAddApplicationInformation.bind(this)

      }
    });
  }
  funcAddApplicationInformation(){
     
      this.application_modalVisible = true;
  }
  onValidateAccountEmail($event){
    
    this.spinner.show();
    this.accountManagementService.onValidateAccountEmail(this.email_address,'onValidateAccountEmail')
        //.pipe(first())
        .subscribe(
          response => {
              this.account_resp = response;
              //the details 
              if(this.account_resp.success){
                this.traderApplicationInformationDta = this.account_resp.data;

               //reload the data
              }else{
                //recover password 
                this.funcPassWordRecoveryOption(this.account_resp.message,this.email_address,this.account_resp.identification_no);
                this.createAccountFrm.reset();
              }
              
             this.spinner.hide();
          },
          error => {
            this.loading = false;
          });
}
funcPassWordRecoveryOption(message,email_address,identification_no){
  this.forgotPasswordFrm.get('email_address').setValue(email_address)
  this.forgotPasswordFrm.get('identification_no').setValue(identification_no)
  this.modalDialogue.openDialog(this.viewRef, {
    title: message,
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [
      {
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
        this.authService.onFuncRecoverPasswordRequest(this.forgotPasswordFrm.value)
        .subscribe(
          data => {
            this.response = data.json();;
           
            if (this.response.success) {
              this.toastr.success(this.response.message, 'Response');
              this.app_route = ['./'];
  
              this.router.navigate(this.app_route);
              
            } else {
              this.toastr.error(this.response.message, 'Alert');
            }
            this.spinner.hide();
          },
          error => {
              
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
onEmailValueChange($event){
  this.email_address = $event.value;
}
private prepareSave(): any {
  let upload_input = new FormData();
  //upload_input.append('tin_certificate', this.createAccountFrm.get('tin_certificate').value);
  return upload_input;
}
onFileChange(event) {
  
  if(event.target.files.length > 0){

    let file = event.target.files[0];
    this.createAccountFrm.get('tin_certificate').setValue(file);

  }
}
  //change events 
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }OnAddNewManufacturerReionDetails(){
    let country_id = this.createAccountFrm.get('country_id').value;
    this.addRegionDetailsFrm.reset();
    if(country_id >0){
      this.addRegionDetailsFrm.get('country_id').setValue(country_id);
     
      this.addRegionDetailsWin = true;
    }
    else{
      this.toastr.error('Select Country before you add a new Region', 'Alert');
    }

  }
  onSaveRegiondetails(){
    this.spinner.show();
    this.addRegionDetailsFrm.get('tablename').setValue('par_regions');
    this.utilityService.onsaveApplicationUniformDetails('', this.addRegionDetailsFrm.value, 'onSaveUniformConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadRegions(this.country_id);
         
          this.addRegionDetailsWin = false;
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
}