import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';
@Component({
  selector: 'app-registered-veterinarymedicaldevices',
  templateUrl: './registered-veterinarymedicaldevices.component.html',
  styleUrls: ['./registered-veterinarymedicaldevices.component.css']
})
export class RegisteredVeterinarymedicaldevicesComponent extends RegisteredProductsComponent  implements OnInit{

  
  ngOnInit() {
    this.section_id = 18;
    this.sub_modulesin ='7,8,9';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,this.sub_modulesin );
  }

}
