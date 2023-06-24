import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';
@Component({
  selector: 'app-prod-listing-dashboard',
  templateUrl: './prod-listing-dashboard.component.html',
  styleUrls: ['./prod-listing-dashboard.component.css']
})
export class ProdListingDashboardComponent extends ProductRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    
    this.appprocess_title = "New Product Applications";
    this.sub_module_id = 91;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);
    this.onLoadprodClassCategoriesData();
  }
  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes',
      has_product_listing:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodProductTypeData = data;
        });
  }
  onLoadprodClassCategoriesData() {
    var data = {
      table_name: 'par_prodclass_categories',
      has_product_listing:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodClassCategoriesData = data;
        });

  }
}
