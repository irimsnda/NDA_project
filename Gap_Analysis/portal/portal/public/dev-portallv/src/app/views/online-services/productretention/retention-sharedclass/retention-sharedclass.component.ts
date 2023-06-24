import { Component, OnInit, Renderer, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-retention-sharedclass',
  templateUrl: './retention-sharedclass.component.html',
  styleUrls: ['./retention-sharedclass.component.css']
})
export class RetentionSharedclassComponent implements OnInit {
  dtretentionInvsData:any;
  dtretentionPaymentsData:any;
  base_url = AppSettings.base_url;
  assets_url = AppSettings.assets_url;

  FilterDetailsFrm:FormGroup;
  retetentionFilterDetailsFrm:FormGroup;
  retetentionPaymentFilterDetailsFrm:FormGroup;

  yearUpperLimit:number = (new Date()).getFullYear()+1;
  yearLowerLimit:number = 2014;

  yearData:any= [];
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  sectionsData:any;
  mistrader_id:number;
  constructor(public http: HttpClient,public renderer: Renderer, public router:Router, public utilityService:Utilities,public toastr: ToastrService,public configService: ConfigurationsService,public spinner: SpinnerVisibilityService,public fb: FormBuilder, public cd: ChangeDetectorRef,public authService:AuthService ) { 

    this.retetentionFilterDetailsFrm = new FormGroup({
      retention_yearfrom: new FormControl('', Validators.compose([])),
      retention_yearto: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([]))
    });
    this.retetentionPaymentFilterDetailsFrm = new FormGroup({
      retention_yearfrom: new FormControl('', Validators.compose([])),
      retention_yearto: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([]))
    });
    for(var i=this.yearLowerLimit;i<=this.yearUpperLimit;i++) {

      this.yearData.push({id: i, name:i});
      
    }
    this.onLoadSections();
    let user_details = this.authService.getUserDetails();
   
    this.mistrader_id = user_details.mistrader_id;
  }

  ngOnInit() {

    
  }

  onPrintRetetionPaymentApplicaitonState(){

    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
     
    let report_url = this.base_url+'reports/generateRetentionPaymentsStatements?retention_yearto='+retention_yearto+"&section_id="+section_id+"&retention_yearfrom="+retention_yearfrom;
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }
  onPrintRetetionApplicaitonState(){

    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
   let mis_url = AppSettings.mis_url;
    let report_url = mis_url+'reports/generateSelectedRetentionInvoiceStatement?retention_yearto='+retention_yearto+"&section_id="+section_id+"&retention_yearfrom="+retention_yearfrom+"&applicant_id="+this.mistrader_id ;

    this.funcGenerateRrp(report_url,"Retention Invoice")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
  onSelectRetentionFilters() {
    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
     
    this.OnloadProductRetetentionDetails({retention_yearto:retention_yearto,section_id:section_id,retention_yearfrom:retention_yearfrom});
  }
  onClearRetetionApplicaitonFilters(){
    this.retetentionFilterDetailsFrm.reset();
    this.OnloadProductRetetentionDetails({});


  }
  OnloadProductRetetentionDetails(filter_params) {

    this.spinner.show();
    this.utilityService.getApplicationUniformDetails(filter_params,'onloadProductRetetentionDetails')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtretentionInvsData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }onLoadSections() {

    var data = {
      table_name: 'par_sections',
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });

  }
  //load payments details 
  onSelectRetentionPaymentFilters() {
    let retention_yearto = this.retetentionFilterDetailsFrm.get('retention_yearto').value;
    let section_id = this.retetentionFilterDetailsFrm.get('section_id').value;
    let retention_yearfrom = this.retetentionFilterDetailsFrm.get('retention_yearfrom').value;
     
    this.OnloadProductRetetentionPaymentDetails({retention_yearto:retention_yearto,section_id:section_id,retention_yearfrom:retention_yearfrom});
  }
  onClearRetetionPaymentsFilters(){
    this.retetentionFilterDetailsFrm.reset();
    this.OnloadProductRetetentionPaymentDetails({});
  }
  OnloadProductRetetentionPaymentDetails(filter_params) {

    this.spinner.show();
    this.utilityService.getApplicationUniformDetails(filter_params,'onloadProductRetetentionPaymentsDetails')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtretentionPaymentsData =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  funcPrintRetentionReceipt(data){
    let receipt_id = data.data.receipt_id;

    let report_url = this.base_url+'reports/printRetentionReceipt?receipt_id='+receipt_id;
    this.funcGenerateRrp(report_url,"Application Invoice")

  }
  funcPrintRetentionInvoices(data){
      let invoice_id = data.data.invoice_id;

     
      let report_url = this.base_url+'reports/printRetentionInvoices?invoice_id='+invoice_id;
      this.funcGenerateRrp(report_url,"Application Invoice")
  }
}
