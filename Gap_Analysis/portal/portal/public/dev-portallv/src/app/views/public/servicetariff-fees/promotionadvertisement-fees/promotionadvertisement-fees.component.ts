import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';
@Component({
  selector: 'app-promotionadvertisement-fees',
  templateUrl: './promotionadvertisement-fees.component.html',
  styleUrls: ['./promotionadvertisement-fees.component.css']
})
export class PromotionadvertisementFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 14;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
