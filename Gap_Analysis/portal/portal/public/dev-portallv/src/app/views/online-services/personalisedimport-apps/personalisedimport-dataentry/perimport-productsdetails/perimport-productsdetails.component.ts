import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

import DataSource from 'devextreme/data/data_source';
import { SharedpersonalisedimpApplicationComponent } from '../../sharedpersonalisedimp-application/sharedpersonalisedimp-application.component';

@Component({
  selector: 'app-perimport-productsdetails',
  templateUrl: './perimport-productsdetails.component.html',
  styleUrls: ['./perimport-productsdetails.component.css']
})
export class PerimportProductsdetailsComponent extends SharedpersonalisedimpApplicationComponent implements OnInit {
  requireUnitPackData:boolean=false;
  trader_id:number;
  mistrader_id:number;
  dataGrid: DxDataGridComponent;
  @Input() permitProductsData: any;
  @Input() isPermitproductsPopupVisible: boolean;
  @Input() registeredProductsData: any;
  @Input() isPermitproductsAddPopupVisible: boolean;
  @Input() confirmDataParam: any;
  @Input() premisesOtherDetailsRows: any;
  @Input() is_regulatedproducts: boolean;
  @Input() productCategoryData: any;
   @Input() deviceTypeData: any;
   @Input() packagingUnitsData: any;
   @Input() siUnitsData: any;
   @Input() weightsUnitData: any;
   @Input() currencyData: any;
   @Input() permitProductsFrm: FormGroup;
   @Input() productGeneraldetailsfrm: FormGroup;
   @Input() classificationData: any;
   @Input() commonNamesData: any;
   @Input() application_code: number;
   @Input() enabled_newproductadd: boolean;
   @Input() sub_module_id: number;
   @Input() tracking_no: string;

