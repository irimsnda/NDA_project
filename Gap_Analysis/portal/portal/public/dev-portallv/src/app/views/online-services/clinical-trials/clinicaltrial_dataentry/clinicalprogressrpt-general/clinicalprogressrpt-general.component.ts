import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Utilities } from 'src/app/services/common/utilities.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clinicalprogressrpt-general',
  templateUrl: './clinicalprogressrpt-general.component.html',
  styleUrls: ['./clinicalprogressrpt-general.component.css']
})
export class ClinicalprogressrptGeneralComponent implements OnInit {
  @Input() clinicaltrialReportingdetailsfrm: FormGroup;
  @Input() durationDescData: any;
  @Input() payingCurrencyData: any;
  @Input() fastTrackOptionsData: any;
  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() reg_clinical_trial_id: number;
  @Input() zoneData: any;
  @Input() regions: any;
  @Input() countries: any;
  @Input() districts: any;
  @Input() is_readonly: boolean;
  @Input() docsection_id: any;
  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  checkifAllInvestigatorsponsor:boolean = false;
  sponsorInvestigatorData:any;
  isSponsorInvestigatorSearchWinVisible:boolean = false;
  issponsorInvestigatorAddWinVisible:boolean = false;
  sponsorInvestigatorFrm:FormGroup;
  clinicaltInvestigatorFrm:FormGroup;
  app_resp:any;
  clinicalStudyPhaseData:any;
  sectionsData:any;

  clinicalStudyReportTypeData:any;
  clinicalStudyStatusesData:any;
  clinicalStudySitesData:any;
  @Output() docClinicalSectionsEvent = new EventEmitter();
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.sponsorInvestigatorFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      contact_person: new FormControl('', Validators.compose([Validators.required]))
    });
    this.onLoadSections();
    this.onLoadclinicalStudyPhaseData()
    this.onLoadclinicalStudyReportTypeData();
    this.onLoadclinicalStudyStatusesData();
   
  }onClinicalTriaProductSectionChange($event){
      this.docClinicalSectionsEvent.emit($event.value+','+this.section_id);
  }
  ngOnInit() {
    if(!this.application_code){
        this.clinicaltrialReportingdetailsfrm.get('zone_id').setValue(2);
    }
    
    this.onLoadclinicalStudySitesData();
  } onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onLoadclinicalStudyReportTypeData() {
    var data = {
      table_name: 'par_clinicalreport_type',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyReportTypeData = data;
        });
  }  onLoadclinicalStudyStatusesData() {
    var data = {
      table_name: 'par_clinicalstudy_statuses',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyStatusesData = data;
        });
  }

onLoadclinicalStudySitesData(){

  this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', reg_clinical_trial_id: this.reg_clinical_trial_id }, 'getclinicalStudySitesData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalStudySitesData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
}


  onLoadclinicalStudyPhaseData(){
    var data = {
      table_name: 'par_clinical_phases',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.clinicalStudyPhaseData = data;
        });

  }
 onSponsorInvestigatorPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddSponsorInvestigatoretails, this.sponsor_investigatortitle);
  }
  funcAddSponsorInvestigatoretails() {

    this.isSponsorInvestigatorSearchWinVisible = false;
    this.issponsorInvestigatorAddWinVisible = true;
    this.sponsorInvestigatorFrm.reset();

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
   // this.dataGrid.instance.refresh();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}
