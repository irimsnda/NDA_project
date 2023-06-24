import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

import DataGrid from "devextreme/ui/data_grid";
import CustomStore from 'devextreme/data/custom_store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-servicetariff-fees',
  templateUrl: './servicetariff-fees.component.html',
  styleUrls: ['./servicetariff-fees.component.css']
})
export class ServicetariffFeesComponent implements OnInit {
  serviceFeesTaarrifsData:any ={};
  serviceChargesFilterFrm:FormGroup;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  module_id:number;
  applicationTypeData:any;
  sectionsDetailsData:any;
  regulatedProductTypesData:any;
  regulated_producttype_id:number;
  dataGridInstance: DataGrid;
  constructor(public config:ConfigurationsService,public spinner: SpinnerVisibilityService,public httpClient:HttpClient) { 
    this.serviceChargesFilterFrm = new FormGroup({
          sub_module_id: new FormControl('', Validators.compose([])),
          section_id: new FormControl('', Validators.compose([])),
          regulated_producttype_id: new FormControl('', Validators.compose([]))
    });
this. onLoadRegulatedProducttype();

  }
  ngOnInit() {


  }
  
  onloadApplicationTypes(module_id) {
    var data = {
      table_name: 'sub_modules',
      module_id: module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {

          this.applicationTypeData = data;

        });

  }
  onloadSectionsDetailss(regulated_producttype_id) {
    var data = {
      table_name: 'par_sections',
      regulated_producttype_id: regulated_producttype_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsDetailsData = data;
        });

  }
  onLoadRegulatedProducttype() {
    var data = {
      table_name: 'par_regulated_productstypes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.regulatedProductTypesData = data;
        });

  }
  onregulatedProductTypesDataSelect($event) {
    
    if($event.selectedItem.id){
      this.regulated_producttype_id = $event.selectedItem.id;
      this.onloadSectionsDetailss(this.regulated_producttype_id);
    }
  }
  onRestonSearchserviceCharges(){
    this.serviceChargesFilterFrm.reset();
   // this. onLoadRegulatedServicesCharges(this.module_id);
    this.dataGridInstance.refresh();
  }
  onSearchserviceCharges(){
   // this.onLoadRegulatedServicesCharges(this.module_id)
    this.dataGridInstance.refresh();
  }
  onLoadRegulatedServicesCharges(module_id){
   
  this.spinner.show();
  let me = this;
    var headers = new HttpHeaders({
      "Accept": "application/json"
    });
    this.serviceFeesTaarrifsData.store = new CustomStore({
      load: function (loadOptions: any) {
        let extra_params = me.serviceChargesFilterFrm.value;
        let extra_paramsdata = JSON.stringify(extra_params);
          var params = '?';
          params += 'skip=' + loadOptions.skip;
          params += '&take=' + loadOptions.take;
          
          params += '&module_id=' + module_id;
          params += '&extra_paramsdata=' + extra_paramsdata;
          return me.httpClient.get(AppSettings.base_url + 'publicaccess/onLoadRegulatedServicesCharges'+ params)
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
saveGridInstance (e) {
  this.dataGridInstance = e.component;

}
}
