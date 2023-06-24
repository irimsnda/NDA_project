import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import ArrayStore from "devextreme/data/array_store";

@Component({
  selector: 'app-cosmetics-dataproducts',
  templateUrl: './cosmetics-dataproducts.component.html',
  styleUrls: ['./cosmetics-dataproducts.component.css']
})
export class CosmeticsDataproductsComponent extends SharedProductregistrationclassComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() product_id: number;

  @Input() drugsingredientsData: any;
   @Input() drugsPackagingData: any;
   @Input() productManufacturersData: any;
   @Input() apiManufacturersData: any;
   @Input() productgmpInspectionData: any;
   @Input() tradergmpInspectionData: any;
   @Input() manufacturersSiteData: any;

   @Input() productIngredientsdetailsfrm: FormGroup;
   @Input() productNutrientsdetailsfrm: FormGroup;
  
   @Input() productapimanufacturingSiteFrm: FormGroup;
  
   @Input() productmanufacturingSiteFrm: FormGroup;
  
   @Input() manufacturingSiteFrm: FormGroup;
   @Input() prodgmpAddinspectionFrm: FormGroup;
 
   @Input() productPackagingdetailsfrm: FormGroup;
   @Input() gmpProductLineData: any;
   @Input() isReadOnly: boolean;
   @Input() product_origin_id: number;
   @Input() productIngredientsModal: boolean;
  addproductIngredientsModal:boolean = false;
  addIngredientsdetailsfrm:FormGroup;
  product_resp:any;
  packagingUnitsData:any;
  ingredientsData:any;
  container_type_id:number;
  isproductManufacturerModalShow: boolean = false;
  isnewmanufacturerModalShow:boolean=false;
  isnewmanufactureringSiteDetailsModalShow: boolean = false;
  isproductmanSiteDetailsModalShow: boolean = false;
  isgmpinspectionModalShow:boolean = false;
  isgmpAddinspectionModalShow:boolean = false;
  
  addRegionDetailsWin: boolean;
  addRegionDetailsFrm:FormGroup;
  auto:any;
  addDistrictsDetailsWin: boolean = false;
  addDistrictsDetailsFrm:FormGroup;
  isproductManufactureringSiteModalShow:boolean=false;
  isRegisteredPremisesModalShow:boolean=false;
  isapimanSiteDetailsModalShow:boolean= false;
  siUnitsData:any;
  specificationData:any;
  reasonForInclusionData:any;
  containerMaterialData:any;
  containerData:any;
  manufacturingRoleDataSource: any;
  manufacturingRoleData:any;
  countries: any;
  regions: any;
  districts: any;
  country_id:number;
  region_id:number;
  ingredientTypeData:any;
  containerTypeData:any;
  tbisReadOnly:boolean;manufacturerFrm:FormGroup;
  
  manufacturersData:any = {};
  manufacturer_type_id: number;
  manufacturer_id:number;
  addproductInclusionModal:boolean= false;

   
  
  ngOnInit() { this.onLoadconfirmDataParmAll();
      this.addIngredientsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
  
    this.onLoadSampleSubmissionData();
    this.onLoadpackagingUnitsData(this.section_id);

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
    this.productapimanufacturingSiteFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([Validators.required])),

      active_ingredient_id: new FormControl('', Validators.compose([Validators.required])),

    });
    this.productmanufacturingSiteFrm = new FormGroup({
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_name: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_id: new FormControl('', Validators.compose([Validators.required])),
      man_site_id: new FormControl('', Validators.compose([])),
      manufacturer_role_id: new FormControl('', Validators.compose([])),
      manufacturing_activities: new FormControl('', Validators.compose([])),
      
      has_beeninspected: new FormControl('', Validators.compose([Validators.required])),
      inspected_site_name: new FormControl('', Validators.compose([])),
      gmp_productline_id: new FormControl('', Validators.compose([])),
      manufacturing_site_id: new FormControl('', Validators.compose([])),
      reg_site_id: new FormControl('', Validators.compose([])),
      gmp_application_code: new FormControl('', Validators.compose([])),
      
    });
    this.prodgmpAddinspectionFrm = new FormGroup({
      manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      gmp_productline_id: new FormControl('', Validators.compose([Validators.required])),
      reg_site_id: new FormControl('', Validators.compose([Validators.required])),
      manufacturing_site_id: new FormControl('', Validators.compose([Validators.required]))

    }); this.addRegionDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
    this.addDistrictsDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
    this.manufacturingSiteFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),

      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([])),
      tin_no: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),

    });
    this.autoLoadProductsOtherDetails(this.product_id);
    this.autoLoadedParameters(this.section_id);
    this.onLoadCountries();

  }
