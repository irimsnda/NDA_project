import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-newprod-reg-dashboard',
  templateUrl: './newprod-reg-dashboard.component.html',
  styleUrls: ['./newprod-reg-dashboard.component.css']
})
export class NewprodRegDashboardComponent extends ProductRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    
    this.appprocess_title = "New Product Applications";
    this.sub_module_id = 7;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    this.onLoadProductsCounterDetails(this.sub_module_id);

  }

}
