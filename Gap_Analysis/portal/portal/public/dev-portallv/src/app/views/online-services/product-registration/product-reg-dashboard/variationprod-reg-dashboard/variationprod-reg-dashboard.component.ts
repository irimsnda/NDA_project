import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-variationprod-reg-dashboard',
  templateUrl: './variationprod-reg-dashboard.component.html',
  styleUrls: ['./variationprod-reg-dashboard.component.css']
})
export class VariationprodRegDashboardComponent extends ProductRegDashboardComponent implements OnInit {
  
  ngOnInit() {
    this.appprocess_title = "Product Application Variations Requests";
    this.sub_module_id = 9;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});

    this.onLoadProductsCounterDetails(this.sub_module_id);
  }

}