autoLoadProductsOtherDetails(product_id) {
    this.OnLoadProductsIngredients(product_id);
    this.OnLoadProductsPackagingMaterials(product_id);
    this.OnLoadproductManufacturersData(product_id);
    this.OnLoadapiManufacturersData(product_id)
    this.OnLoadProductsGMPInspectionDetails(product_id)

  }onIngredientsSelectionChange($event) {
    if($event.selectedItem){
      let ingredient_name =$event.selectedItem;
  
    // this.productIngredientsdetailsfrm.get('atc_code_id').setValue(ingredient_name.atc_code_id);
    //  this.productIngredientsdetailsfrm.get('atc_code').setValue(ingredient_name.atc_code);
     // this.productIngredientsdetailsfrm.get('atc_code_description').setValue(ingredient_name.atc_code_description);

    }
    
  } oncontainerTypeDataSelection($event){

      this.container_type_id = $event.value ;
  
  } onLoadpackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onAddNewIngredientDetails(){
    this.addIngredientsdetailsfrm.reset();
    this.addproductIngredientsModal = true;

  }
  onAddNewReasonInclusion(){
    this.addIngredientsdetailsfrm.reset();
    this.addproductInclusionModal = true;

  }
  onSaveReasonForInclusion(){
    this.addIngredientsdetailsfrm.get('tablename').setValue('par_inclusions_reasons')
    this.addIngredientsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addIngredientsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadreasonForInclusionData(this.section_id);
         
          this.addproductInclusionModal = false;
          this.productIngredientsdetailsfrm.get('inclusion_reason_id').setValue(this.product_resp.record_id)
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

  
  onSaveNewIngredientDetails(){
    this.addIngredientsdetailsfrm.get('tablename').setValue('par_ingredients_details')
    this.addIngredientsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addIngredientsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadingredientsData(this.section_id);
         
          this.addproductIngredientsModal = false;
          this.productIngredientsdetailsfrm.get('ingredient_id').setValue(this.product_resp.record_id)
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
    onLoadingredientCategoryData(section_id) {
    var data = {
      table_name: 'par_nutrients_category',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.nutrientsCategoryData = data;
        });
  }
  onLoadingredientData(section_id) {
    var data = {
      table_name: 'par_nutrients',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.nutientsData = data;
        });
  }

  onLoadingredientsData(section_id) {
    var data = {
      table_name: 'par_ingredients_details',
      section_id: section_id
    };
    this.confirmDataParam = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    var data = {
      table_name: 'par_ingredients_details',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
          this.ingredientsData = new DataSource({
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
 

  onLoadingredientsData125(section_id) {
    var data = {
      table_name: 'par_ingredients_details',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ingredientsData = data;
        });
  }onLoadSiUnits(section_id) {
    var data = {
      table_name: 'par_si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });
  }onLoadspecificationData(section_id) {
    var data = {
      table_name: 'par_specification_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.specificationData = data;
        });
  } onLoadcontainerMaterialData(section_id) {
    var data = {
      table_name: 'par_containers_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerMaterialData = data;

        });
  }
  onLoadreasonForInclusionData(section_id) {
    var data = {
      table_name: 'par_inclusions_reasons',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForInclusionData = data;
        });
  }onLoadcontainerData(section_id) {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerData = data;
        });
  } onLoadmanufacturingRoleData(section_id) {

    var data = {
      table_name: 'par_manufacturing_roles'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
        this.manufacturingRoleData = data;
         this.manufacturingRoleDataSource = new ArrayStore({
              data: data,
              key: "id"
          });
          
        });

  }
  onLoadcontainerTypeDataData(section_id) {
    var data = {
      table_name: 'par_containers_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerTypeData = data;
        });
  }
   autoLoadedParameters(section_id) {
  
    this.onLoadSiUnits(section_id);
    this.onLoadpackagingUnitsData(section_id);
    this.onLoadingredientData(section_id);
    this.onLoadingredientCategoryData(section_id);

    this.onLoadingredientsData(section_id);
    this.onLoadspecificationData(section_id);

    this.onLoadreasonForInclusionData(section_id);
    this.onLoadcontainerMaterialData(section_id)
    this.onLoadcontainerData(section_id);
    this.onLoadmanufacturingRoleData(section_id);
    this.onLoadcontainerTypeDataData(section_id)

    this.onLoadCountries();
    this.onLoadingredientTypeData(section_id);
 
  }
  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadingredientTypeData(section_id) {
    var data = {
      table_name: 'par_ingredients_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.ingredientTypeData = data;
        });
  }
  onLoadCountries(is_local = 0) {
    let data = {
      table_name: 'par_countries',
      // id: 36
    };
    if(is_local == 1){
      let data = {
        table_name: 'par_countries',
        is_local: 1
      };
    }
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
  }onProdIngredientsPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductIngredients, 'Product Ingredients');
  }funcAddProductIngredients() {
    
    this.productIngredientsModal = true;
    this.productIngredientsdetailsfrm.reset();
   // this.modalService.getModal('productIngredientsModal').open();

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled: this.tbisReadOnly,
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
      
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onProdPackagingPreparing(e) {
    this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductPackagingDetails, 'Product Packaging');
  }  funcAddProductPackagingDetails() {
    this.modalService.getModal('productPackagingModal').open();
    this.productPackagingdetailsfrm.reset();

  } onManufacturerPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  } funcAddManufacturerSite() {
    this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
    this.isnewmanufacturerModalShow = true;
    this.isproductManufacturerModalShow = true;
    this.manufacturerFrm.reset();
    
  } onProdManufacturingPreparing(e) {
    this.tbisReadOnly = false;
    this.functDataGridToolbar(e, this.funcAddProductManufacturerDetails, 'Product Manufacturers');

  } funcAddProductManufacturerDetails(){
    //the details 
    this.isproductmanSiteDetailsModalShow = true;
    this.onGetProductManufacturerDetails();
    this.productmanufacturingSiteFrm.reset();


}onGetProductManufacturerDetails() {

  let me = this;
  this.manufacturer_type_id = 1;
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
}onProdApiManufacturingPreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddAPIManufacturerDetails, 'Product API Manufacturers');
}funcAddAPIManufacturerDetails(){
  this.isapimanSiteDetailsModalShow = true;
  this.productapimanufacturingSiteFrm.reset();

} onProdInspectionDetailsPreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddProdGmpInspectionDetails, 'GMP Inspection Details');
}  funcAddProdGmpInspectionDetails() {
   
  this.isgmpinspectionModalShow = true;
  this.loadAddProdGmpInspectionDetails();
}loadAddProdGmpInspectionDetails() {
  let me = this;
  this.tradergmpInspectionData.store = new CustomStore({
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
          params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,product_id:me.product_id, application_code:me.application_code}
        };
        return me.httpClient.get(AppSettings.base_url + 'productregistration/getGmpInspectionsdetails',this.configData)
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

this.tradergmpInspectionData.store.load();

} onSaveProductPackaging() {
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.productPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.modalService.getModal('productPackagingModal').close();

          this.toastr.success(this.product_resp.message, 'Response');
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
}OnLoadProductsPackagingMaterials(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsDrugsPackaging')
    //.pipe(first())
    .subscribe(
      data => {
        this.drugsPackagingData = data.data;
      },
      error => {
        return false
      });
}  funcEditIngredientsDetails(data) {
  this.productIngredientsdetailsfrm.patchValue(data.data);
  this.productIngredientsModal = true;
  
  // this.modalService.getModal('productIngredientsModal').open();

}
funcEditPackagingDetails(data) {
  this.productPackagingdetailsfrm.patchValue(data.data);
  this.modalService.getModal('productPackagingModal').open();
}funcDeleteIngredientsDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_ingredients';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_ingredients', 'Product Ingredients');

}

funcDeleteManufacturingDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_manufacturers';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_manufacturer', 'Product Manufacturer');

}
funcDeleteGMPManufacturingDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_gmpinspectiondetails';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'gmp_inspection', 'Product GMP Inspection Manufacturer');

}


funcDeletePackDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_packaging';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_packaging', 'Product Packaging');

}
funcDeleteSampleDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_sample_information';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_samples', 'Product Samples Details');
}

funcDeleteDetailhelper(record_id, appproduct_id, table_name, reload_type, title) {
  this.modalDialogue.openDialog(this.viewRef, {
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
        this.spinner.show();
          this.appService.onDeleteProductsDetails(record_id, table_name, appproduct_id, title)
            //.pipe(first())
            .subscribe(
              data_response => {
                let resp = data_response.json();

                if (resp.success) {
                  if (reload_type == 'product_ingredients') {
                    this.OnLoadProductsIngredients(appproduct_id);

                  }
                  else if (reload_type == 'product_packaging') {
                    this.OnLoadProductsPackagingMaterials(appproduct_id);

                  }
                  else if (reload_type == 'product_manufacturer') {
                    this.OnLoadapiManufacturersData(appproduct_id);
                    this.OnLoadproductManufacturersData(appproduct_id);
                  }
                  else if (reload_type == 'gmp_inspection') {
                    this.OnLoadProductsGMPInspectionDetails(appproduct_id);
                  }
                  else if (reload_type == 'product_samples') {
                    this.onLoadSampleSubmissionData(appproduct_id);
                  }
                  
                  this.spinner.hide();
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
} OnLoadProductsIngredients(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsIngredients')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.drugsingredientsData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}


OnLoadproductManufacturersData(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id, manufacturer_type_id: 1 }, 'getproductManufactureringData')
    //.pipe(first())
    .subscribe(
      data => {
        this.productManufacturersData = data.data;
      },
      error => {
        return false
      });
}


OnLoadapiManufacturersData(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id, manufacturer_type_id: 2 }, 'getAPIproductManufactureringData')
    //.pipe(first())
    .subscribe(
      data => {
        this.apiManufacturersData = data.data;
      },
      error => {
        return false
      });
}OnLoadProductsGMPInspectionDetails(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsGMPInspectionDetails')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.productgmpInspectionData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
}
onSaveprodgmpAddinspection(){

  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_gmpinspectiondetails', this.prodgmpAddinspectionFrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.isgmpinspectionModalShow = false;
          this.isgmpAddinspectionModalShow = false;
          this.OnLoadProductsGMPInspectionDetails(this.product_id)
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


onSearchProductManufacturer() {
  //the details 
  this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
  if(this.product_origin_id == 2){
      
  }
  this.isproductManufacturerModalShow = true;
  this.onGetProductManufacturerDetails();


}

onSearchProductManufacturerSite() {
  //the details 
  let manufacturer_id  = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
  if(manufacturer_id >0){
    this.manufacturer_type_id = 1
    this.isproductManufactureringSiteModalShow = true;
    
    this.funcAddManufactureringDetails();
  }
  else{
    this.toastr.error('Select manufacturer details 1st before the Manufacturing Site', 'Alert');
  }
  
}
onSearchProductManufacturingSite() {
  this.isproductManufacturerModalShow = true;
  this.isproductmanSiteDetailsModalShow = false;
}
onSearchAPIManufacturer() {
  this.isproductManufacturerModalShow = true;
  this.onGetProductManufacturerDetails();
  this.manufacturer_type_id = 2;
}

funcAddManufactureringDetails() {

      let me = this;
      this.manufacturer_type_id = 1;
      
    var manufacturer_id = me.productmanufacturingSiteFrm.get('manufacturer_id').value;
   
    this.appService.getProductsOtherDetails({ manufacturer_id:manufacturer_id }, 'getManufacturingSiteInformation')
    .subscribe(
      data => {
        if (data.success) {
          this.manufacturersSiteData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });

}
onSaveProductIngredients() {
  let appproduct_id = this.product_id;
  this.spinner.show();
  this.appService.onSaveProductOtherDetails('wb_product_ingredients', this.productIngredientsdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadProductsIngredients(appproduct_id);
         
          this.productIngredientsModal = false;
          this.toastr.success(this.product_resp.message, 'Response');
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
} funcSelectManufacturer(data) {
  if (this.manufacturer_type_id == 1) {
    this.manufacturer_id = data.data.manufacturer_id;
    this.productmanufacturingSiteFrm.patchValue(data.data);
    this.isproductmanSiteDetailsModalShow = true;
  }
  else {
    this.productapimanufacturingSiteFrm.patchValue(data.data);
    this.isapimanSiteDetailsModalShow = true;

  }
  this.isproductManufacturerModalShow = false;
}//productgmpInspectionData
funcSelectManufacturingSite(data) {

  this.productmanufacturingSiteFrm.patchValue(data.data);
    this.isproductmanSiteDetailsModalShow = true;
  this.isproductManufactureringSiteModalShow = false;
}
onLoadgmpProductLineData(manufacturing_site_id) {

  this.appService.getProductsOtherDetails({ manufacturing_site_id: manufacturing_site_id }, 'getgmpProductLineDatadetails')
    //.pipe(first())
    .subscribe(
      data => {
        if (data.success) {
          this.gmpProductLineData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }

      },
      error => {
        return false
      });
} 
onsaveProdManufacturingSite() {
  this.spinner.show();
  const invalid = [];
    const controls = this.productmanufacturingSiteFrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    } if (this.productmanufacturingSiteFrm.invalid) {
      this.spinner.hide();
      return;
    }
  this.appService.onSaveProductOtherDetails('wb_product_manufacturers', this.productmanufacturingSiteFrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadproductManufacturersData(this.product_id);
          this.isproductmanSiteDetailsModalShow = false;
          this.isproductManufacturerModalShow = false;
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
onsaveAPIManufacturingSite() {
  this.spinner.show();
  let manufacturer_id = this.productapimanufacturingSiteFrm.get('manufacturer_id').value;
  let active_ingredient_id = this.productapimanufacturingSiteFrm.get('active_ingredient_id').value;
  this.appService.onSaveProductOtherDetails('wb_product_manufacturers', { manufacturer_id: manufacturer_id, active_ingredient_id: active_ingredient_id, product_id: this.product_id, manufacturer_type_id: this.manufacturer_type_id }, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadapiManufacturersData(this.product_id);
          this.isproductmanSiteDetailsModalShow = false;
          this.isapimanSiteDetailsModalShow = false;
          this.toastr.success(this.product_resp.message, 'Response');
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
}onManufacturingSitePreparing(e) {
  this.tbisReadOnly = false;
  this.functDataGridToolbar(e, this.funcAddManufactureringSite, 'Manufacturering Site');
}
funcAddManufactureringSite() {
  let product_origin_id = this.product_origin_id;
  this.product_origin_id = this.productGeneraldetailsfrm.get('product_origin_id').value;
  this.isnewmanufactureringSiteDetailsModalShow = true;
    this.isproductManufacturerModalShow = false;

   this.manufacturingSiteFrm.reset();

   let manufacturer_id = this.productmanufacturingSiteFrm.get('manufacturer_id').value;
   this.manufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id);

   if(this.product_origin_id == 2){

      this.onLoadCountries(1);
}
}OnAddNewManufacturerReionDetails(){
  let country_id = this.manufacturerFrm.get('country_id').value;
  this.addRegionDetailsFrm.reset();
  if(country_id >0){
    this.addRegionDetailsFrm.get('country_id').setValue(country_id);
   
    this.addRegionDetailsWin = true;
  }
  else{
    this.toastr.error('Select Country before you add a new Region', 'Alert');
  }

}

OnAddNewManufactureDistrictDetails(){
  let region_id = this.manufacturerFrm.get('region_id').value;
  
  this.addDistrictsDetailsFrm.reset();
  if(region_id >0){
    this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
   
    this.addDistrictsDetailsWin = true;
  }
  else{
    this.toastr.error('Select Region before you add a new District', 'Alert');
  }

}
OnAddNewSiteDistrictDetails(){
  let region_id = this.manufacturingSiteFrm.get('region_id').value;
  
  this.addDistrictsDetailsFrm.reset();
  if(region_id>0){
    this.addDistrictsDetailsFrm.get('region_id').setValue(region_id);
   
    this.addDistrictsDetailsWin = true;
  }
  else{
    this.toastr.error('Select Region before you add a new District', 'Alert');
  }

}
OnAddNewSiteReionDetails(){
  let country_id = this.manufacturingSiteFrm.get('country_id').value;
  
  this.addRegionDetailsFrm.reset();
  if(country_id >0){
    this.addRegionDetailsFrm.get('country_id').setValue(country_id);
   
    this.addRegionDetailsWin = true;
  }
  else{
    this.toastr.error('Select Country before you add a new REgion', 'Alert');
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
onSaveaddDistrictDetails(){
  this.spinner.show();
  this.addDistrictsDetailsFrm.get('tablename').setValue('par_districts');
  this.utilityService.onsaveApplicationUniformDetails('', this.addDistrictsDetailsFrm.value, 'onSaveUniformConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadDistricts(this.region_id);
       
        this.addDistrictsDetailsWin = false;
        this.toastr.success(this.product_resp.message, 'Response');

      } else {
        this.toastr.error(this.product_resp.message, 'Alert');
      }
      this.spinner.hide();
    },
    error => {
      this.toastr.error('Error Occurred', 'Alert');
    });

}  onAddManufacturingSite() {
  this.spinner.show();
  let manufacturer_name = this.manufacturingSiteFrm.get('name').value;
  let physical_address = this.manufacturingSiteFrm.get('physical_address').value;
   this.appService.onAddManufacturingSite('par_man_sites', this.manufacturingSiteFrm.value)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.OnLoadproductManufacturersData(this.product_id);
          this.isnewmanufactureringSiteDetailsModalShow = false;
          this.isproductManufactureringSiteModalShow = false;
          if (this.manufacturer_type_id == 1) {
            this.isproductmanSiteDetailsModalShow = true;

            this.productmanufacturingSiteFrm.get('man_site_id').setValue(this.product_resp.record_id)
            this.productmanufacturingSiteFrm.get('manufacturing_site_name').setValue(manufacturer_name)
            this.productmanufacturingSiteFrm.get('physical_address').setValue(physical_address)

          }
          else {
            this.isapimanSiteDetailsModalShow = true;
            this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(this.product_resp.record_id)
            this.productapimanufacturingSiteFrm.get('name').setValue(manufacturer_name)
            this.productapimanufacturingSiteFrm.get('physical_address').setValue(physical_address)
          }
          this.spinner.hide();
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
          if (this.manufacturer_type_id == 1) {
            this.isproductmanSiteDetailsModalShow = true;
            this.productmanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
            this.productmanufacturingSiteFrm.get('manufacturer_name').setValue(manufacturer_name)
           

          }
          else {
            
            this.isapimanSiteDetailsModalShow = true;
            this.productapimanufacturingSiteFrm.get('manufacturer_id').setValue(manufacturer_id)
            this.productapimanufacturingSiteFrm.get('name').setValue(manufacturer_name)
          
          }

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

onSearchInspectedManufacturingSites(){
 
  this.isgmpinspectionModalShow = true;
  this.loadAddProdGmpInspectionDetails();

}funcSelectGmpInspection(data) {
  //gmp_site_id
  let gmp_data = data.data;

  this.prodgmpAddinspectionFrm.patchValue(data.data);
  this.isgmpAddinspectionModalShow = true;
  let manufacturing_site_id = data.data.manufacturing_site_id;

  this.productmanufacturingSiteFrm.get('inspected_site_name').setValue(gmp_data.inspected_site_name);
  this.productmanufacturingSiteFrm.get('reg_site_id').setValue(gmp_data.reg_site_id);
  this.productmanufacturingSiteFrm.get('gmp_application_code').setValue(gmp_data.gmp_application_code);
 
  this.onLoadgmpProductLineData(manufacturing_site_id);

}
}
