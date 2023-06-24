import { Component, Input, OnChanges, OnInit, SimpleChanges,
  ChangeDetectionStrategy } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../shared-productregistrationclass/shared-productregistrationclass.component';

@Component({
  selector: 'app-product-application-preview',
  templateUrl: './product-application-preview.component.html',
  styleUrls: ['./product-application-preview.component.css']
})
export class ProductApplicationPreviewComponent extends SharedProductregistrationclassComponent implements OnInit,OnChanges {
  isReadOnly: boolean= true;
  preview_allonlinedocuploads:boolean= true;
  @Input() applicationcheckcode: string;
  @Input() tracking_no: string;
  @Input() status_name: string;
  product_classcategory:any;
  _childVar: string; // if you need to record the value and access later in child component
  counter = 0;
  @Input()
  set childVar(value: string) {
    this._childVar = value;
    this.childFunction(); // the answer is here
  }

  childFunction() {
    this.productapp_details = this.appService.getProductApplicationDetail();
    console.log(this.productapp_details);
    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/productreg-dashboard']);
      return;
    }
    else {
      this.section_id = this.productapp_details.section_id;
      this.sub_module_id = this.productapp_details.sub_module_id;

      this.module_id = this.productapp_details.module_id;
      this.process_title = this.productapp_details.process_title;
      this.product_classcategory = this.productapp_details.product_classcategory;
      this.applicationcheckcode = this.productapp_details.application_code;
      this.tracking_no = this.productapp_details.tracking_no;
      this.status_name = this.productapp_details.status_name;
      this.product_id = this.productapp_details.product_id;
  
      this.status_id = this.productapp_details.status_id;

      this.product_id = this.productapp_details.product_id;
      this.application_code = this.productapp_details.application_code;
      
      this.query_ref_id = this.productapp_details.query_ref_id;
      this.prodclass_category_id = this.productapp_details.prodclass_category_id;
      this.isReadOnly= true;
    }
  }
  ngAfterViewInit() {
   // alert(this.applicationcheckcode);
 }
 ngOnChanges(changes: SimpleChanges) {   
   //alert(this.applicationcheckcode);   
  console.log(changes); 

 }
  ngOnInit() {
   
  }
  
  
  onProductPrintProductApplication() {
    const printContents = document.getElementById('print-container').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
}
