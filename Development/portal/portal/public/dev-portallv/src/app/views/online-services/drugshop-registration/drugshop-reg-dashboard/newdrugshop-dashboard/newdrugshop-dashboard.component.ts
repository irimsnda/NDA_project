import { Component, OnInit } from '@angular/core';
import { DrugshopRegDashboardComponent } from '../drugshop-reg-dashboard.component';

@Component({
  selector: 'app-newdrugshop-dashboard',
  templateUrl: './newdrugshop-dashboard.component.html',
  styleUrls: ['./newdrugshop-dashboard.component.css']
})
export class NewdrugshopDashboardComponent extends DrugshopRegDashboardComponent implements OnInit {

  ngOnInit() {
    this.premises_dashboardtitle = "New Drug Shop Application Dashboard"
    this.sub_module_id = 96;
    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
