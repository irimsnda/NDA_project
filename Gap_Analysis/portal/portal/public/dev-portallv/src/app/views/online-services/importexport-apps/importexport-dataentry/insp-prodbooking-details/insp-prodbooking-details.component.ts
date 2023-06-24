import { Component, OnInit,Input } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/shared-importexportclass.component';

import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-insp-prodbooking-details',
  templateUrl: './insp-prodbooking-details.component.html',
  styleUrls: ['./insp-prodbooking-details.component.css']
})
export class InspProdbookingDetailsComponent extends SharedImportexportclassComponent implements OnInit {
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
   
   isApprovedLicenseproductsPopupVisible:boolean;
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
  approvedlicensesProducts:any;
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
  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }
  onLoadproductSubCategory(product_category_id) {
    var data = {
      table_name: 'par_subproduct_categories',
      product_category_id: product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSubCategoryData = data;
        });
  }
  onAddNewGenericDetails(){

  
    this.addproductCommonNameModal = true;
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
  
  funcREmoveProductDetails(data){
    this.funcDeletePermitsProducts(data);

  }
  funcUpdateLicenseVisaprod(data){
    this.funcVisaLisPermitsProductPreviewedit(data);

  }funcVisaLisPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    
    this.isPermitVisaLicProductsAddPopupVisible = true;

  }
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected Permit Product with ' + app_data.brand_name + '?',
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
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
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
  onValidateBrandNameDetails(e){
    let consignment_quantity = this.permitProductsFrm.get('consignment_quantity').value;
    let licensebalance_quantity = this.permitProductsFrm.get('licensebalance_quantity').value;
    
    if(consignment_quantity > licensebalance_quantity){
      this.toastr.error("The product's quantities should be equal or less that the License Application Product Details. License Product Quantity is "+licensebalance_quantity, 'Alert');
      this.permitProductsFrm.get('consignment_quantity').setValue(licensebalance_quantity);
      return;
    }

  }
  
  onValidateConsignmentQty($event){
    let consignment_quantity = this.permitProductsFrm.get('consignment_quantity').value;
    let licensebalance_quantity = this.permitProductsFrm.get('licensebalance_quantity').value;
    
    if(consignment_quantity > licensebalance_quantity){
      this.toastr.error("The product's quantities should be equal or less that the License Application Product Details. License Product Quantity is "+licensebalance_quantity, 'Alert');
      this.permitProductsFrm.get('consignment_quantity').setValue(licensebalance_quantity);
      return;
    }
    
  }
  onsavePermitProductdetails() {
    
      let consignment_quantity = this.permitProductsFrm.get('consignment_quantity').value;
      let quantity = this.permitProductsFrm.get('quantity').value;

      if(consignment_quantity > quantity){
        this.toastr.error("The product's quantities should be equal or less that the License Application Product Details. License Product Quantity is "+quantity, 'Alert');
        return;
      }
    
    const invalid = [];
    const controls = this.permitProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
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
        text: 'Add License(Approved) Products',
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

      this.spinner.show();
      this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getApprrovedLicensesProducts')
        .subscribe(
          data => {
            if (data.success) {
  
              this.approvedlicensesProducts = data.data;
              this.isApprovedLicenseproductsPopupVisible = true;
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
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
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
  this.permitProductsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
   
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


  onCellPrepared(e) {
    
    if(e.rowType === "data" && e.column.dataField === "permitprod_inspectionstatus") {
      let application_status_id =e.data.permitprod_inspectionstatus_id;

        if(application_status_id ==1){
          e.cellElement.style.color = '#fff';
          e.cellElement.style.backgroundColor = 'green';    
        }
        else if(application_status_id == 3){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = 'yellow';  
      
        }
        else{
            e.cellElement.style.color = 'black';
            e.cellElement.style.backgroundColor = '#ccc';  
        

        }
          
    }
}
funcSelectApprovedLicenseProduct(data){
  let permitprod_recommendation_id = data.permitprod_recommendation_id;
  let licensebalance_quantity = data.licensebalance_quantity;
  
  if(licensebalance_quantity <1){
    this.toastr.success('The Approved License Product Quantity has been depleted.', 'Alert');
    return;
  }
  if(permitprod_recommendation_id != 2){
   // this.toastr.success('The selected product is not accepted for Importation as a result of '+data.permitprod_recommendation_remarks, 'Alert');
   // return;
  }
  this.permitProductsFrm.patchValue(data);
  this.permit_product_id = data.id;
  //this.premitProductIdEvent.emit(this.permit_product_id);

  this.isPermitproductsAddPopupVisible = true;

  this.isPermitVisaLicProductsAddPopupVisible = true;

}

onBookingProductCellPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "status_name") {
    let visabalance_quantity =e.data.visabalance_quantity;

      if(visabalance_quantity >0){
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';    
      }
      else{
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
      
      }
    }
    if(e.rowType === "data" && e.column.dataField === "permitprod_recommendation") {
      let permitprod_recommendation_id =e.data.permitprod_recommendation_id;
  
        if(permitprod_recommendation_id == 2){
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';    
        }
        else{
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  
        
        }
      }

}
}
