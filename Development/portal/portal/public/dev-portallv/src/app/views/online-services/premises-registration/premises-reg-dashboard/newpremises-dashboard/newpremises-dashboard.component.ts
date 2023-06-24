import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';

@Component({
  selector: 'app-newpremises-dashboard',
  templateUrl: './newpremises-dashboard.component.html',
  styleUrls: ['./newpremises-dashboard.component.css']
})
export class NewpremisesDashboardComponent extends PremisesRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "New Premises Application Dashboard"
    this.sub_module_id = 1;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
