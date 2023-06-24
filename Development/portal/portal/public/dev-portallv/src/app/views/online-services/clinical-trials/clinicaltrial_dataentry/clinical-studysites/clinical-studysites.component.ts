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
  selector: 'app-clinical-studysites',
  templateUrl: './clinical-studysites.component.html',
  styleUrls: ['./clinical-studysites.component.css']
})
export class ClinicalStudysitesComponent implements OnInit {
  @Input() clinicalSitesDetailsData: any;
  @Input() durationDescData: any;
  @Input() application_id: any;
  @Input() countries: any;

  isClinicalSitesDetailsVisible:boolean=false;
  studySitesData:any;
  studySiteFrm:FormGroup;
  isStudySiteAddWinVisible:boolean;
  region:any;
  districts:any;
  app_resp:any;
regions:any;
sponsor_investigatortitle:string;
isclinicalSTudySiteDetailsWin:boolean =false;
clinicalSTudySiteDetailsFrm:FormGroup;
  constructor(public utilityService: Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    this.studySiteFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([Validators.required])),
      district_id: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([Validators.required])),
      telephone: new FormControl('', Validators.compose([])),
      latitude: new FormControl('', Validators.compose([])),
      longitude:new FormControl('', Validators.compose([])),
      clinical_council:new FormControl('', Validators.compose([])),
      emergency:new FormControl('', Validators.compose([])),
      special_examination_facility:new FormControl('', Validators.compose([])),
      capacity:new FormControl('', Validators.compose([])),
      storage_facility:new FormControl('', Validators.compose([])),
      staff_qualification:new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required]))
    });
    this.clinicalSTudySiteDetailsFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      study_site_id: new FormControl('', Validators.compose([Validators.required])),
      approving_instution: new FormControl('', Validators.compose([])),
      responsible_ethics_committee: new FormControl('', Validators.compose([])),
      application_reference_no: new FormControl('', Validators.compose([])),
      approval_date: new FormControl('', Validators.compose([]))
    });
  }
  ngOnInit() {
    this.onLoadClinicalSiteDetails(this.application_id);

  }
  funcDeleteClinicalSiteDetails(site_data) {
    this.funcClinicalTrialDeletehelper(site_data, 'wb_clinical_trial_sites', 'study_site', 'Clinical Trial Site');
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
                 
                    this.onLoadClinicalSiteDetails(this.application_id);
                 
                  
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

  }funcAddStudySiteDetails() {
    this.isStudySiteAddWinVisible = true;
  }
  onStudysitePreparing(e) {
    this.functDataGridToolbar(e, this.funcAddStudySiteDetails, this.sponsor_investigatortitle);
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  funcSelectStudySite(data) {
    //data.data.id
    this.clinicalSTudySiteDetailsFrm.patchValue(data.data);
    
    this.clinicalSTudySiteDetailsFrm.get('study_site_id').setValue(data.data.id);
    this.isClinicalSitesDetailsVisible = false;

  }
  onSaveisclinicalSTudySiteDetails(record_id){
    this.spinner.show();
    this.appService.onSaveClinicalStudySite(this.clinicalSTudySiteDetailsFrm.value, 'wb_clinical_trial_sites', this.application_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response.json();
          if (response_data.success) {
            this.onLoadClinicalSiteDetails(this.application_id);
            this.toastr.success(response_data.message, 'Response');
            this.isclinicalSTudySiteDetailsWin = false;
          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
        //  this.loading = false;
        });
  }
  onsaveStudySiteDetails(data) {
    //data.data.id
    this.spinner.show();
    let name = this.studySiteFrm.get('name').value;
        this.appService.onAddPermitReceiverSender('study_sites', this.studySiteFrm.value)
      .subscribe(
        response => {
          let response_data = response.json();
          
          this.spinner.hide();
          //the details 
          if (response_data.success) {
              this.toastr.success(response_data.message, 'Response');
              this.isClinicalSitesDetailsVisible = false;
              this.isStudySiteAddWinVisible = false;
              this.clinicalSTudySiteDetailsFrm.get('study_site_id').setValue(response_data.record_id);
              
              this.clinicalSTudySiteDetailsFrm.get('name').setValue(name);

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });

  }
  onLoadClinicalSiteDetails(application_id) {
    this.appService.getClinicalTrialOtherdetails({ table_name: 'study_sites', application_id: application_id }, 'getClinicalTrialSites')
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

  funcAddClinicaltrialSite() {
    this.isclinicalSTudySiteDetailsWin = true;
  }
  onSearchclinicalSTudySites(){
    this.appService.getPermitsOtherDetails({ table_name: 'study_sites' }, 'getSenderreceiversDetails')
    .subscribe(
      data => {
        if (data.success) {
          this.studySitesData = data.data;
          this.isClinicalSitesDetailsVisible = true;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });

  }
  onClinicalSitesDetailsToolbar(e) {
    this.functDataGridToolbar(e, this.funcAddClinicaltrialSite, 'Add Study Site');
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
    });
  }

  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

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

}
