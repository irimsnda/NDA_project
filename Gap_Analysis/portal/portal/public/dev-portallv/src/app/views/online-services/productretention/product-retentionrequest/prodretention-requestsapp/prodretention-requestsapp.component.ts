import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WizardComponent } from 'ng2-archwizard';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import { ModalDialogService } from 'ngx-modal-dialog';
@Component({
  selector: 'app-prodretention-requestsapp',
  templateUrl: './prodretention-requestsapp.component.html',
  styleUrls: ['./prodretention-requestsapp.component.css']
})
export class ProdretentionRequestsappComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  retentionFeesProductsData:any;
  terms_conditions:any;
  section_id:number;
  retentionappGeneraldetailsfrm:FormGroup;
  onApplicationSubmissionFrm:FormGroup;
  app_details:any;  trader_id:number;
  mistrader_id:number;
  initWizardPanel:number= 0;
  is_readonly:number;
  sub_module_id:number;
  application_id:number;
  process_title:string;
  tracking_no:string;
  status_name:string;
  status_id:number;
  application_code:number;
  module_id:number;
  retentionYearData:any = []
  app_route:any;
  product_resp:any;
  productAnnualRetentionRegData:any;
  isregisteredproductsPopupVisible:boolean;
  registeredProductsData:any = {};
  retentiongeration_request_id:number;
  constructor(public modalServ: ModalDialogService,public appService: ProductApplicationService, public router: Router, public modalService: NgxSmartModalService, public config: ConfigurationsService ,public toastr: ToastrService, public authService: AuthService, private utilityService:Utilities,public httpClient: HttpClient,public viewRef: ViewContainerRef,public spinner: SpinnerVisibilityService,public configService: ConfigurationsService) { 

    let current_year =  new Date().getFullYear()+2;
  
     let start_year = 2021;

    while (start_year<=current_year){
         this.retentionYearData.push({year:start_year});
         start_year++;
    }
    console.log(this.retentionYearData);
  }  onApplicationDashboard() {
    this.app_route = ['./online-services/product-retention-dashboard'];

    this.router.navigate(this.app_route);
  }
 
  ngOnInit() {
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments:new FormControl('', Validators.compose([]))
    });
    let user = this.authService.getUserDetails();
 
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.retentionappGeneraldetailsfrm = new FormGroup({
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
      retention_year: new FormControl('', Validators.compose([Validators.required])),
      remarks: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      application_id: new FormControl(this.application_id, Validators.compose([])),
      retentiongeration_request_id: new FormControl(this.retentiongeration_request_id, Validators.compose([])),
    });
    this.app_details = this.appService.getProductApplicationDetail();
    if (!this.app_details) {
      this.router.navigate(['./../online-services/product-retention-dashboard']);
      return;
    }
    else {

      this.sub_module_id = this.app_details.sub_module_id;
      this.process_title = this.app_details.process_title;
      this.application_id = this.app_details.application_id;
      
      this.tracking_no = this.app_details.tracking_no;
      this.status_name = this.app_details.status_name;
      this.status_id = this.app_details.status_id;
      this.application_code = this.app_details.application_code;

      this.status_name = this.app_details.status_name;
      this.status_id = this.app_details.application_status_id;
      this.module_id = this.app_details.module_id;
      this.retentiongeration_request_id = this.app_details.retentiongeration_request_id;

      if (this.app_details.application_code != '') {
        //reload the other stores
        this.retentionappGeneraldetailsfrm.patchValue(this.app_details);

       // this.autoLoadProductsOtherDetails(this.productapp_details.product_id);
       this.onLoadretentionFeesProductsData();

      }
    }
    
  }
  onSaveRenetionRequestApplication() {
    if (this.retentionappGeneraldetailsfrm.invalid) {
      return;
    }

    this.spinner.show();
    this.appService.onSaveProductApplication(this.retentionappGeneraldetailsfrm.value, {}, 'onSaveRenetionRequestApplication')
      .subscribe(
        response => {
          this.product_resp = response.json();
          //the details 
          
          this.spinner.hide();
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.application_code = this.product_resp.application_code;
            this.application_id = this.product_resp.application_id;
            this.retentiongeration_request_id = this.product_resp.retentiongeration_request_id;

            this.toastr.success(this.product_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Error Occurred', 'Alert');
        });
        
  }   onLoadGuidelines(sub_module_id, section_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id, section_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }onProdretentionApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/product-retention-dashboard'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_product_applications', this.app_route,this.onApplicationSubmissionFrm.value)
  }
  funcValidateRetentionProdDetails(nextStep) {
    
    this.funcValidateStepDetails('Add Registered  Products to Proceed', this.retentionFeesProductsData, nextStep);

  }
  
  funcValidateStepDetails(title, dataStore, nextStep) {
 
    if (dataStore.length != 0 && dataStore.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(title, 'Alert');
    }

  }

  onRetentionApplicationProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Permit Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPermitProducts.bind(this)

      }
    },  {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }
  funAddPermitProducts() {
   
    this.OnReloadREgisteredProductsList();
    this.isregisteredproductsPopupVisible = true;
    
  }

  OnReloadREgisteredProductsList(){

    let me = this;
            this.registeredProductsData.store = new CustomStore({
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
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, trader_id:me.trader_id, mistrader_id:me.mistrader_id}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'productregistration/getAnnualretentionRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }
  refreshDataGrid(){
    this.onLoadretentionFeesProductsData();
  }
  onLoadretentionFeesProductsData() {
    this.spinner.show();
    this.appService.getProductsOtherDetails({ 'retentiongeration_request_id': this.retentiongeration_request_id }, 'getretentionFeesProductsData')
      .subscribe(
        data => {
          if (data.success) {

            this.retentionFeesProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }

  funcSelectRegisteredProduct(data) {
    let validitystatus_id = data.data.validity_status_id;
    let retentionstatus_id = data.data.retentionstatus_id;
    let reg_product_id = data.data.reg_product_id;
    let prodapplication_code = data.data.application_code;
    let brand_name = data.data.brand_name;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want add the selected Registered Product with ' + brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          let retention_product = {
              application_code: prodapplication_code,
              retentiongeration_request_id: this.retentiongeration_request_id,
              reg_product_id:reg_product_id,
              retention_status_id:1,
              retention_year : this.retentionappGeneraldetailsfrm.get('retention_year').value,
              next_retention_year : this.retentionappGeneraldetailsfrm.get('retention_year').value+1
          }
          this.spinner.show();
          this.appService.onSaveApplicationOtherDetails('tra_product_retentions',retention_product,'saveProductRetentionSelection')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {

                 this.onLoadretentionFeesProductsData();

                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.error(response_data.message, 'Response');

                }

              },
              error => {
                 this.toastr.error('Error Occurred, please try again', 'Response');
                 
                this.spinner.hide();
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });


  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  } 
  funcRemoveRetentionProductData(data) {
    //func_delete records 
    let record_id = data.data.product_retention_id;
    let brand_name = data.data.brand_name;
    let invoice_element_id = data.data.invoice_element_id;
    if(invoice_element_id >0){
      this.toastr.error('Retention Proforma Invoice for the Selected Product Has Already been Generated, Cancel Invoice and then Remove the Select Product', 'Alert');

    }else{
      let table_name = 'tra_product_retentions';
      this.funcDeleteDetailhelper(record_id, this.application_id, table_name, '', 'Selected Retention Product Details '+brand_name);

    }

  }
  funcDeleteDetailhelper(record_id, application_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to remove ' + title + '?',
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
            this.appService.onDeleteRetentionProductsDetails(record_id, table_name,title)
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();
                  if (resp.success) {
                    
                    this.spinner.hide();
                    this.onLoadretentionFeesProductsData();

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
}
