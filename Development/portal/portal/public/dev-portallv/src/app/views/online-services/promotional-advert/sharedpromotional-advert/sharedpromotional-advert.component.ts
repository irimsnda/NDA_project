import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { PromotionadvertService } from 'src/app/services/promotionadvert-app/promotionadvert.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';

@Component({
  selector: 'app-sharedpromotional-advert',
  templateUrl: './sharedpromotional-advert.component.html',
  styleUrls: ['./sharedpromotional-advert.component.css']
})
export class SharedpromotionalAdvertComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  process_title: string;
  tracking_no: string;
  status_id: number;
  status_name: string;
  app_resp:any;printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  isInitalQueryResponseFrmVisible:boolean = false;
  promotionalMaterialsDta:any;
  promotionalChannelsDta:any;
  advertisementMeetingTypesDta:any;
  routeOfAdministrationData:any;
  applicationPreckingQueriesData:any;
  initqueryresponsefrm:FormGroup;
  onApplicationSubmissionFrm:FormGroup;
  zoneData: any;
  applicationTypeData: any;
  sectionsData: any;
  app_route: any;
  app_details: any;
  registrantOptionsData: any;
  is_sponsor: any;
  section_id: number;
  sub_module_id: number;
  module_id: number=14;
  application_id: number;
  application_code: number;
  trader_title: string;
  traderAccountsDetailsData: any;
  promotionalappGeneraldetailsfrm: FormGroup;
  sponsor_optionDisabled: boolean = false;
  documentUploadfrm: FormGroup;
  distributionCategoryData: any;
  productCategoryData: any;
  productSubCategoryData:any;
  productIngredientsdetailsfrm: FormGroup;
  documentsUploadData: any;
  isDocumentPreviewDownloadwin:boolean=false;
  document_previewurl:any;
  documentsUploadRequirementData: any;
  terms_conditions: any;
  confirmDataParam: any;
  isDocumentUploadPopupVisible: boolean = false;
  productTypeData:any;
  initWizardPanel:number= 0;
  promProductParticularsData:any;
  classificationData:any;
  params_where:any;
  apppromMaterialsDetailData:any;
  isPromotionalPersonnelAddWinShow:boolean = false;
  isHasExhibitionMeeting:boolean = false;
  isPromotionalPersonnelWinShow:boolean = false;
  promotional_personneltitle:string="Sponsor";
  promotional_materialspersonnelFrm:FormGroup;
  promotionalPersonnelData:any;

  loading:boolean;
  countries:any;
  districts:any; regions:any;
  sponsor_option_id:number;
  isPromotionalProductparticularswinadd:boolean = false;
  isPromotionalMaterialswinshow:boolean = false;

  promotionalProductparticularsfrm:FormGroup;
  promotionalMaterialsfrm:FormGroup;
  typeOfAdvertisementData:any;
  promotionalMaterialData:any;
  is_registered:boolean= false;
  option_id:number;
  commonNamesData:any;
  checkProductsSubmission:boolean= false;
  isRegisteredProductsWinshow:boolean = false;
  registeredProductsData:any = {};
  payingCurrencyData:any;

  query_sectioncheck:string;
  query_id:number;
  action_url:any;
  product_resp:any;
  appuploaded_document_id:number;
  addproductGenericNamesFrm:FormGroup;
  dosageFormsData: any;
  addproductGenericNamesModal:boolean;
  advertisement_type_id:number;
  constructor(public dmsService: DocumentManagementService, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public modalDialogue: ModalDialogService, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PromotionadvertService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService, public utilityService:Utilities,public httpClient: HttpClient,public appProdService:ProductApplicationService) {
   
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments:new FormControl('', Validators.compose([]))
    });
    this.onLoadpayingCurrencyData();

    this.app_details = this.appService.getApplicationDetail();
    if (!this.app_details) {
     // this.router.navigate(['./../online-services/promotional-advertdash']);
     // return;
    }
    else {
      this.section_id = this.app_details.section_id;
      this.sub_module_id = this.app_details.sub_module_id;
      this.process_title = this.app_details.process_title;
      this.application_id = this.app_details.application_id;

      this.tracking_no = this.app_details.tracking_no;
      this.status_name = this.app_details.status_name;
      this.status_id = this.app_details.status_id;
      this.application_code = this.app_details.application_code;

      this.status_name = this.app_details.status_name;
      this.status_id = this.app_details.application_status_id;
    
    }

    this.promotionalappGeneraldetailsfrm = new FormGroup({
      section_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
      sub_module_id: new FormControl('', Validators.compose([Validators.required])),

      module_id: new FormControl(this.module_id, Validators.compose([Validators.required])),
      exhibition_start_date: new FormControl('', Validators.compose([])),
      exhibition_end_date: new FormControl('', Validators.compose([])),
      venue_of_exhibition: new FormControl('', Validators.compose([])),
      description_of_advert: new FormControl('', Validators.compose([Validators.required])),
      advertisement_type_id: new FormControl('', Validators.compose([Validators.required])),
      meeting_types_id: new FormControl('', Validators.compose([])),
      other_promotion_meetingtype: new FormControl('', Validators.compose([])),
      physicaladdress_of_exhibition: new FormControl('', Validators.compose([])),
      promotionameeting_other_information: new FormControl('', Validators.compose([])),
      events_responsible_person: new FormControl('', Validators.compose([])),
      responsible_persons_physicaladdress: new FormControl('', Validators.compose([])),
      responsible_persons_contacts: new FormControl('', Validators.compose([])),
      promotions_material_id: new FormControl('', Validators.compose([])),
      other_promotion_materialtypes: new FormControl('', Validators.compose([])),
      otheradvertisement_channel: new FormControl('', Validators.compose([])),
      
      advertisement_channel_id: new FormControl('', Validators.compose([])),
      zone_id: new FormControl('', Validators.compose([])),

      application_code: new FormControl('', Validators.compose([])),
      applicant_as_sponsor: new FormControl('', Validators.compose([Validators.required])),
      sponsor_name: new FormControl('', Validators.compose([Validators.required])),
      sponsor_id: new FormControl('', Validators.compose([])),
      registered_promotionalapp_id: new FormControl('', Validators.compose([])),
      application_id: new FormControl(this.application_id, Validators.compose([])),

    });

    this.promotionalProductparticularsfrm = new FormGroup({
      brand_name: new FormControl(this.section_id, Validators.compose([Validators.required])),
      product_id: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([])),
      classification_id: new FormControl('', Validators.compose([])),
      product_category_id: new FormControl('', Validators.compose([])),
      distribution_category_id: new FormControl('', Validators.compose([])),

      product_strength: new FormControl('', Validators.compose([])),
      dosage_form_id: new FormControl('', Validators.compose([])),
      route_of_administration_id: new FormControl('', Validators.compose([])),
      shelf_life: new FormControl('', Validators.compose([])),
      storage_condition: new FormControl('', Validators.compose([])),
      manufacturer_name: new FormControl('', Validators.compose([])),
      manufacturer_id: new FormControl('', Validators.compose([])),
      is_registered: new FormControl('', Validators.compose([Validators.required])),
      registration_no: new FormControl('', Validators.compose([])),
      registrant_name: new FormControl('', Validators.compose([])),
      other_details: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      application_id: new FormControl('', Validators.compose([])),

    });
    this.addproductGenericNamesFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      therapeutic_code: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))
    }); 
    this.promotionalMaterialsfrm = new FormGroup({
      material_id: new FormControl(this.section_id, Validators.compose([Validators.required])),
      remarks: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      application_id: new FormControl('', Validators.compose([]))
    });

    this.promotional_materialspersonnelFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([]))
    });
    this.documentUploadfrm = this.formBuilder.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    this.onAutoLoadParameters();
    if (this.app_details) {

      this.promotionalappGeneraldetailsfrm.patchValue(this.app_details);
    }
    this.onloadApplicationProductParticulars();
    this.onLoadapppromMaterialsDetailData();
    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))

    });
    this.funcReloadQueriesDetails();
  }
  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }
  

  funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_promotion_adverts_applications')
      .subscribe(
        response => {
        if (response.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        } else {
          this.toastr.error(response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.message, 'Alert');
        this.spinner.hide();
      });
  }
  onLoadRegistrantOptions() {
    var data = {
      table_name: 'par_registrant_options',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.registrantOptionsData = data;
        });
  }
  funcDownloadQueryLetter(data){
    this.appuploaded_document_id = data.data.appuploaded_document_id;
    this.funcDownloadUploadedDoc();
  }
  funcDownloadUploadedDoc(){
    if(this.appuploaded_document_id >0){
      this.dmsService.getApplicationDocumentDownloadurl(this.application_code, '', this.appuploaded_document_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin  = true;
          }
          else {
            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });
    }
    else{
      this.toastr.error('No Query Letter that has been Uploaded, preview the query for detail.', 'Alert');
    }
  }
  closeQueryResponseWin(){
    this.isInitalQueryResponseFrmVisible = false;
    this.funcReloadQueriesDetails();
  }
  funcReloadQueriesDetails(){
    this.funcgetPreckingQueriesData();

  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      this.toastr.error('Fill in query response to proceed!!', 'Alert');
      return;
    }
    this.action_url  = 'onSavePrecheckingqueryresponse';

    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value,this.action_url)
      .subscribe(
        response => {
          this.product_resp = response.json();
          if (this.product_resp.success) {
            this.toastr.success(this.product_resp.message, 'Response');
            this.funcReloadQueriesDetails()
            this.query_id = this.product_resp.record_id;
            this.initqueryresponsefrm.get('query_id').setValue(this.query_id)

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  }
  funcInitQueryResponse(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    this.appuploaded_document_id = data.data.appuploaded_document_id;
    this.query_id =  data.data.query_id;
    this.isInitalQueryResponseFrmVisible = true;

  }
  funcgetPreckingQueriesData(){

    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_promotion_adverts_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  ngOnInit() {

  }
  onAutoLoadParameters(){

    this.onLoadClassificationData(this.section_id);
    this.onLoadproductCategoryData(this.section_id);
    this.onLoadconfirmDataParm();
    this.onLoadProductTypeData();
    this.onLoadZones();
    this.onLoadSections();
    this.onloadApplicationTypes();
    this.onLoadCountries();
    this.OnLoadtypeOfAdvertisementData(this.section_id);
    this.onLoadcommonNamesData(this.section_id);
    this.onLoadpromotionalMaterialData(this.section_id);
    this.onLoadpromotionalChannelsDtaDetails();
  }
  funcEditProductParticularsDetails(data) {

    this.promotionalProductparticularsfrm.patchValue(data.data);

    this.isPromotionalProductparticularswinadd = true;

  }
  funcSelectSponsorInvestigator(data) {

      this.promotionalappGeneraldetailsfrm.get('sponsor_id').setValue(data.data.id);
      this.promotionalappGeneraldetailsfrm.get('sponsor_name').setValue(data.data.name);

    this.isPromotionalPersonnelWinShow = false;
  }
  funcEditPromotionalMaterialsDetails(data) {

    this.promotionalMaterialsfrm.patchValue(data.data);

    this.isPromotionalMaterialswinshow = true;

  }
  funcDeleteProductParticularsDetails(data) {
    //func_delete records
    let record_id = data.data.id;
    let table_name = 'wb_promotion_prod_particulars';
    this.funcDeleteDetailhelper(record_id, this.application_id, table_name, 'product_particulars', 'Product Particulars');

  }
  funcDeletePromotionalMaterialsDetails(data) {
    //func_delete records
    let record_id = data.data.id;
    let table_name = 'wb_promotion_materials_details';
    this.funcDeleteDetailhelper(record_id, this.application_id, table_name, 'materials', 'Promotional Materials');

  }
  funcDeleteDetailhelper(record_id, application_id, table_name, reload_type, title) {
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
            this.appService.OnDeletePromotionalOtherDetails(record_id, table_name, application_id, 'Promotional Applications Details')
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    if (reload_type == 'product_particulars') {
                      this.onloadApplicationProductParticulars();

                    }
                    else if (reload_type == 'materials') {
                      this.onLoadapppromMaterialsDetailData();

                    }
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
  onLoadcommonNamesData(section_id) {
    var data = {
      table_name: 'par_common_names',
      section_id: section_id
    };

        this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
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
  OnLoadtypeOfAdvertisementData(section_id) {
    var data = {
      table_name: 'par_advertisement_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.typeOfAdvertisementData = data;
        });
  }

  onLoadpromotionalMaterialData(section_id) {
    var data = {
      table_name: 'par_promotion_material_items',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.promotionalMaterialData = data;
        });
  }


  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }
  onHasExhibitionMeeting($event) {

    if($event.selectedItem.is_promotion_meeting == 1){
        this.isHasExhibitionMeeting = true;
        this.onLoadAdvertmeetingTypesDetails();

      
        this.onApplicationSubmissionFrm.get('exhibition_start_date').setValidators([Validators.required]);
        this.onApplicationSubmissionFrm.get('exhibition_end_date').setValidators([Validators.required]);
        this.onApplicationSubmissionFrm.get('venue_of_exhibition').setValidators([Validators.required]);
        this.onApplicationSubmissionFrm.get('meeting_types_id').setValidators([Validators.required]);
        this.onApplicationSubmissionFrm.get('physicaladdress_of_exhibition').setValidators([Validators.required]);
        this.onApplicationSubmissionFrm.get('events_responsible_person').setValidators([Validators.required]);
      


    }
    else{
      this.isHasExhibitionMeeting = false;
      this.onLoadPromotionalMaterialsDetails();
      this.onApplicationSubmissionFrm.get('exhibition_start_date').setValidators([]);
      this.onApplicationSubmissionFrm.get('exhibition_end_date').setValidators([]);
      this.onApplicationSubmissionFrm.get('venue_of_exhibition').setValidators([]);
      this.onApplicationSubmissionFrm.get('meeting_types_id').setValidators([]);
      this.onApplicationSubmissionFrm.get('physicaladdress_of_exhibition').setValidators([]);
      this.onApplicationSubmissionFrm.get('events_responsible_person').setValidators([]);
    
    }
 
    
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
  onLoadPromotionalMaterialsDetails() {
    var data = {
      table_name: 'par_promotion_material_items'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.promotionalMaterialsDta = data;
        });
  }
  onLoadpromotionalChannelsDtaDetails() {
    var data = {
      table_name: 'par_advertisement_channel'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.promotionalChannelsDta = data;
        });
  }
  
  onLoadAdvertmeetingTypesDetails() {
    var data = {
      table_name: 'par_advertisementmeeting_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.advertisementMeetingTypesDta = data;
        });
  }

  
  onLoadClassificationData(section_id) {
    var data = {
      table_name: 'par_classifications',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
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

  onLoadProductTypeData() {
    var data = {
      table_name: 'par_product_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeData = data;
        });
  }
  onloadApplicationProductParticulars() {

    this.appService.getPromotionalAppOtherDetails({application_id:this.application_id}, 'promotionadverts/getPromotionalProductParticulars')
      //.pipe(first())
      .subscribe(
        data => {
          this.promProductParticularsData = data.data;
        },
        error => {
          return false
        });
  }
  onLoadapppromMaterialsDetailData() {

    this.appService.getPromotionalAppOtherDetails({application_id:this.application_id}, 'promotionadverts/getApppromMaterialsDetailData')
      //.pipe(first())
      .subscribe(
        data => {
          this.apppromMaterialsDetailData = data.data;
        },
        error => {
          return false
        });
  }

  onSavePromotionalApplication() {
   
    const invalid = [];
    const controls = this.promotionalappGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.promotionalappGeneraldetailsfrm.invalid) {
      return;
    }
    

  this.spinner.show();
  this.promotionalappGeneraldetailsfrm.patchValue({application_id:this.application_id});
    this.appService.onSavePromotionalAdvertapplication(this.promotionalappGeneraldetailsfrm.value, 'promotionadverts/savePromotionalAdvertapplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details
          this.tracking_no = this.app_resp.tracking_no;
          this.application_id = this.app_resp.application_id;
          this.tracking_no = this.app_resp.tracking_no;
          this.application_code = this.app_resp.application_code;
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });

  }
  onSavepromotionalProductparticulars() {
    if (this.promotionalProductparticularsfrm.invalid) {
      return;
    }
    this.promotionalProductparticularsfrm.patchValue({application_id:this.application_id});
    this.appService.onSavePromotionalAdvertapplication(this.promotionalProductparticularsfrm.value, 'promotionadverts/OnSavePromotionalProductParticulars')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details
          if (this.app_resp.success) {
            this.onloadApplicationProductParticulars();
            this.isPromotionalProductparticularswinadd = false;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });

  }
  onSavepromotionalMaterialsDetails() {
    if (this.promotionalMaterialsfrm.invalid) {
      return;
    }
    this.promotionalMaterialsfrm.patchValue({application_id:this.application_id});
    this.appService.onSavePromotionalAdvertapplication(this.promotionalMaterialsfrm.value, 'promotionadverts/onSavepromotionalMaterialsDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details
          if (this.app_resp.success) {
            this.onLoadapppromMaterialsDetailData();
            this.isPromotionalMaterialswinshow = false;
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });

  }

  onSavePromotionalPersonnel() {
//    this.spinner.show();
    let table_name;
    table_name = 'tra_promotionaladvert_personnel';
    let name = this.promotional_materialspersonnelFrm.get('name').value;
    this.utilityService.onAddPersonnDetails(table_name, this.promotional_materialspersonnelFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details
          if (this.app_resp.success) {
            this.isPromotionalPersonnelAddWinShow = false;

            this.promotional_materialspersonnelFrm.get('sponsor_id').setValue(this.app_resp.record_id);
            this.promotional_materialspersonnelFrm.get('sponsor_name').setValue(name);
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
  onLoadPersonnelDetails() {

    this.appService.getPromotionalAppOtherDetails({ table_name: 'tra_promotionaladvert_personnel' }, 'utilities/getPersonnelDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.promotionalPersonnelData = data.data;
            this.isPromotionalPersonnelWinShow = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }


  onApplicationDashboard() {
    this.app_route = ['./online-services/promotional-advertdash'];

    this.router.navigate(this.app_route);
  }

  onMovePreviousWizard(previous_step) {
    this.wizard.model.navigationMode.goToStep(previous_step);

  }
  onMoveNextWizard(nextStep) {
    //validate details
    if (nextStep == 1) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 2) {
      this.wizard.model.navigationMode.goToStep(nextStep);

    }
    else if (nextStep == 3) {

      this.wizard.model.navigationMode.goToStep(nextStep);

    }

  }
  funcValidateAppocumentsUpload(nextStep){
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_promotion_adverts_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          this.wizard.model.navigationMode.goToStep(nextStep);
        }
        else{
          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });

  }
  onProductParticularsPreparing(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funcAddProductParticulars, 'Promotional Product Particulars',is_readonly);

  }
  onPromotionalMaterialsDetails(e,is_readonly=false) {

    this.functDataGridToolbar(e, this.funcAddPromotionalMaterialsDetail, 'Promotional Materials Details',is_readonly);

  }
  funcAddPromotionalMaterialsDetail(){

    this.promotionalMaterialsfrm.reset();
    this.isPromotionalMaterialswinshow = true;

  }
  funcAddProductParticulars(){
      this.promotionalProductparticularsfrm.reset();
      this.isPromotionalProductparticularswinadd = true;

  }
  functDataGridToolbar(e, funcBtn, btn_title, is_readonly=false) {
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
    this.onloadApplicationProductParticulars();
  }

  onLoadGuidelines(sub_module_id, section_id) {
    this.configService.onLoadAppSubmissionGuidelines(sub_module_id, section_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
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
  onLoadZones() {
    var data = {
      table_name: 'par_zones'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }

  onloadApplicationTypes() {
    var data = {
      table_name: 'sub_modules',
      module_id: this.module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });

  }
  funcValidateProdPartcularsDetails(nextStep) {

    this.funcValidateStepDetails('Add Product Particulars Details to Proceed', this.promProductParticularsData, nextStep);

  }
  funcValidatePromotionalMaterialsDetails(nextStep) {

    this.funcValidateStepDetails('Add Promotion Materials to Proceed', this.apppromMaterialsDetailData, nextStep);

  }

  funcValidateStepDetails(title, dataStore, nextStep) {

    if (dataStore.length != 0 && dataStore.length) {
      this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(title, 'Alert');
    }

  }
  onPromotionalPersonnelPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddonPromotionalPersonnel, 'Promotional Material Sponsor');
  }
  funcAddonPromotionalPersonnel() {
    //this.isSponsorInvestigatorSearchWinVisible = false;
    this.isPromotionalPersonnelAddWinShow = true;
    //this..reset();

  }
  OnSelectSponsorOption($event) {

    this.sponsor_option_id = $event.selectedItem.id;
    if (this.sponsor_option_id == 1) {
      this.sponsor_optionDisabled = true;
      this.promotionalappGeneraldetailsfrm.patchValue({ sponsor_name: 'Trader as Sponsor', 'sponsor_id':'0'})

    }
    else {
      this.sponsor_optionDisabled = false;
      this.promotionalappGeneraldetailsfrm.patchValue({ sponsor_name: '', 'sponsor_id':''})

    }

  }
  OnSelectIsProductRegistered($event) {

    this.option_id = $event.selectedItem.id;
    if (this.option_id == 1) {
      this.is_registered = true;

    }
    else {
      this.is_registered = false;

    }

  }
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

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
  }
  funcValidateDocumentsUpload(nextStep){
    this.spinner.show();
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_promotion_adverts_applications')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {

          this.wizard.model.navigationMode.goToStep(nextStep);

        }
        else{

          this.toastr.error(response_data.message, 'Response');
        }

        this.spinner.hide();
      });

  }
  newProductTermscheckbox(e) {

    this.checkProductsSubmission = e.value;

  }
  
  onSearchRegisteredProductApplication(){

      this.isRegisteredProductsWinshow = true;
        let me = this;
        this.registeredProductsData.store = new CustomStore({
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
              return me.httpClient.get(AppSettings.base_url + 'productregistration/onSearchRegisteredProductApplication',this.configData)
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
  funSelectRegisteredProdcustsApp(data){
    let productdata = data.data;

    this.promotionalProductparticularsfrm.patchValue({brand_name:productdata.brand_name, common_name_id:productdata.common_name_id,product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});
    this.isRegisteredProductsWinshow = false;

  }
  onpplicationPrint(){


  }
  funcValidateApplicationVariationDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code, 'wb_application_variationsdata')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }
         
          this.spinner.hide();
        });

  }
  
