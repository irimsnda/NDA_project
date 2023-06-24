import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';
@Component({
  selector: 'app-safedisposalinspection-fees',
  templateUrl: './safedisposalinspection-fees.component.html',
  styleUrls: ['./safedisposalinspection-fees.component.css']
})
export class SafedisposalinspectionFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 15;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
