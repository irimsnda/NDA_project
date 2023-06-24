import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-authorised-humanmedicines',
  templateUrl: './authorised-humanmedicines.component.html',
  styleUrls: ['./authorised-humanmedicines.component.css']
})
export class AuthorisedHumanmedicinesComponent  extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 2;
    this.sub_modulesin ='30';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,30);
  }
}
