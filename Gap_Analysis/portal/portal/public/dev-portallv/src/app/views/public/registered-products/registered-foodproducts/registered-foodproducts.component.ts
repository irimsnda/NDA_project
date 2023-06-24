import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-registered-foodproducts',
  templateUrl: './registered-foodproducts.component.html',
  styleUrls: ['./registered-foodproducts.component.css']
})
export class RegisteredFoodproductsComponent  extends RegisteredProductsComponent  implements OnInit{

  
  ngOnInit() {
    this.section_id = 1;
    this.sub_modulesin ='7,8,9';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,this.sub_modulesin );
  }

}
