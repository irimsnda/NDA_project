import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';

@Component({
  selector: 'app-preclinicaltrial-dashboard',
  templateUrl: './preclinicaltrial-dashboard.component.html',
  styleUrls: ['./preclinicaltrial-dashboard.component.css']
})
export class PreclinicaltrialDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Pre-Clinical Trial Applications Submissions';
    this.sub_module_id = 69;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
