import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-product-notifications-dashboard',
  templateUrl: './product-notifications-dashboard.component.html',
  styleUrls: ['./product-notifications-dashboard.component.css']
})
export class ProductNotificationsDashboardComponent extends ProductRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    
    this.appprocess_title = "Product Notifications";
    this.sub_module_id = 30;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);
    this.onLoadprodProductTypeData();
    
  }

  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes',
      has_product_notification:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodProductTypeData = data;
        });
  }
}
