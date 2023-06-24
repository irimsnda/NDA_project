import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedProductregistrationclassComponent } from '../shared-productregistrationclass/shared-productregistrationclass.component';
@Component({
  selector: 'app-productapp-querysubmission',
  templateUrl: './productapp-querysubmission.component.html',
  styleUrls: ['./productapp-querysubmission.component.css']
})
export class ProductappQuerysubmissionComponent extends SharedProductregistrationclassComponent implements OnInit  {
  @Input() application_code: number;
  @Input() assessment_proceduretype_id: number;
  @Input() fastTrackOptionsData: any;
  @Input() payingCurrencyData: any;
  @Input() terms_conditions: any;
  has_invoice_generation:number = 1;
  @Input() sub_module_id: number;
  @Input() invoice_id: number;
  isInvoiceGenerationWin:boolean= false;
  @Input() status_id: number;
  processData:any;
  isPreviewProductsDetails:boolean= false;
  name:string = "Product Application";
  variable:string = "yes!";
  title: string;
  router_link: string;
  applicationcheckcode:string;
  
  ngOnInit() {
    this.onLoadfastTrackOptionsData()
  }
  
  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options',
      assessment_proceduretype_id:this.assessment_proceduretype_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  } funcPrintProformaInvoice(){
    this.isInvoiceGenerationWin =true;
    return;
    if(this.invoice_id >0){
      let report_url = this.mis_url+'reports/generateApplicationInvoice?application_code='+this.application_code+"&invoice_id="+this.invoice_id;
      this.funcGenerateRrp(report_url,"Application Proforma Invoice(Additional Invoice)")
    }
    else{
      this.toastr.error('Invoice Not Generate, Click Generate Invoice and Proceed to Print.', 'Response');
    }
  
    
  }
 
}
