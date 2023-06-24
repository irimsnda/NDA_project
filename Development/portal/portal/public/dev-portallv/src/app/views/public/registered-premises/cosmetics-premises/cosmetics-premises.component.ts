import { Component, OnInit } from '@angular/core';
import { RegisteredPremisesComponent } from '../registered-premises.component';

@Component({
  selector: 'app-cosmetics-premises',
  templateUrl: './cosmetics-premises.component.html',
  styleUrls: ['./cosmetics-premises.component.css']
})
export class CosmeticsPremisesComponent extends RegisteredPremisesComponent implements OnInit {

  
  ngOnInit() {
    this.title = "Cosmetics Licensed Premises";
    this.section_id =3;
    this.registeredPremisessFrm.get('section_id').setValue(this.section_id);
    this.onLoadRegisteredPremises();
    this.onBusinessTypesLoad(this.section_id);
    

  }

}
