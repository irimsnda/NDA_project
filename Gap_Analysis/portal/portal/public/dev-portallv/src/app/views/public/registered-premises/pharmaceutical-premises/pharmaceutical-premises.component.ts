import { Component, OnInit } from '@angular/core';
import { RegisteredPremisesComponent } from '../registered-premises.component';

@Component({
  selector: 'app-pharmaceutical-premises',
  templateUrl: './pharmaceutical-premises.component.html',
  styleUrls: ['./pharmaceutical-premises.component.css']
})
export class PharmaceuticalPremisesComponent extends RegisteredPremisesComponent implements OnInit {

  ngOnInit() {
    
    this.title = "Pharmaceutical Licensed Premises";
    this.section_id =2;
    this.registeredPremisessFrm.get('section_id').setValue(this.section_id);
    this.onLoadRegisteredPremises();
    
    this.onBusinessTypesLoad(this.section_id);
  }

}
