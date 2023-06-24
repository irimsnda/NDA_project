
import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-authorised-cosmeticsproducts',
  templateUrl: './authorised-cosmeticsproducts.component.html',
  styleUrls: ['./authorised-cosmeticsproducts.component.css']
})
export class AuthorisedCosmeticsproductsComponent extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 3;
    this.sub_modulesin ='30';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,30);
  }
}
