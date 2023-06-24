import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';

@Component({
  selector: 'app-clinicaltriavariations-dashboard',
  templateUrl: './clinicaltriavariations-dashboard.component.html',
  styleUrls: ['./clinicaltriavariations-dashboard.component.css']
})
export class ClinicaltriavariationsDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = ' Clinical Trial Applications Amendment Request';
    this.sub_module_id = 13;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
