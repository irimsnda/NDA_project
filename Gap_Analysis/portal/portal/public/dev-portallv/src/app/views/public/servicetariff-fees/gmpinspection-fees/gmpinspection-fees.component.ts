import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';

@Component({
  selector: 'app-gmpinspection-fees',
  templateUrl: './gmpinspection-fees.component.html',
  styleUrls: ['./gmpinspection-fees.component.css']
})
export class GmpinspectionFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 3;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
