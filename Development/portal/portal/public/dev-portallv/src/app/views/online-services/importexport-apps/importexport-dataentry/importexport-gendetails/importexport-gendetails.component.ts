
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import CustomStore from 'devextreme/data/custom_store';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/shared-importexportclass.component';

@Component({
  selector: 'app-importexport-gendetails',
  templateUrl: './importexport-gendetails.component.html',
  styleUrls: ['./importexport-gendetails.component.css']
})
export class ImportexportGendetailsComponent implements OnInit {
  @Input() applicationGeneraldetailsfrm: FormGroup;

  @Input() sectionsData: any;
  @Input() applicationTypeData: any; 
  @Input() applicationCategoryData: any; 
  @Input() sub_module_id: any; 
  @Input() applicationTypeCategoryData: any; 
  @Input() permitReasonData: any; 
  @Input() portOfEntryExitData: any; 
  @Input() payingCurrencyData: any;  
  @Input() modeOfTransportData: any; 
  
  @Input() currencyData: any;
  @Input() consigneeOptionsData: any; 
  @Input() consignee_options_check: any; 
  @Input() zoneData: any; 
  @Input() module_id: any; 
  
  @Input() application_code: any; 
  @Input() ispremisesSearchWinVisible: any; 
 
  @Input() registered_premisesData:any ={};
  @Input() issenderreceiverSearchWinVisible: any; 
  @Input() consignee_sendertitle: any; 
  @Input() issenderreceiverAddWinVisible: any; 
  @Input() permitReceiverSenderFrm: FormGroup; 
  @Input() countries: any; 
  @Input() regions: any; 
  @Input() districts: any; 
  @Input() section_id: number; 
  @Input() deviceTypeData: any; 
  @Input() permitProductsCategoryData: any; 

  proforma_currency_id:number;
  @Output() onProformaInvoiceEvent = new EventEmitter();
  
