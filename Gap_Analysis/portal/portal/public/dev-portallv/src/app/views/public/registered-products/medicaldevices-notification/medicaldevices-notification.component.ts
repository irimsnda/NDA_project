import { Component, OnInit } from '@angular/core';
import { RegisteredProductsComponent } from '../registered-products.component';

@Component({
  selector: 'app-medicaldevices-notification',
  templateUrl: './medicaldevices-notification.component.html',
  styleUrls: ['./medicaldevices-notification.component.css']
})
export class MedicaldevicesNotificationComponent  extends RegisteredProductsComponent implements OnInit{


  ngOnInit() {
    this.section_id = 4;
    this.sub_modulesin ='30';
    this.onClassificationsLoad(this.section_id);
    this.onCommonNamesLoad(this.section_id);
    this.onproductDosageFormData(this.section_id);
    this.onLoadRegisteredProducts(this.section_id,30);
  }


}
