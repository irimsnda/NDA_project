import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-authorised-medicaldevices',
  templateUrl: './authorised-medicaldevices.component.html',
  styleUrls: ['./authorised-medicaldevices.component.css']
})
export class AuthorisedMedicaldevicesComponent  extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 4;
    this.sub_modulesin ='30';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,30);
  }
}
