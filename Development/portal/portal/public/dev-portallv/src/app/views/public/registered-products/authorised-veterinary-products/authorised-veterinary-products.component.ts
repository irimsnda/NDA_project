import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-authorised-veterinary-products',
  templateUrl: './authorised-veterinary-products.component.html',
  styleUrls: ['./authorised-veterinary-products.component.css']
})
export class AuthorisedVeterinaryProductsComponent  extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 7;
    this.sub_modulesin ='30';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,30);
  }
}
