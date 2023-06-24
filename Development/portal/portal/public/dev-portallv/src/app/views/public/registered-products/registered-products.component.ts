import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

import DataGrid from "devextreme/ui/data_grid";
import CustomStore from 'devextreme/data/custom_store';
import { DomSanitizer } from '@angular/platform-browser';
import DataSource from 'devextreme/data/data_source';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';

@Component({
  selector: 'app-registered-products',
  templateUrl: './registered-products.component.html',
  styleUrls: ['./registered-products.component.css']
})


export class RegisteredProductsComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  title: string="Registered Products";
  dataGridInstance: DataGrid;
  sectionsData: any;
  classificationData:any;
  commonNamesData:any;
  productDosageFormData:any;
  countriesData:any;
  registeredProductsFrm:FormGroup;
  registeredProductsData:any ={};
  
  isPrintReportVisible:boolean = false;
  printReportTitle:string;
  
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  printiframeUrl:string;
  section_id:number;
  sub_modulesin:string;
  isAdvancedSearch:boolean=false;
  isViewApplicationDocuments:boolean=false;
  module_id:number;
  status_id: number;
  sub_module_id: number;
  application_code:number;
  appDocumentsUploadData: any;

  document_previewurl: any;
   isDocumentPreviewDownloadwin:boolean;
  constructor(public httpClient:HttpClient, public toastr: ToastrService,  private publicService: PublicService,private spinner: SpinnerVisibilityService,private config: ConfigurationsService,private configService: ConfigurationsService,public dmsService: DocumentManagementService) { 
    
    this.registeredProductsFrm = new FormGroup({
            registration_no: new FormControl('', Validators.compose([])),
            brand_name: new FormControl('', Validators.compose([])),
            classification_id: new FormControl('', Validators.compose([])),
            common_name_id: new FormControl('', Validators.compose([])),
            product_form_id: new FormControl('', Validators.compose([])),
            market_authorisation_holder: new FormControl('', Validators.compose([])),
            country_id: new FormControl('', Validators.compose([])),
            manufacturer_name: new FormControl('', Validators.compose([])),
            man_country_id: new FormControl('', Validators.compose([])),
            local_represenatative: new FormControl('', Validators.compose([]))
    });

    this.onLoadSections();
    this.onLoadcountriesData();
  }

  ngOnInit() {
    
  }
  funViewApplicationDocument(data){

    this.module_id = data.module_id;
    this.status_id= data.status_id;
    this.sub_module_id= data.sub_module_id;
    this.application_code= data.application_code;
    this.onLoadApplicationDocUploads()
    this.isViewApplicationDocuments = true;

  }
  
  onRegisteredProductsPreparing(e){

    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Print Products Information',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: ''//this.funcselNewApplication.bind(this)

      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Export Products Information',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: ''//this.funcselNewApplication.bind(this)

      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  
  onLoadcountriesData() {
    var data = {
      table_name: 'par_countries',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.countriesData = data;
        });
  }
  onSectionsCboSelect($event) {
    this.onClassificationsLoad($event.value);
    this.onCommonNamesLoad($event.value);
    this.onproductDosageFormData($event.value);
  }
  onClassificationsLoad(section_id) {

    var data = {
      table_name: 'par_classifications',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        },
        error => {
          return false
        });
  }
 
  onCommonNamesLoad(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };
    
  
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
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
 
  onproductDosageFormData(section_id) {
    var data = {
      table_name: 'par_dosage_forms',
      section_id: section_id
    };
    
  
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
          
           this.productDosageFormData  = new DataSource({
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
  onSearchRegisteredproducts(){
    this.spinner.show();
   
    this.dataGridInstance.refresh();

  }
  onExportRegisteredproducts(){
    let extra_params = this.registeredProductsFrm.value;
    //
    let report_url = this.base_url+"reports/onExportRegisteredproducts?section_id="+this.section_id+"&sub_modulesin="+this.sub_modulesin+"&filters="+encodeURIComponent(JSON.stringify(extra_params));
    console.log(report_url);
   this.funcGenerateRrp(report_url,"Registered Products");
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  onLoadRegisteredProducts(section_id,sub_modulesin){
   
        this.spinner.show();
      let me = this;
        var headers = new HttpHeaders({
          "Accept": "application/json"
        });
        this.registeredProductsData.store = new CustomStore({
          load: function (loadOptions: any) {
            let extra_params = me.registeredProductsFrm.value;
            let extra_paramsdata = JSON.stringify(extra_params);
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;
              
              params += '&section_id=' + section_id;
              params += '&sub_modulesin=' + sub_modulesin;
              params += '&extra_paramsdata=' + extra_paramsdata;
              return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicRegisteredproducts'+ params)
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
  onClearRegisteredproductsFilter(){
    this.registeredProductsFrm.reset();
    this.dataGridInstance.refresh();
  }advanceSearchTermscheckbox(e) {

    this.isAdvancedSearch = e.value;

  }onLoadApplicationDocUploads(){
    let document_type_id = 24;
    let action_params = { document_type_id: document_type_id, application_code: this.application_code, section_id: this.section_id, sub_module_id: this.sub_module_id,};
    this.dmsService.onLoadApplicationDocploads(action_params,'getUploadedApplicationSMPCDoc')
      .subscribe(
        data => {
          if (data.success) {
            this.appDocumentsUploadData = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }funDownloadApplicationDocument(data) {
    this.spinner.show();
    if(data.node_ref == ''){
      this.toastr.success('No Document for you to download', 'Response');
      return;
    }
    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.id)
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
        },
        error => {
        //  this.loading = false;
        });
  }
}
