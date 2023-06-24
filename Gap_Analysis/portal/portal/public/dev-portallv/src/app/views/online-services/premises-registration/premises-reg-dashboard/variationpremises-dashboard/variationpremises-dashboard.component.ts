import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';

@Component({
  selector: 'app-variationpremises-dashboard',
  templateUrl: './variationpremises-dashboard.component.html',
  styleUrls: ['./variationpremises-dashboard.component.css']
})
export class VariationpremisesDashboardComponent extends PremisesRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Variation Premises Requests Dashboard"
    this.sub_module_id = 3;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
