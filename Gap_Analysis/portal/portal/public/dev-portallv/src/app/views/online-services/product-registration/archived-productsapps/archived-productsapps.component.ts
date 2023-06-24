import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-archived-productsapps',
  templateUrl: './archived-productsapps.component.html',
  styleUrls: ['./archived-productsapps.component.css']
})
export class ArchivedProductsappsComponent implements OnInit {

  base_url = AppSettings.base_url;
  isPreviewProductsDetails:boolean= false;
  frmPreviewProductsDetails:FormGroup;
  
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  printiframeUrl:string;

  dtProductApplicationData:any;
  constructor(private appService: ProductApplicationService,private configService: ConfigurationsService) { }

  ngOnInit() {
    // this.modalService.getModal('productAppSelection').open();
    this.frmPreviewProductsDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      classification: new FormControl('', Validators.compose([Validators.required])),
      common_name: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
  }
  onProductsesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }prodApplicationActionColClick(e,data){
  
          var action_btn = e.itemData;
      
         
          if(action_btn.action === 'preview'){
            this.funcProductPreviewDetails(data.data);
          }
          else if(action_btn.action == 'print_applications'){
            this.funcPrintApplicationDetails(data.data);
          }

  }
  funcProductPreviewDetails(data){
    this.isPreviewProductsDetails = true;
    this.frmPreviewProductsDetails.patchValue(data);

}
funcPrintApplicationDetails(app_data){
  //print details

    let report_url = this.base_url+'reports/generateProductsApplicationRpt?application_code='+app_data.application_code;
    this.funcGenerateRrp(report_url,"Application Details");
   
}
funcGenerateRrp(report_url,title){
    
  this.printiframeUrl =  this.configService.returnReportIframe(report_url);
  this.printReportTitle= title;
  this.isPrintReportVisible = true;

}
refreshDataGrid() {
    
}


}
