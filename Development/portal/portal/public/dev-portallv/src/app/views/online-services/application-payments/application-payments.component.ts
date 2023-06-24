import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-application-payments',
  templateUrl: './application-payments.component.html',
  styleUrls: ['./application-payments.component.css']
})
export class ApplicationPaymentsComponent implements OnInit {
  app_details:any;
  application_code:number;
  applicationPaymentsDetails:any
  router_link:any;
  printiframeUrl:any
  printReportTitle:any;
  isPrintReportVisible:any= false;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  private previousUrl: any;
  private currentUrl: any;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef,  public config: ConfigurationsService, public spinner: SpinnerVisibilityService,public utilityService: Utilities,public toastr: ToastrService,public router: Router,public configService:ConfigurationsService) { 
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  ngOnInit() {
    this.app_details = this.utilityService.getApplicationDetail();
    if(!this.app_details){

      this.router.navigate(['./../online-services/app-dashboard']);
      return;
    }
    this.application_code =   this.app_details.application_code;
    
    this.onLoadApplicationPaymentsDetails();

  }
  onLoadApplicationPaymentsDetails() {
    //onLoadClinicalTrialOtherdetails
    this.utilityService.getApplicationUniformDetails({ table_name: 'tra_payments', application_code: this.application_code }, 'getApplicationPaymentsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.applicationPaymentsDetails = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });
  }
  funcPrintApplicationReceipts(app_data){

    // let report_url = this.base_url+'reports/generateApplicationReceipts?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&receipt_id="+app_data.receipt_id+"&table_name=tra_product_applications";
 
 
     let report_url = this.mis_url+'reports/generateApplicationReceipt?payment_id=' + app_data.receipt_id + '&&module_id=' + app_data.module_id + '&&application_id=' + app_data.application_id;
     
     this.funcGenerateRrp(report_url,"Application Receipt")
     
   }
  funcGenerateRrp(report_url,title){
  
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcPrintApplicationInvoice(app_data){
  
    let report_url = this.base_url+'reports/generateApplicationInvoice?application_code='+app_data.application_code+"&module_id="+app_data.module_id+"&sub_module_id="+app_data.sub_module_id+"&table_name=tra_product_applications";
    this.funcGenerateRrp(report_url,"Application Invoice")
    
  }onapplicationPaymentsDetailsToolBar(e){
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Return Back',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcPreviousPage.bind(this)

      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Refresh Details',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.onLoadApplicationPaymentsDetails.bind(this)

      }
    });
  }
  funcPreviousPage(){
    
    this.router.navigate(['./../online-services/app-dashboard']);
  }
}
