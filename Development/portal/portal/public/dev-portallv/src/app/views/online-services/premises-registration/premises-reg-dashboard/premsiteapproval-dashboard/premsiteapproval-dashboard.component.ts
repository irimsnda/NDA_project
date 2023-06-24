
import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';

@Component({
  selector: 'app-premsiteapproval-dashboard',
  templateUrl: './premsiteapproval-dashboard.component.html',
  styleUrls: ['./premsiteapproval-dashboard.component.css']
})
export class PremsiteapprovalDashboardComponent  extends PremisesRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Pre Inspection Applications Dashboard"
    this.sub_module_id = 89;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
