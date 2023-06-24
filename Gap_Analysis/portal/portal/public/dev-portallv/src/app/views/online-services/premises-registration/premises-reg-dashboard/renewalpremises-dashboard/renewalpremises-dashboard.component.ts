import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';

@Component({
  selector: 'app-renewalpremises-dashboard',
  templateUrl: './renewalpremises-dashboard.component.html',
  styleUrls: ['./renewalpremises-dashboard.component.css']
})
export class RenewalpremisesDashboardComponent extends PremisesRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Renewal Premises Application Dashboard"
    this.sub_module_id = 2;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
