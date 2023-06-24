

import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';
@Component({
  selector: 'app-productregistration-fees',
  templateUrl: './productregistration-fees.component.html',
  styleUrls: ['./productregistration-fees.component.css']
})
export class ProductregistrationFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 1;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
