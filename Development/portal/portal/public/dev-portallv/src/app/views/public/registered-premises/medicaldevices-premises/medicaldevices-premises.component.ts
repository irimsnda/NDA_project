import { Component, OnInit } from '@angular/core';
import { RegisteredPremisesComponent } from '../registered-premises.component';

@Component({
  selector: 'app-medicaldevices-premises',
  templateUrl: './medicaldevices-premises.component.html',
  styleUrls: ['./medicaldevices-premises.component.css']
})
export class MedicaldevicesPremisesComponent extends RegisteredPremisesComponent implements OnInit {

  ngOnInit() {
      
    this.title = "Medical devices Licensed Premises";
    this.section_id =4;
    this.registeredPremisessFrm.get('section_id').setValue(this.section_id);
    this.onLoadRegisteredPremises();
    this.onBusinessTypesLoad(this.section_id);

  }

}