onLoadClassifications(section_id) {
      
      this.params_where = {
        table_name: 'par_classifications',
        section_id: section_id
      };

    this.config.onLoadConfigurationData(this.params_where)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  } 
  
  onLoadproductCategory(section_id) {
    var data = {
      table_name: 'par_product_categories',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productCategoryData = data;
        });
  }  onLoaddistributionCategory() {
    var data = {
      table_name: 'par_distribution_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCategoryData = data;
        });
  } 
  
  onLoaddosageForms() {
    var data = {
      table_name: 'par_dosage_forms'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
         // this.dosageFormsData = data;
          this.dosageFormsData = new DataSource({
            paginate: true,
            pageSize: 200,
            store: {
              type: "array",
                data: data,
                key: "id"
            }
        });
        });
  }  onLoadrouteOfAdministration() {
    var data = {
      table_name: 'par_route_of_administration'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdministrationData = data;
        });
  }
   
onSaveNewGenericName(){
  this.addproductGenericNamesFrm.get('tablename').setValue('par_common_names')
  this.addproductGenericNamesFrm.get('section_id').setValue(this.section_id);
  this.utilityService.onsaveApplicationUniformDetails('', this.addproductGenericNamesFrm.value, 'onsaveProductConfigData')
  .subscribe(
    response => {
      this.product_resp = response.json();
      //the details 
      if (this.product_resp.success) {
        this.onLoadCommonNames(this.section_id);
       
        this.addproductGenericNamesModal = false;
        this.promotionalProductparticularsfrm.get('common_name_id').setValue(this.product_resp.record_id)
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

onLoadCommonNames(section_id) {
  var data = {
    table_name: 'par_common_names',
    section_id: section_id
  };
  this.confirmDataParam = {
    params: data,
    headers: { 'Accept': 'application/json' }
  };


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
}
