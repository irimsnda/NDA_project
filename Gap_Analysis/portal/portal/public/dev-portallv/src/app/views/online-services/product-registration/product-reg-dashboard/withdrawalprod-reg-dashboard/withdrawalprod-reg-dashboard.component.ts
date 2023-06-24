import { Component, OnInit } from '@angular/core';
import { ProductRegDashboardComponent } from '../product-reg-dashboard.component';

@Component({
  selector: 'app-withdrawalprod-reg-dashboard',
  templateUrl: './withdrawalprod-reg-dashboard.component.html',
  styleUrls: ['./withdrawalprod-reg-dashboard.component.css']
})
export class WithdrawalprodRegDashboardComponent extends ProductRegDashboardComponent implements OnInit {

 
  ngOnInit() {
    this.appprocess_title = "Product Application Withdrawal Requests";
    this.sub_module_id = 20;
    this.onLoadProductAppType(this.sub_module_id) ;
    this.onLoadProductApplciations({sub_module_id: this.sub_module_id});
    
    this.onLoadProductsCounterDetails(this.sub_module_id);
  }

}
