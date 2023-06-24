import { Component, OnInit } from '@angular/core';
import { ServicetariffFeesComponent } from '../servicetariff-fees.component';

@Component({
  selector: 'app-clinicaltrial-fees',
  templateUrl: './clinicaltrial-fees.component.html',
  styleUrls: ['./clinicaltrial-fees.component.css']
})
export class ClinicaltrialFeesComponent extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 7;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
