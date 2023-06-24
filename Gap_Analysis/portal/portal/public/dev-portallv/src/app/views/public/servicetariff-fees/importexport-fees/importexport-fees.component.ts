
import { Component, OnInit } from '@angular/core';

import { ServicetariffFeesComponent } from '../servicetariff-fees.component';
@Component({
  selector: 'app-importexport-fees',
  templateUrl: './importexport-fees.component.html',
  styleUrls: ['./importexport-fees.component.css']
})
export class ImportexportFeesComponent  extends ServicetariffFeesComponent implements OnInit {

  ngOnInit() {
    this.module_id = 4;
    this.onloadApplicationTypes(this.module_id);
    this.onLoadRegulatedServicesCharges(this.module_id);

  }

}
