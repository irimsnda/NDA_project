import { Component, Input, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-application-invoices',
  templateUrl: './application-invoices.component.html',
  styleUrls: ['./application-invoices.component.css']
})
export class ApplicationInvoicesComponent implements OnInit {
  @Input() application_code: number;
  @Input() tracking_no: number;
  @Input() application_feetype_id: number;
  invoice_resp:any;
  appInvoiceDeTailsData:any;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;
  
  mis_url = AppSettings.mis_url;
  base_url = AppSettings.base_url;
  constructor(public utilityService: Utilities,public toastr: ToastrService,public spinner: SpinnerVisibilityService,public configService: ConfigurationsService) {
    
   }

  ngOnInit() {
    this.funcLoadApplicationInvDetails();

  }
  funcPrintProformaInvoice(app_data){

    let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+this.application_code+"&invoice_id="+app_data.invoice_id;
    this.funcGenerateRrp(report_url,"Application Proforma Invoice")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcLoadApplicationInvDetails(){
    
    let app_params = {
        application_code:this.application_code,
        application_feetype_id:this.application_feetype_id,
        tracking_no:this.tracking_no
      }
    this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onLoadGeneratedApplicationInvoice')
    .subscribe(
      response => {
        this.invoice_resp = response;
        //the details 
        if (this.invoice_resp.success) {
          this.appInvoiceDeTailsData = this.invoice_resp.invoice_data;
          this.spinner.hide();
        } else {
          this.toastr.error(this.invoice_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error occurred, please try again', 'Response'); this.spinner.hide();
      });

  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  } 
  
}
