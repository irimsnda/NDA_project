import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedProductregistrationclassComponent } from '../shared-productregistrationclass/shared-productregistrationclass.component';

@Component({
  selector: 'app-productsapp-submissions',
  templateUrl: './productsapp-submissions.component.html',
  styleUrls: ['./productsapp-submissions.component.css']
})
export class ProductsappSubmissionsComponent extends SharedProductregistrationclassComponent implements OnInit  {
  @Input() application_code: number;
  @Input() assessment_proceduretype_id: number;
  @Input() fastTrackOptionsData: any;
  @Input() payingCurrencyData: any;
  @Input() terms_conditions: any;
  
  @Input() sub_module_id: number;
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

  }
 
}
