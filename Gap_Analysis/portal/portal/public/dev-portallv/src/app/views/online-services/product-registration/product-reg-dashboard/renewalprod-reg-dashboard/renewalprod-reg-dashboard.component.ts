import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-renewalprod-reg-dashboard',
  templateUrl: './renewalprod-reg-dashboard.component.html',
  styleUrls: ['./renewalprod-reg-dashboard.component.css']
})
export class RenewalprodRegDashboardComponent extends  ProductRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    
    this.appprocess_title = "Product Application Renewals";
    this.sub_module_id = 8;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);
  }

}
