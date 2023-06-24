import { Component, OnInit } from '@angular/core';
import { DrugshopRegDashboardComponent } from '../drugshop-reg-dashboard.component';

@Component({
  selector: 'app-preinspection-dashboard',
  templateUrl: './preinspection-dashboard.component.html',
  styleUrls: ['./preinspection-dashboard.component.css']
})
export class PreinspectionDashboardComponent extends DrugshopRegDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.premises_dashboardtitle = "Pre Inspection Applications Dashboard"
    this.sub_module_id = 97;

    this.onLoadDrugshopAppType(this.sub_module_id);
    this.reloadPremisesApplications({sub_module_id:this.sub_module_id});

     
    this.onLoadPremisesCounterDetails(this.sub_module_id);
   
  }

}
