

import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';

import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SharedPremisesregistrationclassComponent } from '../../shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';


@Component({
  selector: 'app-premises-businessdetails',
  templateUrl: './premises-businessdetails.component.html',
  styleUrls: ['./premises-businessdetails.component.css']
})
export class PremisesBusinessdetailsComponent implements OnInit {

  @Input() premisesOtherDetailsfrm: FormGroup;
  @Input() premisesOtherDetailsRows: any;
  @Input() isBusinessTypePopupVisible: boolean;
  @Input() businessTypesData: any;
  @Input() businessTypeDetailsData: any;
  @Input() is_readonly: boolean;

  @Input() business_type_id: number;
  @Input() premise_id: number;
  @Input() section_id: number;
  @Input() premisesGeneraldetailsfrm: FormGroup;
  
  premises_resp:any;
  loading:boolean;
  isFoodPremises:boolean;
  premises_typetitle:string;
  premisesactivitytitle:string;
  productSubCategoryData:any;
  productCategoryData:any;
  manufacturingRoleData:any;
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService,public fb: FormBuilder,public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {
   

  }

  ngOnInit() {
    if(this.section_id == 1){
      this.isFoodPremises = true;
      this.premises_typetitle = "Product Types";
    }
    else{
      this.isFoodPremises = false;
      this.premises_typetitle = "Premises Main Activities";
    }
    this.onLoadproductCategoryData(this.section_id);
    this.onLoadPremisesOtherDetails();
    this.onLoadmanufacturingRoleData();
  } onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }onLoadmanufacturingRoleData() {

    var data = {
      table_name: 'par_manufacturing_roles'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.manufacturingRoleData = data;
         
        });

  }
  onLoadproductCategoryData(section_id) {
    var data = {
      table_name: 'par_product_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productCategoryData = data;
        });
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
  }onPremisesBusinesDetailsToolbar(e,is_readonly) {

    this.functDataGridToolbar(e, this.funAddPremisesOtherDetails, this.premises_typetitle,is_readonly);

  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  } functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false, refreshAction='') {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: refreshAction
        }
      });
  } 
  funcEditPremisesDetails(data) {
    this.premisesOtherDetailsfrm.patchValue(data.data)

    this.isBusinessTypePopupVisible = true;
  }funcDeletePremisesBusinessDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_otherdetails';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_details', 'Premises Personnel');

  }
  funcDeleteDetailhelper(record_id, apppremises_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
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
            this.appService.onDeletePremisesDetails(record_id, table_name, apppremises_id, 'Premises Other Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                      this.onLoadPremisesOtherDetails();

                    
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
  
  }onLoadPremisesOtherDetails() {

    this.appService.onLoadPremisesOtherDetails(this.premise_id)
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  }
  onSavePremisesOtherDetails() {
    if (this.premisesOtherDetailsfrm.invalid) {
      this.toastr.error('Fill In all the premises details details', 'Alert');
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesOtherDetails(this.premise_id, this.premisesOtherDetailsfrm.value)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isBusinessTypePopupVisible = false;
            this.onLoadPremisesOtherDetails();
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  funAddPremisesOtherDetails() {
    this.isBusinessTypePopupVisible = true;
    //reset the form 
    this.premisesOtherDetailsfrm.reset();
    this.premisesOtherDetailsfrm.get('business_type_id').setValue(this.business_type_id);
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
  }
  
}
