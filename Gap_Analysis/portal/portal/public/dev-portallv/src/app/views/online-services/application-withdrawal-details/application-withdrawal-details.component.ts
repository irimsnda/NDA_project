import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from 'src/app/services/common/utilities.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-withdrawal-details',
  templateUrl: './application-withdrawal-details.component.html',
  styleUrls: ['./application-withdrawal-details.component.css']
})
export class ApplicationWithdrawalDetailsComponent implements OnInit {
  withdrawalCategoriesData:any;
  applicationWithdrawalData:any;
  applicationWithdrawalRequestsFrm:FormGroup;
  app_resp:any;
  isApplicationWithdrawalRequestDetailsWin:boolean= false;
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef,  public config: ConfigurationsService, public spinner: SpinnerVisibilityService,public utilityService: Utilities,public toastr: ToastrService) { 
   
  }
  ngOnInit() {
    
    this.applicationWithdrawalRequestsFrm = new FormGroup({
      withdrawal_category_id: new FormControl('', Validators.compose([Validators.required])),
      reason_for_withdrawal: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    }); 
    this.onLoadApplicationWithdrawalData();
    this.onLoadWithdrawalCategoriesData();

  }
  onLoadApplicationWithdrawalData() {
    //onLoadClinicalTrialOtherdetails
    this.utilityService.getApplicationUniformDetails({ table_name: 'wb_application_variationsdata', application_code: this.application_code }, 'getapplicationWithdrawalrequests')
      .subscribe(
        data => {
          if (data.success) {
            this.applicationWithdrawalData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  
  onsaveApplicationWithdrawalRequests() {
    this.spinner.show();
    let table_name;
        table_name = 'wb_application_variationsdata';

    this.utilityService.onsaveApplicationUniformDetails(this.application_code, this.applicationWithdrawalRequestsFrm.value, 'onsaveApplicationWithdrawalrequests')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          if (this.app_resp.success) {
            this.isApplicationWithdrawalRequestDetailsWin = false;
            //reload
            this.onLoadApplicationWithdrawalData();
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
  onLoadWithdrawalCategoriesData() {
    var data = {
      table_name: 'par_withdrawal_categories',
      module_id:this.module_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.withdrawalCategoriesData = data;
        });

  }
  onApplicationVariationsDetailsToolbar(e) {
    this.functDataGridToolbar(e, this.funcApplicationariationsDetails, 'Add Application Withdawal Requests');
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
  //functions 
  funcApplicationariationsDetails(){
    this.isApplicationWithdrawalRequestDetailsWin = true;
    this.applicationWithdrawalRequestsFrm.reset();

      
  }
  funcEditVariationRequestDetails(data) {

    this.applicationWithdrawalRequestsFrm.patchValue(data.data);
    //load the personnel qualifiations
    this.isApplicationWithdrawalRequestDetailsWin = true;

  }
  funcDeleteApplicationVariationRequestsDetails(site_data) {
    this.funcDeletehelper(site_data, 'wb_application_withdrawaldetails', 'application_variation', 'Application withdrawal Request');
  }

  funcDeletehelper(record_data, table_name, reload_funccheck, delete_title) {
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
          this.utilityService.onDeleteUniformAppDetails(record_id, table_name, this.application_code, delete_title)
            .subscribe(
              response => {
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
              
                    this.onLoadApplicationWithdrawalData();

                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }
              },
              error => {

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

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}
