import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-registered-medicaldevices',
  templateUrl: './registered-medicaldevices.component.html',
  styleUrls: ['./registered-medicaldevices.component.css']
})
export class RegisteredMedicaldevicesComponent extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 4;
    this.sub_modulesin ='7,8,9';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    
    this.onLoadRegisteredProducts(this.section_id,this.sub_modulesin );
  }

}
