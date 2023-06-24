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

@Component({
  selector: 'app-order-suppydangerous-gendetails',
  templateUrl: './order-suppydangerous-gendetails.component.html',
  styleUrls: ['./order-suppydangerous-gendetails.component.css']
})
export class OrderSuppydangerousGendetailsComponent  implements OnInit {
  @Input() applicationGeneraldetailsfrm: FormGroup;

  @Input() sectionsData: any;
  @Input() applicationTypeData: any; 
  @Input() applicationCategoryData: any; 
  @Input() sub_module_id: any; 
  @Input() applicationTypeCategoryData: any; 
  @Input() permitReasonData: any; 
  @Input() portOfEntryExitData: any; 
  @Input() payingCurrencyData: any; 
  
  @Input() currencyData: any;
  @Input() consigneeOptionsData: any; 
  @Input() consignee_options_check: any; 
  @Input() zoneData: any; 
  @Input() module_id: any; 
  @Input() importExportPermitTypesData: any; 
  @Input() application_code: any; 
  @Input() ispremisesSearchWinVisible: any; 
  @Input() registered_premisesData: any; 
  
  @Input() issenderreceiverSearchWinVisible: any; 
  @Input() consignee_sendertitle: any; 
  @Input() issenderreceiverAddWinVisible: any; 
  @Input() permitReceiverSenderFrm: FormGroup; 
  @Input() countries: any; 
  @Input() regions: any; 
  @Input() districts: any; 
  @Input() section_id: number; 
  @Input() importexport_permittype_id: number; 
  @Input() deviceTypeData: any; 
  @Input() modeOfTransportData:any;
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
  hasotherpermit_reason:boolean= false;
  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
  

  }
  ngOnInit(){
    this.onLoadCountries();
    if(this.section_id == 4){
      this.device_type_visible = true;
    }
   
  }
  
  onPermitReasonDataSelect($event) {
    
    if($event.selectedItem.id){
      let is_other_config = $event.selectedItem.is_other_config;

      if(is_other_config == 1){
        this.hasotherpermit_reason = true;
        this.applicationGeneraldetailsfrm.get('otherpermit_reason').setValidators([Validators.required]);
      }else{
        this.hasotherpermit_reason = false;
        this.applicationGeneraldetailsfrm.get('otherpermit_reason').setValidators([]);
      }
    }
  }
  onProformaInvoiceCurrencyChange($event) {
    this.proforma_currency_id = $event.value;
    this.onProformaInvoiceEvent.emit(this.proforma_currency_id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onsearchSenderreceiver() {
    this.consignee_sendertitle = 'Sender/Receiver Details';
    this.checkifsenderreceiver = true;
    
        this.issenderreceiverSearchWinVisible = true;

        let me = this;
        this.senderReceiverData.store = new CustomStore({
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
                params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter,table_name:'tra_permitsenderreceiver_data'}
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
  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });
  }
  nullFunc() {

  }
  onPremisesPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.nullFunc, '');
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
  
  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
    
      this.applicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.applicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
   /* }
    else {
      this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
    }
*/
  }
}
