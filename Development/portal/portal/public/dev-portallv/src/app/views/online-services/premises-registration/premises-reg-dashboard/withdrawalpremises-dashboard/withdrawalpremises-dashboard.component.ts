import { Component, OnInit } from '@angular/core';
import { PremisesRegDashboardComponent } from '../premises-reg-dashboard.component';

@Component({
  selector: 'app-withdrawalpremises-dashboard',
  templateUrl: './withdrawalpremises-dashboard.component.html',
  styleUrls: ['./withdrawalpremises-dashboard.component.css']
})
export class WithdrawalpremisesDashboardComponent extends PremisesRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Premises Closure & Deregistration(License withdrawal)"
    this.sub_module_id = 4;
    this.onLoadPremisesAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }
}
