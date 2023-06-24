import { Pipe, Component, OnInit, ViewChild, ViewContainerRef, Inject, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ApplicationDocumentsComponent } from 'src/app/views/online-services/application-documents/application-documents.component';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-shared-premisesregistrationclass',
  templateUrl: './shared-premisesregistrationclass.component.html',
  styleUrls: ['./shared-premisesregistrationclass.component.css']
})
@Pipe({ name: 'safe' })
export class SharedPremisesregistrationclassComponent {
  is_readonly:boolean = false;
  appuploaded_document_id:number;
  mis_url:string = AppSettings.mis_url;
  zoneparams:any;
  documentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  nonstructreddocumentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
      ]
    }
  ];
  
  documentVersionMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download'}
      ]
    }
  ];
  
  @ViewChild(DxDataGridComponent, ArchwizardModule)
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  query_ref_id:number;
  initWizardPanel:number = 0;
  dataGrid: DxDataGridComponent;
  dtElement: DataTableDirective;
  currentDate = new Date();
  //data table config
  dtpremOtherDetailsData: any = {};
  personnel_informationData: any = {};
  premPersonnelDetailsData: any = {};

  personnel_QualificationData: any = {};
  personnelPositionData: any = {};
  isPremisesAmmendementPopup:boolean = false;
  
  dtpremPersonnelData: any = {};
  appDocumentsUploadData: any = {};
  premPersonnelDocumentsUploadData:any = {};

  premDocumentsUploadRequirement:any = {};
  premDocumentsVersionsUploadData:any ={};
  app_resp:any;
  preDocumentRequirementsData: any = {};

  applicationCAPARequestsData:any;
  applicationReinspectionRequestsData:any;
  maxLength: number = 25;
  countries: any;
  regions: any;
  districts: any;
  sectionsData: any;
  country_id: number;
  region_id: number;
  ZoneData: any;
  premises_resp: any;
  tracking_no: string;
  application_code: number;
  premises_id: number;
  personnel_id: number;
  premisesGeneraldetailsfrm: FormGroup;
  premisesOtherDetailsfrm: FormGroup;
  premisesPersonnelDetailsfrm: FormGroup;
  newPremisesDirectorsDetailsFrm:FormGroup;
  premisesDirectorsDetailsfrm: FormGroup;
  premisesStafflDetailsfrm: FormGroup;

  premisesStoreslocationFrm:FormGroup;

  personnelDetailsfrm: FormGroup;
  personnelQualificationFrm: FormGroup;
   
  premisesDocumentUploadfrm: FormGroup;
  premisesPersonnelDocumentUploadfrm: FormGroup;

  premisesAmmendmentsrequestFrm:FormGroup;
  
  value: any;
  loading: false;
  app_route: any;
  terms_conditions: any;
  checkPremisesSubmission: boolean = false;
  businessScaleData: any;
  businessCategoryData: any;
  qualificationsData: any = {};
  studyFieldsData: any = {};
  classificationData: any;
  status_name: string;
  status_id: number;
  init_premise_id: number;
  tra_premise_id:number;
  registered_id:number;
  premise_id: number;
  process_title: string;
  sub_module_id: number;
  section_id: number;
  premisesapp_details: any;
  //premises other details 
  premisesOtherDetailsRows: any;
  registered_premisesData: any;

  premisesDocumentsRows: any;

  businessTypesData: any;
  businessTypeDetailsData: any;
  zoneData: any;
  isInitalCapaResponseFrmVisible:boolean;
 public business_type_id: number;
 isPrintReportVisible:boolean = false;
    printiframeUrl:string;
    printReportTitle:string;

  //premises pop-ups
  isBusinessTypePopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;
  isPersonnelDocumentUploadPopupVisible: boolean = false;
  isBusinessPersonnelPopupVisible: boolean = false;
  isperssonelAddPopupVisible: boolean = false;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin:boolean = false;

  document_previewurl: any;
  
  module_id: number;
  isPersonnelPopupVisible = false;
  ispremisesSearchWinVisible = false;
  applicationRejectionData:any;
  applicationInitialQueriesData:any;

  isInitalQueryWinVisible:boolean = false;
  personnel_type_id:number;
  isApplicationSubmitwin:boolean = false;
  isaddNewPremisesPersonnelDetails:boolean = false;
  //@Inject(WizardState) public wizard: WizardState,
  newPremisesPersonnelDetailsFrm:FormGroup;
  newPremisesStafflDetailsfrm:FormGroup;
  confirmDataParam: any;
  isReadOnlyTraderasContact:boolean= false;
  premisesTypeData:any;
  isDisabledVehicleReg: boolean = true;

  isInitalQueryResponseFrmVisible:boolean = false;

  //sections 
  query_sectioncheck:string;
  applicationPreckingQueriesData:any;
  initqueryresponsefrm:FormGroup;
  initcaparesponsefrm:FormGroup;
  fastTrackOptionsData:any;
  payingCurrencyData: any;
  action_url:string;
  onApplicationSubmissionFrm:FormGroup;
  isFoodPremises:boolean;
  premises_typetitle: string;
  constructor(public cdr: ChangeDetectorRef,public dmsService:DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) {

    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {
     // this.router.navigate(['./../online-services/premisesreg-dashboard']);
      //return;
    }
    else {

      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.process_title = this.premisesapp_details.process_title;
      this.section_id = this.premisesapp_details.section_id;
      this.premise_id = this.premisesapp_details.premise_id;
      this.tracking_no = this.premisesapp_details.tracking_no;
      this.application_code = this.premisesapp_details.application_code;
      this.country_id = this.premisesapp_details.country_id;
      this.region_id = this.premisesapp_details.region_id;

      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.module_id = this.premisesapp_details.module_id;

      
    }
    if(this.section_id == 1){
      this.isFoodPremises = true;
      this.premises_typetitle = "Premises Product Types";
    }
    else{
      this.isFoodPremises = true;
      this.premises_typetitle = "Premises Main Activities";
    }
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      is_fast_track: new FormControl('', Validators.compose([])),
      submission_comments:new FormControl('', Validators.compose([]))
    });
    if(this.sub_module_id == 1){
        this.is_readonly = false;
    }
    else{
      this.is_readonly = false;
      
    }
    if (this.status_id < 1) {
      this.status_name = "New"
    }
    if(this.status_id == 6 || this.status_id == 17 || this.status_id == 7){
      this.initWizardPanel = 1;
    }
    this.onLoadStudyFieldsDetails();
    this.onLoadQualificationDetails();

    this.onLoadSections();
    this.onLoadCountries();

    this.onLoadclassificationData(this.section_id);
    this.onLoadZones();
    this.onLoadBusinessScales();

    this.onLoadbusinessCategories();
    this.onLoadPersonnerDetails();
    this.onLoadPersonnelPositionDetails();
    
     this.onLoadfastTrackOptionsData();
    this.onLoadpayingCurrencyData();

    this.newPremisesPersonnelDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
    });
    this.newPremisesDirectorsDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
    });
    this.newPremisesStafflDetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone_no: new FormControl('', Validators.compose([]))
    });
    if(this.sub_module_id == 1){
    this.premisesStoreslocationFrm = new FormGroup({
        country_id: new FormControl('', Validators.compose([Validators.required])),
        region_id: new FormControl('', Validators.compose([Validators.required])),
        district_id: new FormControl('', Validators.compose([Validators.required])),
        physical_address: new FormControl('', Validators.compose([Validators.required])),
        cell_id: new FormControl('', Validators.compose([Validators.required])),//Validators.required
        //sector_id: new FormControl('', Validators.compose([Validators.required])),//Validators.required
        village: new FormControl('', Validators.compose([])),//Validators.required
        id: new FormControl('', Validators.compose([]))
    });
  }else{
    this.premisesStoreslocationFrm = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required])),
        distance: new FormControl('', Validators.compose([Validators.required])),
        street: new FormControl('', Validators.compose([Validators.required])),
        country_id: new FormControl('', Validators.compose([Validators.required])),
        region_id: new FormControl('', Validators.compose([Validators.required])),
        district_id: new FormControl('', Validators.compose([Validators.required])),
        file: new FormControl('', Validators.compose([])),
         node_ref:new FormControl('', Validators.compose([])),
        id: new FormControl('', Validators.compose([]))
      });
  }


    if(this.sub_module_id == 1){
    this.premisesGeneraldetailsfrm = new FormGroup({
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      businesstype_category_id: new FormControl('', Validators.compose([])),
      director_name:new FormControl('', Validators.compose([])),
      other_premproduct_classification:new FormControl('', Validators.compose([])),

      premproduct_classification_id: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),
      psu_reg_no: new FormControl('', Validators.compose([Validators.required])),
      psu_reg_date: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      reg_date:new FormControl('',Validators.compose([Validators.required])),
      middle_name: new FormControl('', Validators.compose([])),
      tpin_no: new FormControl('', Validators.compose([Validators.required])),
      last_name:new FormControl('', Validators.compose([Validators.required])),
      superv_email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      super_telephone: new FormControl('', Validators.compose([Validators.required])),
      super_physical_address:new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      longitude: new FormControl('', Validators.compose([])),
      latitude: new FormControl('', Validators.compose([])),
      business_scale_id: new FormControl(this.businessScaleData, Validators.compose([Validators.required])),
      business_type_id: new FormControl('', Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      application_code: new FormControl(this.application_code, Validators.compose([])),//Validators.required
      zone_id: new FormControl(this.zoneData, Validators.compose([])),//Validators.required
      business_category_id: new FormControl('', Validators.compose([])),//Validators.required
      contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_id: new FormControl('', Validators.compose([])),//Validators.required
      applicant_contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_enddate: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_startdate: new FormControl('', Validators.compose([])),//Validators.required
      premise_type_id: new FormControl('', Validators.compose([])),//Validators.required
     // vehicle_reg_no: new FormControl('', Validators.compose([])),//Validators.required
      tra_premise_id: new FormControl('', Validators.compose([])),//Validators.required
      registered_id: new FormControl('', Validators.compose([])),//Validators.required
      investment_capital_currency_id: new FormControl('', Validators.compose([])),//Validators.required
     // cell_id: new FormControl('', Validators.compose([Validators.required])),//Validators.required
     // sector_id: new FormControl('', Validators.compose([Validators.required])),//Validators.required
      village: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_email: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_telephone: new FormControl('', Validators.compose([])),//Validators.required
      company_registration_no: new FormControl('', Validators.compose([Validators.required])),//Validators.required
      registration_institution_id: new FormControl('', Validators.compose([])),//Validators.required
      otherregistration_institution: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_position: new FormControl('', Validators.compose([])),//Validators.required
      classification_id:new FormControl('', Validators.compose([])),
      is_registered_business:new FormControl('', Validators.compose([]))
    });
  }else{    
    this.premisesGeneraldetailsfrm = new FormGroup({
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      businesstype_category_id: new FormControl('', Validators.compose([])),
      director_name:new FormControl('', Validators.compose([])),
      section_id: new FormControl(this.section_id, Validators.compose([])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),
      investment_capital: new FormControl('', Validators.compose([])),
      tpin_no
      : new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([])),
      longitude: new FormControl('', Validators.compose([])),
      latitude: new FormControl('', Validators.compose([])),
      business_scale_id: new FormControl(this.businessScaleData, Validators.compose([])),
      business_type_id: new FormControl('', Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      module_id: new FormControl(this.sub_module_id, Validators.compose([])),//Validators.required
      application_code: new FormControl(this.application_code, Validators.compose([])),//Validators.required
      zone_id: new FormControl(this.zoneData, Validators.compose([])),//Validators.required
      business_category_id: new FormControl('', Validators.compose([])),//Validators.required
      contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_id: new FormControl('', Validators.compose([])),//Validators.required
      applicant_contact_person: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_enddate: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_startdate: new FormControl('', Validators.compose([])),//Validators.required
      premise_type_id: new FormControl('', Validators.compose([])),//Validators.required
      vehicle_reg_no: new FormControl('', Validators.compose([])),//Validators.required
      tra_premise_id: new FormControl('', Validators.compose([])),//Validators.required
      registered_id: new FormControl('', Validators.compose([])),//Validators.required
      investment_capital_currency_id: new FormControl('', Validators.compose([])),//Validators.required
      village: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_email: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_telephone: new FormControl('', Validators.compose([])),//Validators.required
      registration_institution_id: new FormControl('', Validators.compose([])),//Validators.required
      otherregistration_institution: new FormControl('', Validators.compose([])),//Validators.required
      contact_person_position: new FormControl('', Validators.compose([])),//Validators.required
      classification_id:new FormControl('', Validators.compose([])),
  is_registered_business:new FormControl('', Validators.compose([])),
  company_registration_no:new FormControl('', Validators.compose([])),
    other_premproduct_classification:new FormControl('', Validators.compose([])),

      premproduct_classification_id: new FormControl('', Validators.compose([Validators.required]))
    });

  }



    this.premisesOtherDetailsfrm = new FormGroup({
      business_type_id: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
      business_type_detail_id: new FormControl(this.businessTypeDetailsData, Validators.compose([])),
      product_category_id: new FormControl('', Validators.compose([])),
      product_subcategory_id: new FormControl('', Validators.compose([])),
      manufacturing_activities: new FormControl('', Validators.compose([])),
      product_details: new FormControl('', Validators.compose([])),
  
      id: new FormControl('', Validators.compose([]))

    });
   
   
    this.premisesPersonnelDetailsfrm = new FormGroup({
      //start_date: new FormControl('', Validators.compose([])),
      pfirst_name: new FormControl('', Validators.compose([Validators.required])),
      //end_date: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      pmiddle_name: new FormControl('', Validators.compose([])),
      ///id: new FormControl('', Validators.compose([Validators.required])),
      plast_name: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),

      postal_code: new FormControl('', Validators.compose([])),
     // registration_no: new FormControl('', Validators.compose([])),
     // professional_board: new FormControl('', Validators.compose([])),
      
      qualification_id: new FormControl('', Validators.compose([Validators.required])),
     // study_field: new FormControl('', Validators.compose([Validators.required])),
     // personnel_identification_no: new FormControl('', Validators.compose([])),

      //identification_type_id: new FormControl('', Validators.compose([])),

    });


   this.premisesDirectorsDetailsfrm = new FormGroup({
      director_first_name: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      director_middle_name: new FormControl('', Validators.compose([])),
      director_last_name: new FormControl('', Validators.compose([Validators.required])),
      director_postal_address: new FormControl('', Validators.compose([])),
      director_telephone_no: new FormControl('', Validators.compose([Validators.required])),
      director_email_address: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),
      director_postal_code: new FormControl('', Validators.compose([])),
      designation_id: new FormControl('', Validators.compose([Validators.required])),


    });


      this.premisesStafflDetailsfrm = new FormGroup({
      //start_date: new FormControl('', Validators.compose([])),
      pfirst_name: new FormControl('', Validators.compose([Validators.required])),
      //end_date: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      pmiddle_name: new FormControl('', Validators.compose([])),
      ///id: new FormControl('', Validators.compose([Validators.required])),
      plast_name: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([Validators.required])),

      postal_code: new FormControl('', Validators.compose([])),
     // registration_no: new FormControl('', Validators.compose([])),
     // professional_board: new FormControl('', Validators.compose([])),
      
      qualification_id: new FormControl('', Validators.compose([Validators.required])),
     // study_field: new FormControl('', Validators.compose([Validators.required])),
     // personnel_identification_no: new FormControl('', Validators.compose([])),

      //identification_type_id: new FormControl('', Validators.compose([])),

    });


    this.premisesDocumentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });

    this.premisesPersonnelDocumentUploadfrm = this.fb.group({
      file: null,
      node_ref: null,
      id: null,
      personnel_id:null,
      personnel_qualification_id:null,
      description: [null]
    });

    this.onBusinessTypesLoad(this.section_id);
    this.onLoadGuidelines(this.sub_module_id, this.section_id);
    if (this.premisesapp_details) {

          this.premisesGeneraldetailsfrm.patchValue(this.premisesapp_details);
          this.onLoadconfirmDataParm();
          this.onLoadPremisesTypeData();
          this.business_type_id = this.premisesapp_details.business_type_id;
          this.onBusinessTypesDetailsLoad(this.premisesapp_details.business_type_id);
          if(this.premise_id <1){
          
             this.premisesGeneraldetailsfrm.patchValue(this.premisesapp_details);
             
          }
    }
    
    
    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
    this.initcaparesponsefrm = new FormGroup({
      deficiencies: new FormControl('', Validators.compose([Validators.required])),
      deficiency_references: new FormControl('', Validators.compose([])),
      root_causeanalysis: new FormControl('', Validators.compose([])),
      corrective_actions: new FormControl('', Validators.compose([Validators.required])),
      corrective_actionssteps: new FormControl('', Validators.compose([])),
      completion_date: new FormControl('', Validators.compose([Validators.required])),
      application_code: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      inspection_capa_id: new FormControl('', Validators.compose([]))
    });

    
   this.funcReloadQueriesDetails();
   this.funcgetapplicationCAPARequestsData();
   
   this.funcgetapplicationReinspectionRequestsData();
  }
  ngOnInit() {

  }
  funcReloadQueriesDetails(){

    this.funcgetapplicationReinspectionRequestsData();
    this.funcgetapplicationCAPARequestsData();
    this.funcgetPreckingQueriesData();

  }
  funcgetapplicationCAPARequestsData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_premises_applications', 'application_status_id','utilities/getapplicationCAPARequestsData')
    .subscribe(
      data => {
        this.applicationCAPARequestsData = data.data;
        this.spinner.hide();
      });
  }
  funcPrintcapaRequestsLetter(data){
    this.appuploaded_document_id = data.data.query_id;
    
      let report_url = this.mis_url+'reports/printRequestForCAPAResponses?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&query_id="+this.appuploaded_document_id;

      this.funcGenerateRrp(report_url,"Print Request for RE-Inspection");
    
  } 
  funcPrintReinspectionRequestsLetter(data){
    this.appuploaded_document_id = data.data.query_id;
    
      let report_url = this.mis_url+'reports/printREinspectionueryLetter?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&query_id="+this.appuploaded_document_id;

      this.funcGenerateRrp(report_url,"Print Request for RE-Inspection");
    
  } printAppREquestforAdditionalInformation(){
    let report_url = this.mis_url+'reports/printRequestForAdditionalInformation?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&query_id="+this.query_ref_id;
    this.funcGenerateRrp(report_url,"Print Request for Additional Information");
  }  
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

    
}
  funcgetapplicationReinspectionRequestsData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_premises_applications', 'application_status_id','utilities/getapplicationReinspectionRequestsData')
    .subscribe(
      data => {
        this.applicationReinspectionRequestsData = data.data;
        this.spinner.hide();
      });
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
  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }
  
  onTraderasContactpersnChange($event) {
    
    this.value = $event.value;
    if($event.value == 1){
        this.isReadOnlyTraderasContact = true;

    }else{
      this.isReadOnlyTraderasContact = false;
    }
    

  }
   
  onAppQueryPreparing(e) {
    
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.funcReloadQueriesDetails.bind(this)
        }
      });

  }
  ngAfterViewInit() {
  //  this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }
  onProductDashboard() {
    //check for unsaved changes 

    this.router.navigate(['../online-services/premisesreg-dashboard']);

  } 
  onLoadclassificationData(section_id) {
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
  onLoadPremisesTypeData() {
    var data = {
      table_name: 'par_premise_types',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premisesTypeData = data;
        });
  }
  
  onLoadZones() {
   
      this.zoneparams = {
        table_name: 'par_zones'
      };
      
    this.config.onLoadConfigurationData(this.zoneparams)
      .subscribe(
        data => {
          this.zoneData = data;
        });

  }
  onLoadBusinessScales() {
    var data = {
      table_name: 'par_business_scales',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessScaleData = data;
        });

  }

  onLoadQualificationDetails() {
    var data = {
      table_name: 'par_personnel_qualifications',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.qualificationsData = data;
        });
  }
  onLoadStudyFieldsDetails() {
    var data = {
      table_name: 'par_personnel_studyfield',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.studyFieldsData = data;
        });
  }
  onLoadPersonnelPositionDetails() {
    var data = {
      table_name: 'par_personnel_positions',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.personnelPositionData = data;
        });
  }
  onLoadbusinessCategories() {
    var data = {
      table_name: 'par_business_categories',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessCategoryData = data;
        });

  }

  onBusinesTypeCboSelect($event) {
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
   
  }
  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value)
  }

 
  onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypesData = data;
        },
        error => {
          return false
        });
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
  
  onSavePremisesApplication() {

    const invalid = [];
    const controls = this.premisesGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.premisesGeneraldetailsfrm.invalid) {
      return;
    }


    if (this.premisesGeneraldetailsfrm.invalid) {
    //  return;
    }
    console.log(this.premisesGeneraldetailsfrm.value);
    this.spinner.show();
    this.appService.onSavePremisesApplication(this.premise_id, this.premisesGeneraldetailsfrm.value, this.tracking_no)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          //the details 
          this.spinner.hide();
          this.tracking_no = this.premises_resp.tracking_no;
          this.premise_id = this.premises_resp.premise_id;
          this.application_code = this.premises_resp.application_code;

          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.wizard.model.navigationMode.goToStep(1);
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onPremisesApplicationSubmit() {
    this.app_route = ['./online-services/premisesreg-dashboard'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_premises_applications', this.app_route,this.onApplicationSubmissionFrm.value);
    this.isApplicationSubmitwin = false;
  }
  //reload the premsies Other Details 
  onLoadpremPersonnelDocumentsUploadData(personnel_id){
    
    this.dmsService.onLoadnonStructureApplicationDocploads( personnel_id, 'personnel_id','tra_prempersonnel_uploadeddocuments',14)
      //.pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.premPersonnelDocumentsUploadData = data.data;
          }
          else {
            this.toastr.error(data.message, 'Alert');
          }

        },
        error => {
          return false
        });
  }
 
  appDocumentsUploadRequirement
  //load premises personnel dms_repository_structure
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
 
  onLoadPremisesDocumentsDetails(premise_id) {

    this.appService.onLoadPremisesPersonnelDetails(premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.appDocumentsUploadData = data;
        },
        error => {
          return false
        });
  }

 
  //this.personnelQualificationFrm.setValue({personnel_id:this.personnel_id})

 
  onLoadCountries() {

    var data = {
      table_name: 'par_countries',
      is_local: 1
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
 
 
  funAddPremisesAmmendementsRquest(){
    this.premisesAmmendmentsrequestFrm.reset();

    this.isPremisesAmmendementPopup = true;

  }
  onPremisesAmmendmentsToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Ammended Sections',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddPremisesAmmendementsRquest.bind(this)

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
 
  funAddApplicationUploadDetails() {

    this.isDocumentUploadPopupVisible = true;

  }
  funAddPersonnelUploadDetails() {

    this.isPersonnelDocumentUploadPopupVisible = true;

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
  onLoadPersonnerDetails() {
    this.appService.onLoadPersonnelInformations()
      .subscribe(
        data_response => {
          this.personnel_informationData = data_response.data;
        },
        error => {
          return false
        });
  }
 
  

  
 
  onPremisesPerGridToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, '',is_readonly);
  }
  
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }
  onApplicationDocumentToolbar(e,is_readonly) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document',is_readonly);

  }
  onPersonnelDocumentToolbar(e,is_readonly=false) {
    this.functDataGridToolbar(e, this.funAddPersonnelUploadDetails, 'Personnel Upload Document',is_readonly);

  }
  
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
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
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  onPersQualificationGridToolbar(e) {
    e.toolbarOptions.items.unshift();
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
 
 
 
  
  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_personnel';
  //  this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Personnel');

  }

  onPremisesDashboard() {
    this.app_route = ['./online-services/premisesreg-dashboard'];

    this.router.navigate(this.app_route);
  }
  onPremisesApplicationPrint() {

  }
  newPremTermscheckbox(e) {
    console.log(e.value);
    this.checkPremisesSubmission = e.value;

  }
  funcValidatePremBusinessDetails(nextStep) {

    this.funcValidateStepDetails('Add Premises Directors', 'wb_premises_personnel', nextStep);

  }
    funcValidatePremStoreDetails(nextStep) {

    this.funcValidateStepDetails('Add Premises Staff', 'wb_premises_staff', nextStep);

  }
  funcValidatePremPersonnelDetails(nextStep) {

    this.funcValidateStepDetails('Add Premises Personnel', 'wb_premises_personnel', nextStep);

  }
   funcValidatePremStaffDetails(nextStep) {

    this.funcValidateStepDetails('Add Staff Details', 'wb_premises_staff', nextStep);

  }
  funcValidateStepDetails(title_validate, table_name, nextStep) {
    //validate details 
    this.spinner.show();
    this.appService.onValidatePremisesOtherdetails(this.premise_id, table_name,title_validate)
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
  funcValidatePremDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'wb_premises_applications')
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
  //
  
  onRegisteredPremisesSearch() {
    if (!this.tracking_no) {
      //the 
      //load the Premises Details 
      this.appService.onLoadRegisteredPremises({})
        .subscribe(
          data_response => {
            this.ispremisesSearchWinVisible = true;
            this.registered_premisesData = data_response.data;
          },
          error => {
            return false
          });

    }
    else {
      this.toastr.error('Renewal Business Permit application has already been saved', 'Alert');
    }
  }
  onClickApplicationSubmitWin(){
    
      this.isApplicationSubmitwin = true;
  }
  //document uploa details 

  private preparePersonnelDocSave(): any {
    let input = new FormData();

        input.append('file', this.premisesPersonnelDocumentUploadfrm.get('file').value);
        input.append('id', this.premisesPersonnelDocumentUploadfrm.get('id').value);
        input.append('node_ref', this.premisesPersonnelDocumentUploadfrm.get('node_ref').value);
        input.append('personnel_id', this.premisesPersonnelDocumentUploadfrm.get('personnel_id').value);
        
        
    return input;

  }

 private prepareDocSave(): any {
    let input = new FormData();
    input.append('file', this.premisesStoreslocationFrm.get('file').value);
    input.append('id', this.premisesStoreslocationFrm.get('id').value);
    input.append('node_ref', this.premisesStoreslocationFrm.get('node_ref').value);

    return input;
  }
  onNonStrctureFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesPersonnelDocumentUploadfrm.get('file').setValue(file);
    }
  }
  
  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.premisesDocumentUploadfrm.get('document_requirement_id').value);
    input.append('file', this.premisesDocumentUploadfrm.get('file').value);
    input.append('id', this.premisesDocumentUploadfrm.get('id').value);
    input.append('node_ref', this.premisesDocumentUploadfrm.get('node_ref').value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesDocumentUploadfrm.get('file').setValue(file);
    }
  }
    onDocFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesStoreslocationFrm.get('file').setValue(file);
    }
  }
  
  
  onpersonnelpremisesDocumentUpload() {
  //  let document_type_id = 14;
    let personnel_id = this.premisesPersonnelDocumentUploadfrm.get('personnel_id').value;
    const uploadData = this.preparePersonnelDocSave();

    this.dmsService.uploadApplicationDMSUnstructuredDocument(uploadData, this.module_id, this.sub_module_id, this.application_code,14,'tra_prempersonnel_uploadeddocuments','personnel_id',personnel_id)
      //.pipe(first())
      .subscribe(
        response => {
          let response_data = response.json();
          if (response_data.success) {
            this.isDocumentUploadPopupVisible = false;
            this.onLoadpremPersonnelDocumentsUploadData(personnel_id)
            this.toastr.success(response_data.message, 'Response');
          }
          else {

            this.toastr.success(response_data.message, 'Response');

          }

        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });
  }
  
  funcDocumentUpdateDetails(data) {
    this.premisesDocumentUploadfrm.patchValue(data);
    //load the personnel qualifiations 

    this.isDocumentUploadPopupVisible = true;

  }
  funcDocmentPreviewedit(data) {
    this.spinner.show();
    
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
          this.loading = false;
        });

  }
  
  funcDocmentPreviewDocumentVerison(data) {
    this.spinner.show();
    this.dmsService.getApplicationDocumentPreviousVersions(this.application_code, data.node_ref)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.premDocumentsVersionsUploadData = response_data.data;

            this.isDocumentVersionPreviewDownloadwin = true;

          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }
  
 
  onSaveinitCAPAresponses() {
    if (this.initcaparesponsefrm.invalid) {
      this.toastr.error('', 'Response');

      return;
    }
    this.action_url  = 'onSaveinitCAPAresponses';
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initcaparesponsefrm.value, this.action_url)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.funcgetapplicationCAPARequestsData();
            this.isInitalCapaResponseFrmVisible = false;
            
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } 

  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }
    
    this.action_url  = 'onSavePrecheckingqueryresponse';
  
    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, this.action_url)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.funcReloadQueriesDetails();
            
            this.initqueryresponsefrm.get('id').setValue('id');
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } 

  funcgetPreckingQueriesData(){
      
    this.utilityService.getApplicationPreQueriesDetails(this.application_code,'wb_premises_applications', 'application_status_id','utilities/getApplicationQueriesData')
    .subscribe(
      data => {
        this.applicationPreckingQueriesData = data.data;
        this.spinner.hide();
      });
  }
  
  funcgetInitialQueriesData(application_code){
      
        this.utilityService.getApplicationPreQueriesDetails(application_code,'wb_premises_applications', 'application_status_id','utilities/getApplicationPreQueriesDetails')
        .subscribe(
          data => {
            this.applicationInitialQueriesData = data.data;
            this.spinner.hide();
          });
  }
  onShowInitalQueriesWin(){
    
    this.isInitalQueryWinVisible = true;
  }
  onShowPrecheckingQueriesWin(){

    
  }
  funcDownloadUploadedDoc(){

      let report_url = this.mis_url+'reports/printRequestForCAPAResponses?application_code='+this.application_code+"&module_id="+this.module_id+"&sub_module_id="+this.sub_module_id+"&premise_id="+this.premise_id+"&table_name=tra_premises_applications";
      this.funcGenerateRrp(report_url,"print Query Letter");
    
    /*if(this.appuploaded_document_id >0){
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
    */
  }
  funcDownloadQueryLetter(data){
    this.appuploaded_document_id = data.data.appuploaded_document_id;


    this.funcDownloadUploadedDoc();
  }
  
  funcValidatePremDocumentsUpload(nextStep){
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code,this.status_id,'wb_premises_applications')
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
  funcValidateApplicationWithdrawalDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code,'wb_application_withdrawaldetails')
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response;
        if (response_data.success) {
          
        }
        else{
         
          this.toastr.error(response_data.message, 'Response');
        }
        this.wizard.model.navigationMode.goToStep(nextStep);
         
        this.spinner.hide();
      });

  }
  funcInitQueryResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalQueryResponseFrmVisible = true;
  
  }
  funcInitCAPAResponse(data) {
  
    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initcaparesponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;
    
    this.isInitalCapaResponseFrmVisible = true;
  
  }
  
  onLoadPremisesOtherDetails() {

    this.appService.onLoadPremisesOtherDetails(this.premise_id)
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  } onLoadPremisesPersonnelDetails() {

    this.appService.onLoadPremisesPersonnelDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }funcValidateApplicationQueryresponse( nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code,'wb_premises_applications')
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
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  } 
  funcCloseQueryWindow(){
      this.isInitalQueryResponseFrmVisible = true;
  }
  funcCloseCAPAWindow(){
    this.isInitalCapaResponseFrmVisible = true;
  }
}