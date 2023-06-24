import { Component, OnInit } from '@angular/core';
import { RegisteredPremisesComponent } from '../registered-premises.component';

@Component({
  selector: 'app-food-premises',
  templateUrl: './food-premises.component.html',
  styleUrls: ['./food-premises.component.css']
})
export class FoodPremisesComponent extends RegisteredPremisesComponent implements OnInit {

  ngOnInit() {
    this.title = "Food Licensed Premises";
    this.section_id =1;
    this.registeredPremisessFrm.get('section_id').setValue(this.section_id);
    this.onLoadRegisteredPremises();
    
    this.onBusinessTypesLoad(this.section_id);
  }
}
