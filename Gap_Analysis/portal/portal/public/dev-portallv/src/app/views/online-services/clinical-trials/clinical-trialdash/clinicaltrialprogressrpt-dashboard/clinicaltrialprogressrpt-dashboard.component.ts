import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';



@Component({
  selector: 'app-clinicaltrialprogressrpt-dashboard',
  templateUrl: './clinicaltrialprogressrpt-dashboard.component.html',
  styleUrls: ['./clinicaltrialprogressrpt-dashboard.component.css']
})
export class ClinicaltrialprogressrptDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Clinical Trial Progress Report & SAE Reports';
    this.sub_module_id = 23;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
