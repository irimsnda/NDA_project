import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedpromotionalAdvertComponent } from '../../sharedpromotional-advert/sharedpromotional-advert.component';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-promotional-products-particulars',
  templateUrl: './promotional-products-particulars.component.html',
  styleUrls: ['./promotional-products-particulars.component.css']
})
export class PromotionalProductsParticularsComponent  extends SharedpromotionalAdvertComponent {
  @Input() promotionalProductparticularsfrm: FormGroup;
  @Input() promProductParticularsData: any;
  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  
  @Input() application_code: number;
  @Input() application_id: number;
  @Input() section_id: number;
  addproductGenericNamesFrm:FormGroup;
  addproductGenericNamesModal:boolean;
  manufacturersData: any;
  isManufacturerSitePopupVisible:boolean;
  isnewmanufacturerModalShow:boolean;
  manufacturerFrm:FormGroup;
  isproductManufacturerModalShow:boolean;
  ngOnInit() {
    this.addproductGenericNamesFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      therapeutic_code: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    }); 
    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required]))

    });
    this.onLoadrouteOfAdministration();
    this.onLoaddosageForms();
    this.onLoadproductCategory(this.section_id);
    this.onLoadClassifications(this.section_id);
    
  }
  onAddNewCommonNameDetails(){

    this.addproductGenericNamesFrm.reset();
    this.addproductGenericNamesModal = true;

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
  } 
  funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.promotionalProductparticularsfrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id});
     
    this.isManufacturerSitePopupVisible = false;

  } onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  funcAddManufacturerSite() {
    this.isnewmanufacturerModalShow = true;
    this.manufacturerFrm.reset();
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
            this.promotionalProductparticularsfrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
     
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
}
