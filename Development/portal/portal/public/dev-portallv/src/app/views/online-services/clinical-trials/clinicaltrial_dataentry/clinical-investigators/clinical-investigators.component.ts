
import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
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
  selector: 'app-clinical-investigators',
  templateUrl: './clinical-investigators.component.html',
  styleUrls: ['./clinical-investigators.component.css']
})
export class ClinicalInvestigatorsComponent implements OnInit {
  @Input() clinicalSitesDetailsData: any;

  @Input() sub_module_id: number;
  @Input() module_id: number;
  @Input() application_code: number;
  @Input() section_id: number;
  @Input() regions: any;
  @Input() countries: any;
  @Input() districts: any;
  @Input() application_id: number;
  @Input() investigatorCategoryData: any;

  
  sponsor_investigatortitle:string;
  checkifsponsor:boolean = false;
  checkifMonitor:boolean = false;
  checkifAllInvestigatorsponsor:boolean = false;
  sponsorInvestigatorData:any;
  isSponsorInvestigatorSearchWinVisible:boolean = false;
  issponsorInvestigatorAddWinVisible:boolean = false;
  sponsorInvestigatorFrm:FormGroup;
  clinicaltInvestigatorFrm:FormGroup;
  app_resp:any;
  InvestigatorDetailsWinVisible:boolean;
  
  clinicaltrailinvestigatorsData: any;
  clinicaltrailMonitorsData:any;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.clinicaltInvestigatorFrm = new FormGroup({
      investigator_name: new FormControl('', Validators.compose([Validators.required])),
      investigator_id: new FormControl('', Validators.compose([Validators.required])),
      category_id: new FormControl('', Validators.compose([Validators.required])),
      study_site_id: new FormControl('', Validators.compose([]))
    });

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
  }
  ngOnInit() {
    this.onLoadclinicaltrailinvestigatorsData();
    this.onLoadclinicaltrailMonitorsData();
  } 
  funcSelectSponsorInvestigator(data) {
    
    if(this.checkifMonitor == true){
      this.appService.onsaveClinicaltrialOtherDetails(this.application_id, {monitor_id:data.data.id}, 'onsaveclinicaltMonitorDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isSponsorInvestigatorSearchWinVisible = false;
            //reload
            this.onLoadclinicaltrailMonitorsData();
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
    else{
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(data.data.id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(data.data.name);
    
       this.isSponsorInvestigatorSearchWinVisible = false;
    }
     
  }
  onLoadClinicalSiteDetails() {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'study_sites', application_id: this.application_id }, 'getClinicalTrialSites')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicalSitesDetailsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onLoadclinicaltrailinvestigatorsData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_investigators', application_id: this.application_id }, 'getClinicaltrailinvestigatorsData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailinvestigatorsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  } onLoadclinicaltrailMonitorsData() {
    //onLoadClinicalTrialOtherdetails
    this.appService.getClinicalTrialOtherdetails({ table_name: 'wb_clinical_trial_monitors', application_id: this.application_id }, 'getClinicaltrailMonitorssData')
      .subscribe(
        data => {
          if (data.success) {
            this.clinicaltrailMonitorsData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
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

  onClinicalTrialSponsor() {
    this.sponsor_investigatortitle = 'Clinical trial Sponsor';
    this.checkifsponsor = true;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  onClinicalTrialInvestigator() {
    this.sponsor_investigatortitle = 'Clinical trial Principal Invetigator';
    this.checkifsponsor = false;
    this.checkifAllInvestigatorsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
 
 
  onCoutryCboSelect($event) {


    this.onLoadRegions($event.selectedItem.id);

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
  } onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

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
onInvestigatorsPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddInvestigatorDetails, 'Investigators Details');
  }
  onMonitorssPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddClinicalTrialMonitor, 'Clinical Trial Monitors Details');
  }
  funcAddInvestigatorDetails() {
    this.spinner.show();
    this.appService.getClinicalTrialOtherdetails({ table_name: 'study_sites', application_id: this.application_id }, 'getClinicalTrialSites')
      .subscribe(
        data => {
          if (data.success) {
            this.spinner.hide();
            this.InvestigatorDetailsWinVisible = true;
             this.clinicaltInvestigatorFrm.reset();
             this.onLoadClinicalSiteDetails();
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
    
  }
  
  funcAddClinicalTrialMonitor(){
    this.sponsor_investigatortitle = 'Clinical Trial Monitor';
    this.checkifMonitor = true;

    this.spinner.show();
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
    .subscribe(
      data => {
        if (data.success) {
          this.sponsorInvestigatorData = data.data;
          this.isSponsorInvestigatorSearchWinVisible = true;
          this.checkifMonitor = true;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
        
    this.spinner.hide();
      },
      error => {
        return false
      });
  }
  funcDeleteInvestigatorDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'wb_clinical_trial_investigators', 'investigator', 'Clinical Trial Investigator');
  }funcDeleteMonitorsDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'wb_clinical_trial_monitors', 'monitor', 'Clinical Trial Monitor');
  }
  
  funcClinicalTrialDeletehelper(record_data, table_name, reload_funccheck, delete_title) {
    let app_data = record_data.data;
    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want deleted the selected ' + app_data.name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, table_name, this.application_id, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                
                if (response_data.success) {
                 
                 this.onLoadclinicaltrailinvestigatorsData();
                 this.onLoadclinicaltrailMonitorsData();

                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
               // this.loading = false;
              });
          resolve();
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
  
  onsaveclinicaltInvestigatorDetails() {
    this.spinner.show();
    let table_name;
    table_name = 'wb_clinical_trial_investigators';

    this.appService.onsaveClinicaltrialOtherDetails(this.application_id, this.clinicaltInvestigatorFrm.value, 'onsaveclinicaltInvestigatorDetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.InvestigatorDetailsWinVisible = false;
            //reload
            this.onLoadclinicaltrailinvestigatorsData();
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
      this.clinicaltInvestigatorFrm.get('investigator_id').setValue(id);
      this.clinicaltInvestigatorFrm.get('investigator_name').setValue(name);
    
  }
  
  onsaveSponsorInvestigator() {
    this.spinner.show();
    let table_name;
    table_name = 'clinical_trial_personnel';

    let name = this.sponsorInvestigatorFrm.get('name').value;
    this.appService.onAddPermitReceiverSender(table_name, this.sponsorInvestigatorFrm.value)
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.issponsorInvestigatorAddWinVisible = false;

            this.updateConsigneeReceiver(this.app_resp.record_id, name);

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
  
  onClinicalTrialAllinvestigators() {
    this.sponsor_investigatortitle = 'Clinical trial Investigators';
    this.checkifMonitor = false;
    this.checkifAllInvestigatorsponsor = true;
    this.checkifsponsor = false;
    this.appService.getPermitsOtherDetails({ table_name: 'clinical_trial_personnel' }, 'getSenderreceiversDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.sponsorInvestigatorData = data.data;
            this.isSponsorInvestigatorSearchWinVisible = true;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }

}
