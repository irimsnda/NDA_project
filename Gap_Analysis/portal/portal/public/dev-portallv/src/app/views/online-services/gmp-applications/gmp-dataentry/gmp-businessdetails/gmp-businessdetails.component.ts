
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedGmpapplicationclassComponent } from '../../shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gmp-businessdetails',
  templateUrl: './gmp-businessdetails.component.html',
  styleUrls: ['./gmp-businessdetails.component.css']
})
export class GmpBusinessdetailsComponent implements OnInit {
  
  @Input() premisesOtherDetailsRows: any;
  @Input() isBusinessTypePopupVisible: boolean;
  @Input() businessTypesData: any;
  @Input() businessTypeDetailsData: any;
  @Input() gmpOtherDetailsfrm: FormGroup;
  
  @Input() is_readonly: boolean;
  @Input() business_type_id: number;
  @Input() manufacturing_site_id: number;
  addBusinessTypeDetailsfrm:FormGroup;
  addBusinessTypeDetailsMdl: boolean=false;
  gmp_resp:any;
  product_resp:any;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: GmpApplicationServicesService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public dmsService:DocumentManagementService,public utilityService:Utilities,public httpClient: HttpClient) { 
     
  }
  ngOnInit() {
    this.addBusinessTypeDetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      business_type_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    
    });
    

  }
  onSaveProductTypeDetails(){
    this.addBusinessTypeDetailsfrm.get('tablename').setValue('par_business_type_details')
    this.addBusinessTypeDetailsfrm.get('business_type_id').setValue(this.business_type_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addBusinessTypeDetailsfrm.value, 'onSaveUniformConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onBusinessTypesDetailsLoad(this.business_type_id);
         
          this.addBusinessTypeDetailsMdl = false;
          this.gmpOtherDetailsfrm.get('business_type_detail_id').setValue(this.product_resp.record_id)
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
  onAddBusinessTypeDetails(){
    this.addBusinessTypeDetailsfrm.reset();
    this.addBusinessTypeDetailsMdl = true;
  
  } funcEditPremisesDetails(data) {
    this.gmpOtherDetailsfrm.patchValue(data.data)

    this.isBusinessTypePopupVisible = true;
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled:is_readonly,
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
  }  refreshDataGrid() {
    //this.dataGrid.instance.refresh();
  }onPremisesBusinesDetailsToolbar(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funAddPremisesOtherDetails, 'Business Type Details',is_readonly);

  }
  
  funAddPremisesOtherDetails() {
    this.isBusinessTypePopupVisible = true;
    //reset the form 
    this.gmpOtherDetailsfrm.reset();
    this.gmpOtherDetailsfrm.get('business_type_id').setValue(this.business_type_id);
    this.onBusinessTypesDetailsLoad(this.business_type_id)
  }
 
  
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_type_details',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data);
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  } onSaveGmpOtherDetails() {
    if (this.gmpOtherDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSaveGmpOtherDetails('wb_mansite_otherdetails', this.gmpOtherDetailsfrm.value,this.manufacturing_site_id)
      .subscribe(
        response => {
          this.gmp_resp = response.json();
          if (this.gmp_resp.success) {
            this.toastr.success(this.gmp_resp.message, 'Response');
            this.isBusinessTypePopupVisible = false;
            this.onLoadPremisesOtherDetails(this.manufacturing_site_id);
          } else {
            this.toastr.error(this.gmp_resp.message, 'Alert');
          }
        },
        error => {
         // this.loading = false;
        });
  }
   //reload the premsies Other Details 
   onLoadPremisesOtherDetails(manufacturing_site_id) {

    this.appService.onLoadGmpOtherDetails(manufacturing_site_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  } funcDeletePremisesBusinessDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let manufacturing_site_id = data.data.manufacturing_site_id;
    let table_name = 'wb_mansite_otherdetails';
  
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete Business Details?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeleteGMPDetails(record_id, table_name, manufacturing_site_id, 'Business Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();
                 
                  if (resp.success) {
                    this.onLoadPremisesOtherDetails(manufacturing_site_id);

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
