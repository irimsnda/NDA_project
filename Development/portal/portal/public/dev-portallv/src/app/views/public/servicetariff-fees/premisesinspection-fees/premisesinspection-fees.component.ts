
import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';
@Component({
  selector: 'app-premisesinspection-fees',
  templateUrl: './premisesinspection-fees.component.html',
  styleUrls: ['./premisesinspection-fees.component.css']
})
export class PremisesinspectionFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 2;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