  device_type_visible:boolean= false;
  import_typecategory_visible:boolean= false;
  consignee_options_id:number;
  senderReceiverData:any ={};
  checkifsenderreceiver:boolean;
  isconsigneeSearchWinVisible:boolean;
  consigneeReceiverData:any ={};
  dataGrid: DxDataGridComponent;
  app_resp:any;
  isReadOnly:boolean;
  hide_visalicensedetails:boolean = false;
  invoice_title:string;
  has_registred_outlet:boolean= false;
  showreason_fornonregister_outlet:boolean= false;
  confirmDataParam:any;
  is_licensepermit: boolean =false;
  consignor_title:string = 'Consignor(Supplier/Receiver)';
  eligibleImportersData:any;
  eligibleImportersDocTypes:any;
  filesToUpload: Array<File> = [];  
  showsupporting_document:boolean;
  has_submittedpremisesapp:boolean;
  processData:any;
  title:string;
  router_link:string;
  premisesapp_details:any;
  app_route:any;
  maxDate:any;
  premise_title:string = 'Premises(Licensed Outlet(s))';
  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient, private premService: PremisesApplicationsService) {
  
    
  }
  ngOnInit(){
    this.maxDate = new Date();
    if(this.sub_module_id == 78 || this.sub_module_id == 81){
          this.is_licensepermit = true; 
          this.invoice_title = "Commercial Invoice";
    }else if(this.sub_module_id == 82){
      this.is_licensepermit = true; 
      this.invoice_title = "Commercial Invoice";
      this.hide_visalicensedetails = true;
      this.has_registred_outlet =false;
      this.showreason_fornonregister_outlet=false;
      
    }else{
      this.is_licensepermit = false;
      this.invoice_title = "Proforma Invoice";
    }
    this.onLoadCountries();
    this.onLoadEligibleImportersData(this.section_id);
    this.onLoadeligibleImportersDocTypes();
    
    this.onLoadconfirmDataParm() ;
    if(this.section_id == 4){
      this.device_type_visible = true;
    }
    this.import_typecategory_visible = false;
    if(this.sub_module_id == 13 || this.sub_module_id == 15){
       // this.import_typecategory_visible = true;
    }

    if(this.sub_module_id == 78 || this.sub_module_id ==82 || this.sub_module_id == 12){

      this.consignor_title = 'Consignor(Supplier)';

    }
    else{

      this.consignor_title = 'Consignor(Receiver)';
      
    }
  }
  onApplicationCategorySelection($event){
    let permit_category_id = $event.selectedItem.id;
    this.onLoadpermitProductsCategoryData(permit_category_id);

  }
  onLoadpermitProductsCategoryData(permit_category_id) {

    var data = {
      table_name: 'par_permitsproduct_categories',
      permit_category_id:permit_category_id,
      section_id:this.section_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.permitProductsCategoryData = data;
        });

  }
  onLoadeligibleImportersDocTypes() {

    var data = {
      table_name: 'par_eligible_importersdoctypes'
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.eligibleImportersDocTypes = data;
        });

  }
  
  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }

  }
  onhaveSubmittedutlets4Inspection($event){
    let has_submitted_outlets = $event.selectedItem.id;
    
    if (has_submitted_outlets == 1) {
       this.has_registred_outlet = true;
       this.showreason_fornonregister_outlet = false;
       this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
     

    }
    else{
      this.modalServ.openDialog(this.viewRef, {
        title: 'Do you want to initiate application for Premises Inspection & Registration Request? Note: the permit application will be allowed upon acceptance of your Premises Application by the Authority?',
        childComponent: '',
        settings: {
          closeButtonClass: 'fa fa-close'
        },
        actionButtons: [{
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.spinner.show();
            this.onPremisesAppSelection();
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

  }
  onPremisesAppSelection() {

    this.spinner.show();
    this.section_id = this.section_id;
    this.sub_module_id = 1;

    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.premisesapp_details = {module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id };
            this.premService.setPremisesApplicationDetail(this.premisesapp_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }
  onhaveRegOutletsChange($event) {
    let has_registered_outlets = $event.selectedItem.id;
    
    if (has_registered_outlets == 1) {
      this.has_registred_outlet = true;
      this.showsupporting_document = false;
      this.showreason_fornonregister_outlet = false;
      this.has_submittedpremisesapp = false;
       this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
     
       this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id').setValidators([]);
       this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id').setValidators([]);
      
    }
    else {
     
        this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);

        this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id').setValidators([]);
        this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id').setValidators([]);

        this.has_registred_outlet = false;
        this.showreason_fornonregister_outlet = true;


    }
 
  }

  onChangeImporterCategory($event) {
    let is_non_eligibleimporter = $event.selectedItem.is_non_eligibleimporter;
    if(is_non_eligibleimporter ==1){
      this.has_registred_outlet = true;
      this.showsupporting_document = false;
      
      this.has_submittedpremisesapp = true;
      this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
      this.toastr.error('The selected Importer Category is required to submit Premises Application before the Import Process.','Warning -Requirement');

    }else{

      this.has_submittedpremisesapp = false;
      this.showsupporting_document = true;
      this.has_registred_outlet = false;
      this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
      this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
   
    }
    
  }
  // let non_eligibleimporter = $event.selectedItem.non_eligibleimporter;
onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }

  onLoadEligibleImportersData(section_id) {
    var data = {
      table_name: 'par_eligible_importerscategories',
      section_id: this.section_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.eligibleImportersData = data;
        });
  }
  
  
  onProformaInvoiceCurrencyChange($event) {
    this.proforma_currency_id = $event.value;
    this.onProformaInvoiceEvent.emit(this.proforma_currency_id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onsearchSenderreceiver() {
    this.consignee_sendertitle = this.consignor_title;
    this.checkifsenderreceiver = true;
    
        this.issenderreceiverSearchWinVisible = true;

        let me = this;
        this.senderReceiverData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_premises_applica'}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getSenderreceiversDetails',this.configData)
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
  onsearchConsignee() {
    
    this.consignee_sendertitle = 'Consignee Details';
    this.checkifsenderreceiver = false;

    this.isconsigneeSearchWinVisible = true;
        let me = this;
        this.consigneeReceiverData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_consignee_data'}
              };
              return me.httpClient.get(AppSettings.base_url + 'importexportapp/getSenderreceiversDetails',this.configData)
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
  
  onRegisteredPremisesSearch1() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });
  }//23000
  onRegisteredPremisesSearch() {
        this.ispremisesSearchWinVisible = true;
        let me = this;
        this.registered_premisesData.store = new CustomStore({
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
                  params: {skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_premises_applications'}
              };

              return me.httpClient.get(AppSettings.base_url + 'premisesregistration/getTradersRegisteredPremises',this.configData)
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

  nullFunc() {

  }
  onPremisesPerGridToolbar(e) {
    //this.functDataGridToolbar(e, this.nullFunc, '');
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
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
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
    let has_registered_outlets = this.applicationGeneraldetailsfrm.get('has_registered_outlets').value;

   // if (status_id == 2 || has_registered_outlets == 2) {
      this.applicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.applicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
    /*
    }
    else {
      this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
    }

    */
  }
  funcSelectReceiverSender(data) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('sender_receiver_id').setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('sender_receiver').setValue(data.data.name);
    } else {
      this.applicationGeneraldetailsfrm.get('consignee_id').setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('consignee_name').setValue(data.data.name);
    }
    this.issenderreceiverSearchWinVisible = false;
    this.isconsigneeSearchWinVisible = false;
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
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

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

  onCoutryCboSelect($event) {


    this.onLoadRegions($event.selectedItem.id);

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
  
  onsavePermitReceiverSender() {
    this.spinner.show();
    let table_name;
    if (this.checkifsenderreceiver) {
      table_name = 'tra_permitsenderreceiver_data';
    } else {
      table_name = 'tra_consignee_data';
    }
    let name = this.permitReceiverSenderFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.permitReceiverSenderFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.issenderreceiverAddWinVisible = false;

            this.updateConsigneeReceiver(this.app_resp.record_id, name)
            this.toastr.success(this.app_resp.message, 'Response');

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  updateConsigneeReceiver(id, name) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('sender_receiver_id').setValue(id);
      this.applicationGeneraldetailsfrm.get('sender_receiver').setValue(name);
    } else {
      this.applicationGeneraldetailsfrm.get('consignee_id').setValue(id);
      this.applicationGeneraldetailsfrm.get('consignee_name').setValue(name);
    }
  }
  onsenderreceivePreparing(e) {
    this.functDataGridToolbar(e, this.funcsenderreceivedetails, 'Add Information');
  }
  funcsenderreceivedetails() {
    this.issenderreceiverSearchWinVisible = false;
    this.issenderreceiverAddWinVisible = true;
    this.permitReceiverSenderFrm.reset();

  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
}

onCellRegisteredPremisesPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "validity_status") {
    let application_status_id =e.data.validity_status_id;
      if(application_status_id ==1){
        e.cellElement.style.color = 'black';
        e.cellElement.style.backgroundColor = '#ff0000';    
      }
      else if(application_status_id == 2){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#3df14f';  
      
      }
      else if(application_status_id == 3){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#c90076';  

      } else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f44336';  
    
      }
  }
}
}