   @Input() module_id: number;
   @Input() section_id: number;
   @Input() proforma_currency_id: number;
   @Input() countries: any;
   manufacturersData: any ={};
   isManufacturerSitePopupVisible:boolean= false;
   isproductManufacturerModalShow:boolean;
   isnewmanufacturerModalShow:boolean= false;
   addproductCommonNameModal:boolean;
  addProductParamsdetailsfrm:FormGroup;
   isFoodPermitProducts:boolean;
   isnewproductAddWinVisible:boolean;
   loading:boolean;
   enabled_productadd:boolean;
   isPermitVisaLicProductsAddPopupVisible:boolean;
   region:any;
  districts:any;
  app_resp:any;
  regions:any;
   permitProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Edit Record", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  permitApprovedVisaProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Update Batch and Manufacturing Date(s)", action: 'edit_record', icon: 'fa fa-edit' },
        //{ text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  
  consignee_sendertitle:string;
  manufacturerFrm:FormGroup;
  issenderreceiverSearchWinVisible: boolean;
  issenderreceiverAddWinVisible:boolean;

  product_resp:any;
  is_visaapplication:boolean;
  commonNameData:any;
  filesToUpload: Array<File> = [];  
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  document_previewurl: any;
  
  isDocumentPreviewDownloadwin: boolean = false;
  is_brandreadonly:boolean = true;
  common_name_title: string = 'Common Name';
  productSubCategoryData: any;

  ngOnInit(){
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))

    });

    this.onLoadcommonNameData();
    
    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.addProductParamsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
  }
  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
  //  this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.isPermitproductsAddPopupVisible = true;

  }
  
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height/100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  permitProductsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPermitsProductPreviewedit(data.data);
    // this.funcVisaLisPermitsProductPreviewedit(data);
    }
    else if (action_btn.action == 'delete_record') {
      this.funcDeletePermitsProducts(data.data);
    }
  }

  funcREmoveProductDetails(data){
    this.funcDeletePermitsProducts(data);

  }
  funcUpdateLicenseVisaprod(data){
    this.funcVisaLisPermitsProductPreviewedit(data);

  }funcVisaLisPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
   // this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.isPermitVisaLicProductsAddPopupVisible = true;

  }
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the selected Permit Product with ' + app_data.brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, 'wb_permits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  this.onLoadPermitProductsData(this.application_code);
                  this.toastr.success(response_data.message, 'Response');
                }
                else {
                  this.toastr.success(response_data.message, 'Response');
                }
              },
              error => {
                this.loading = false;
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
 
  onRegisteredProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }refreshDataGrid() {
  //  this.dataGrid.instance.refresh();
  }
  funAddNewPermitProducts(){
    this.isPermitproductsAddPopupVisible = true;
    this.is_brandreadonly = false;
  }
  funcSelectRegisteredProduct(data) {
    this.permitProductsFrm.reset();
    let permitprod_recommendation_id = data.data.permitprod_recommendation_id;
    let decision_id = data.data.decision_id;
     this.isPermitproductsAddPopupVisible = true;
     if (permitprod_recommendation_id != 1 || decision_id != 1) {
      this.toastr.error('Product Authorisetion Alert', 'The product has not been authorised for importation');
      return;
    }
    else{
      this.permitProductsFrm.get('product_id').setValue(data.data.product_id);
      this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
      
      this.permitProductsFrm.get('common_name_id').setValue(data.data.common_name_id);

      this.permitProductsFrm.get('manufacturer_id').setValue(data.data.manufacturer_id);
      this.permitProductsFrm.get('country_oforigin_id').setValue(data.data.country_oforigin_id);

      this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

    }
      

  }
  onLoadcommonNameData() {
    var data = {
      table_name: 'par_common_names',
      section_id: this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNameData = new DataSource({
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
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }onSaveNewGenericDetails(){
    this.addProductParamsdetailsfrm.get('tablename').setValue('par_common_names')
    this.addProductParamsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addProductParamsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadcommonNameData();
         
          this.addproductCommonNameModal = false;
          this.permitProductsFrm.get('common_name_id').setValue(this.product_resp.record_id);
  
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
  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
    
  }
  
  funcDownloadUploadedDocuments(data) {
    this.spinner.show();
    if(data.node_ref == ''){
      this.toastr.success('No Document Uploaded ', 'Response');
      this.spinner.hide();
      return;
    }
    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.document_upload_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin = true;
            
          }
          else {

            this.toastr.success(response_data.message, 'Response');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });
  }
  private prepareIMPSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
   // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("file", files[i], files[i]['name']);
    }
    input.append('brand_name', this.permitProductsFrm.get('brand_name').value);
    input.append('product_category_id', this.permitProductsFrm.get('product_category_id').value);
    input.append('product_batch_no', this.permitProductsFrm.get('product_batch_no').value);
    input.append('product_strength', this.permitProductsFrm.get('product_strength').value);
    input.append('product_manufacturing_date', this.permitProductsFrm.get('product_manufacturing_date').value);
    input.append('product_expiry_date', this.permitProductsFrm.get('product_expiry_date').value);
    input.append('country_oforigin_id', this.permitProductsFrm.get('country_oforigin_id').value);

    input.append('unit_price', this.permitProductsFrm.get('unit_price').value);
    input.append('currency_id', this.permitProductsFrm.get('currency_id').value);
    input.append('packaging_unit_id', this.permitProductsFrm.get('packaging_unit_id').value);
    input.append('quantity', this.permitProductsFrm.get('quantity').value);
    input.append('laboratory_no', this.permitProductsFrm.get('laboratory_no').value);
    input.append('regulated_prodpermit_id', this.permitProductsFrm.get('regulated_prodpermit_id').value);
    input.append('prodcertificate_no', this.permitProductsFrm.get('prodcertificate_no').value);
    input.append('product_id', this.permitProductsFrm.get('product_id').value);
    input.append('unitpack_unit_id', this.permitProductsFrm.get('unitpack_unit_id').value);
    input.append('unitpack_size', this.permitProductsFrm.get('unitpack_size').value);
    input.append('visa_quantity', this.permitProductsFrm.get('visa_quantity').value);
    input.append('total_weight', this.permitProductsFrm.get('total_weight').value);
    input.append('weights_units_id', this.permitProductsFrm.get('weights_units_id').value);
    input.append('id', this.permitProductsFrm.get('id').value);
    input.append('device_type_id', this.permitProductsFrm.get('device_type_id').value);
    input.append('is_regulated_product', this.permitProductsFrm.get('is_regulated_product').value);
    input.append('productphysical_description', this.permitProductsFrm.get('productphysical_description').value);
    input.append('common_name_id', this.permitProductsFrm.get('common_name_id').value);
    input.append('manufacturer_id', this.permitProductsFrm.get('manufacturer_id').value);
    input.append('manufacturer_name', this.permitProductsFrm.get('manufacturer_name').value);
    return input;
  }
  onsavePermitProductdetails() {
    //validate the visa Quoantity
    if(this.sub_module_id == 82){
      let visa_quantity = this.permitProductsFrm.get('visa_quantity').value;
      let quantity = this.permitProductsFrm.get('quantity').value;

      if(quantity > visa_quantity){
        this.toastr.error("The product's quantities should be equal or less that the Visa Application Product Details. Visa Product Quantity is "+visa_quantity, 'Alert');
        return;
      }
    }
    const invalid = [];
    const controls = this.permitProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    const uploadData = this.prepareIMPSave();

    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, uploadData, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           // this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.onLoadPermitProductsData(this.application_code);
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

            this.onLoadPermitProductsData(this.application_code);
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  
  onPermitProductGridToolbar(e) {
   
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Invoice Products',
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
   
    this.OnReloadPermitProducts();
    this.isPermitproductsPopupVisible = true;
    
  }
  
  OnReloadPermitProducts(){

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
                  console.log(loadOptions.filter);
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, 'sub_module_id': me.sub_module_id,section_id:me.section_id,trader_id:me.trader_id, mistrader_id:me.mistrader_id}
                  };//getRegisteredNonRegisteredProducts
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getPersonalisedApprovedAuthorisedProducts',this.configData)
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
      onAddNewProductinformation() {
 
        if (this.productGeneraldetailsfrm.invalid) {
          return;
        }
        this.productGeneraldetailsfrm.get('section_id').setValue(this.section_id);
        let brand_name =  this.productGeneraldetailsfrm.get('brand_name').value;
        this.spinner.show();
        this.appService.onAddNewProductinformation(this.productGeneraldetailsfrm.value, 'onAddNewProductinformation')
          .subscribe(
            response => {
              this.product_resp = response.json();
              
              if (this.product_resp.success) {
                
                //reload prodct details
                this.isnewproductAddWinVisible = false;
                this.OnReloadPermitProducts();
                this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
                this.isPermitproductsAddPopupVisible = true;
                this.permitProductsFrm.get('brand_name').setValue(brand_name);
                this.permitProductsFrm.get('product_id').setValue(this.product_resp.record_id);
                
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
      
onAddManufacturerDetails() {
  this.spinner.show();
  let manufacturer_name = this.manufacturerFrm.get('name').value;
  this.appProdService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.isnewmanufacturerModalShow = false;
          this.isproductManufacturerModalShow = false;
          let manufacturer_id =this.product_resp.record_id;
          //load Manufactureing Sites 
          this.permitProductsFrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
   
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
} funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
funcSelectManufacturer(data) {
  let data_resp = data.data;
  this.permitProductsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id,country_oforigin_id:data_resp.country_id});
   
  this.isManufacturerSitePopupVisible = false;

}
onManufacturerPreparing(e) {
  this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
}onCoutryCboSelect($event) {


  this.onLoadRegions($event.selectedItem.id);

}onLoadRegions(country_id) {

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

  this.onLoadDistricts($event.selectedItem.id);

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
}
